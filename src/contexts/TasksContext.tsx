import { createContext, useState, useEffect, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task, TaskCategory } from "../Models/TasksModel";

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

const parseTasks = (jsonTasks: any[] = [{ date: "" }]): Task[] => {
  return jsonTasks.map((task) => ({ ...task, date: new Date(task.date) }));
};

interface TasksContextProviderProps {
  children: ReactNode;
}

export const TasksContextProvider = ({
  children,
}: TasksContextProviderProps) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  const loadTasksFromStorage = (): Task[] => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      return parseTasks(storedTasks);
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  };

  const [tasks, setTasks] = useState<Task[]>(loadTasksFromStorage);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const markTaskFinished = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const addTask = (taskText: string, taskCategory: TaskCategory) => {
    const newTask: Task = {
      id: uuidv4(),
      task: taskText,
      done: false,
      date: new Date(),
      category: taskCategory,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const saveEditedTask = () => {
    if (!editedTask) return;
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
    setEditedTask(null);
  };

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
