// Tasks feature public API
export { default as TasksPage } from "./pages/Tasks";
export { default as TaskStatsPage } from "./pages/TaskStats";
export { default as EasterEggsPage } from "./pages/EasterEggs";
export { useTasks } from "./hooks/useTasks";
export { useModal } from "./hooks/useModal";
export type { Task, TaskCategory } from "./models/TasksModel";
export { taskCategories } from "./models/TasksModel";
