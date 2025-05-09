import { Task, TaskCategory } from '@/Models/TasksModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface TasksState {
  tasks: Task[];
  editedTask: Task | null;
}

const loadTasksFromStorage = (): Task[] => {
  try {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return storedTasks.map((task: any) => ({ ...task, date: new Date(task.date) }));
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

const initialState: TasksState = {
  tasks: loadTasksFromStorage(),
  editedTask: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    markTaskFinished: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      );
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    addTask: (state, action: PayloadAction<{ taskText: string; taskCategory: TaskCategory }>) => {
      const { taskText, taskCategory } = action.payload;
      const newTask: Task = {
        id: uuidv4(),
        task: taskText,
        done: false,
        date: new Date(),
        category: taskCategory,
      };
      state.tasks = [newTask, ...state.tasks];
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setEditedTask: (state, action: PayloadAction<Task | null>) => {
      state.editedTask = action.payload;
    },
    saveEditedTask: (state) => {
      if (!state.editedTask) return;
      
      state.tasks = state.tasks.map((task) => 
        task.id === state.editedTask?.id ? state.editedTask : task
      );
      state.editedTask = null;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
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