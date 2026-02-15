import OldTaskList from "./OldTaskList";
import TaskList from "./TaskList";
import { Container, Box } from "@mui/material";
import { Task } from "../models/TasksModel";
import { useTasks } from "../hooks/useTasks";
import { useFilter } from "@/shared/hooks/useFilter";

const TaskLists = () => {
  const { filter } = useFilter();
  const { tasks: allTasks } = useTasks();
  const today = new Date().toDateString();
  const tasks: Task[] = [];
  // Group tasks by date
  const oldTasks = allTasks.reduce(
    (acc: { [key: string]: Task[] }, task: Task) => {
      if (isTaskFiltered(task, filter)) return acc;

      // Get the date string in YYYY-MM-DD format
      const dateKey = task.date.toDateString();

      // Check if the date key already exists in the accumulator
      if (dateKey === today) {
        tasks.push(task);
        return acc;
      }
      if (!acc[dateKey]) {
        // If not, create a new array for that date
        acc[dateKey] = [task];
        return acc;
      }
      // If yes, push the task to the existing array
      acc[dateKey].push(task);

      return acc;
    },
    {}
  );

  return (
    <>
      <TaskList tasks={tasks} />

      <Container maxWidth="md" sx={{ py: 2, height: "100%", mb: 12 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            {Object.entries(oldTasks)
              .sort(
                (a, b) =>
                  new Date(b[0]).getTime() - new Date(a[0]).getTime()
              )
              .map(([key, tasks]) => {
                return (
                  <OldTaskList key={key} tasks={tasks} eventKey={key} />
                );
              })}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default TaskLists;

function isTaskFiltered(task: Task, filter: string) {
  filter = filter.toLocaleLowerCase();
  return !(
    task.task.toLocaleLowerCase().includes(filter) ||
    task.details?.toLocaleLowerCase().includes(filter) ||
    task.category?.toLocaleLowerCase().includes(filter)
  );
}
