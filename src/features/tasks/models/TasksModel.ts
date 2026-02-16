export const taskCategories = [
  "Personal ✨",
  "Work 💼",
  "Health 💪",
  "Finance 💰",
  "Shopping 🛍️",
  "Family 🏠",
  "Education 📚",
  "Social 🎉",
  "Travel ✈️",
  "Tech 💻",
] as const;

export type TaskCategory = (typeof taskCategories)[number] | "";

export interface SubTask {
  id: string;
  title: string;
  done: boolean;
}

export interface Task {
  id: string;
  task: string;
  done: boolean;
  date: Date;
  category: TaskCategory;
  details?: string;
  subTasks?: SubTask[];
}
