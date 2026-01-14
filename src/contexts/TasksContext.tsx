import { createContext, useMemo, useState, ReactNode, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task, TaskCategory } from "@/Models/TasksModel";
import {
  fromTaskRecord,
  tasksCollection,
  toTaskRecord,
} from "@/db/collections";
import { useLiveQuery } from "@tanstack/react-db";

interface TasksContextType {
  tasks: Task[];
  editedTask: Task | null;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  markTaskFinished: (taskId: string) => void;
  addTask: (taskText: string, taskCategories: TaskCategory) => void;
  deleteTask: (taskId: string) => void;
  setEditedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  saveEditedTask: () => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

interface TasksContextProviderProps {
  children: ReactNode;
}

export const TasksContextProvider = ({
  children,
}: TasksContextProviderProps) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const { data: taskRecords = [] } = useLiveQuery((q) =>
    q.from({ tasks: tasksCollection })
  );
  const tasks = useMemo(
    () =>
      taskRecords.map((task) => ({
        ...fromTaskRecord(task),
        category: (task.category || "") as TaskCategory,
      })),
    [taskRecords]
  );

  const setTasks = useCallback<React.Dispatch<React.SetStateAction<Task[]>>>(
    (next) => {
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

  const saveEditedTask = useCallback(() => {
    if (!editedTask) return;
    const nextTask = editedTask;
    tasksCollection.update(nextTask.id, (draft) => {
      draft.task = nextTask.task;
      draft.done = nextTask.done;
      draft.category = nextTask.category || "";
      draft.date = toTaskRecord({
        ...nextTask,
        category: nextTask.category || "",
      }).date;
      draft.details = nextTask.details;
    });
    setEditedTask(null);
  }, [editedTask]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        editedTask,
        setTasks,
        markTaskFinished,
        addTask,
        deleteTask,
        setEditedTask,
        saveEditedTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
