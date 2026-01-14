import { Task, TaskCategory } from "@/Models/TasksModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  fromTaskRecord,
  tasksCollection,
  toTaskRecord,
} from "@/db/collections";

interface TasksState {
  tasks: Task[];
  editedTask: Task | null;
}

const loadTasksFromDb = (): Task[] => {
  const records = Array.from(tasksCollection.state.values());
  return records.map((task) => ({
    ...fromTaskRecord(task),
    category: (task.category || "") as TaskCategory,
  }));
};

const initialState: TasksState = {
  tasks: loadTasksFromDb(),
  editedTask: null,
};

const replaceTasksInDb = (tasks: Task[]) => {
  const existingIds = Array.from(tasksCollection.state.keys());
  if (existingIds.length) {
    tasksCollection.delete(existingIds);
  }
  if (tasks.length) {
    tasksCollection.insert(
      tasks.map((task) =>
        toTaskRecord({
          ...task,
          category: task.category || "",
        })
      )
    );
  }
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      replaceTasksInDb(state.tasks);
    },
    markTaskFinished: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      );
      tasksCollection.update(taskId, (draft) => {
        draft.done = !draft.done;
      });
    },
    addTask: (
      state,
      action: PayloadAction<{ taskText: string; taskCategory: TaskCategory }>
    ) => {
      const { taskText, taskCategory } = action.payload;
      const newTask: Task = {
        id: uuidv4(),
        task: taskText,
        done: false,
        date: new Date(),
        category: taskCategory,
      };
      state.tasks = [newTask, ...state.tasks];
      tasksCollection.insert(
        toTaskRecord({
          ...newTask,
          category: newTask.category || "",
        })
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      tasksCollection.delete(taskId);
    },
    setEditedTask: (state, action: PayloadAction<Task | null>) => {
      state.editedTask = action.payload;
    },
    saveEditedTask: (state) => {
      if (!state.editedTask) return;
      const editedTask = state.editedTask;

      state.tasks = state.tasks.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );
      tasksCollection.update(editedTask.id, (draft) => {
        draft.task = editedTask.task;
        draft.done = editedTask.done;
        draft.category = editedTask.category || "";
        draft.date = toTaskRecord({
          ...editedTask,
          category: editedTask.category || "",
        }).date;
        draft.details = editedTask.details;
      });
      state.editedTask = null;
    },
  },
});

export const {
  setTasks,
  markTaskFinished,
  addTask,
  deleteTask,
  setEditedTask,
  saveEditedTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
