export const taskCategories = [
  "Personal 🏡",
  "Work 💼",
  "Health & Fitness 💪",
  "Finance 💰",
  "Shopping 🛍️",
  "Home & Family 🏠",
  "Education 📚",
  "Social & Events 🎉",
  "Travel ✈️",
  "Tech & Digital 💻",
] as const;

export type TaskCategory = (typeof taskCategories)[number] | "";

export interface Task {
  id: string;
  task: string;
  done: boolean;
  date: Date;
  category: TaskCategory;
}
