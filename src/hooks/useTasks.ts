import {
  fromTaskRecord,
  tasksCollection,
  toTaskRecord,
  TaskRecord,
} from "@/db/collections";
import { Task, TaskCategory } from "@/Models/TasksModel";
import { useLiveQuery } from "@tanstack/react-db";
import { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUIState } from "./useUIState";

const UI_STATE_ID = "global";

/**
 * Custom hook for managing tasks and task-related operations using TanStack DB.
 *
 * Provides a set of functions and state to create, read, update, and delete tasks.
 * It also handles the "edited task" state, which is part of the global UI state,
 * allowing coordination with the edit modal.
 *
 * @returns {object} An object containing:
 * - `tasks`: Array of task objects.
 * - `editedTask`: The task currently being edited (or null).
 * - `setTasks`: Function to update the entire task list (rarely used directly).
 * - `markTaskFinished`: Function to toggle a task's completion status.
 * - `addTask`: Function to add a new task.
 * - `deleteTask`: Function to delete a task by ID.
 * - `setEditedTask`: Function to set or clear the task being edited.
 * - `saveEditedTask`: Function to commit changes from the edited task to the main collection.
 */
export const useTasks = () => {
  const { data: taskRecords = [] } = useLiveQuery((q) =>
    q.from({ tasks: tasksCollection })
  );

  const { uiState, updateUIState } = useUIState();

  const tasks = useMemo(
    () =>
      taskRecords.map((task) => ({
        ...fromTaskRecord(task),
        category: (task.category || "") as TaskCategory,
      })),
    [taskRecords]
  );

  const editedTask = useMemo(
    () =>
      uiState.editingTask
        ? {
            ...fromTaskRecord(uiState.editingTask),
            category: (uiState.editingTask.category || "") as TaskCategory,
          }
        : null,
    [uiState.editingTask]
  );

  const setTasks = useCallback(
    (next: Task[] | ((prev: Task[]) => Task[])) => {
      const nextTasks = typeof next === "function" ? next(tasks) : next;
      const nextRecords = nextTasks.map((task) =>
        toTaskRecord({
          ...task,
          category: task.category || "",
        })
      );
      const existingIds = Array.from(tasksCollection.state.keys());
      if (existingIds.length) {
        tasksCollection.delete(existingIds);
      }
      if (nextRecords.length) {
        tasksCollection.insert(nextRecords);
      }
    },
    [tasks]
  );

  const markTaskFinished = useCallback((taskId: string) => {
    tasksCollection.update(taskId, (draft) => {
      draft.done = !draft.done;
    });
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    tasksCollection.delete(taskId);
  }, []);

  const addTask = useCallback(
    (taskText: string, taskCategory: TaskCategory) => {
      const newTask: Task = {
        id: uuidv4(),
        task: taskText,
        done: false,
        date: new Date(),
        category: taskCategory,
      };
      tasksCollection.insert(
        toTaskRecord({
          ...newTask,
          category: newTask.category || "",
        })
      );
    },
    []
  );

  const setEditedTask = useCallback(
    (task: Task | null) => {
      updateUIState((draft) => {
        if (task) {
          draft.editingTask = toTaskRecord({
            ...task,
            category: task.category || "",
          });
        } else {
          draft.editingTask = null;
        }
      });
    },
    [updateUIState]
  );

  const saveEditedTask = useCallback(() => {
    // Current editingTask is to be saved
    // We assume uiState.editingTask is up to date because setEditedTask updates it.
    // However, setEditedTask logic updates DB, so uiState should reflect it.
    // But inside this callback, we need access to the *current* state.
    // uiState from hook is reactive, so it might be stale if closure captured old one?
    // No, saveEditedTask depends on [uiState.editingTask].
    
    const taskToSave = uiState.editingTask;

    if (!taskToSave) return;

    // Direct update to tasks collection
    tasksCollection.update(taskToSave.id, (draft) => {
      draft.task = taskToSave.task;
      draft.done = taskToSave.done;
      draft.category = taskToSave.category || "";
      draft.date = taskToSave.date;
      draft.details = taskToSave.details;
    });
    
    // Clear editing state
    updateUIState((draft) => {
      draft.editingTask = null;
    });
  }, [uiState.editingTask, updateUIState]);

  return {
    tasks,
    editedTask,
    setTasks,
    markTaskFinished,
    addTask,
    deleteTask,
    setEditedTask,
    saveEditedTask, // Export this so components call it
  };
};
