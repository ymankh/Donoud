import OldTaskList from "./old_tasks/OldTaskList";
import TaskList from "./todays_tasks/TaskList";
import { Accordion, Container } from "react-bootstrap";
import { Task } from "../Models/TasksModel";
import { useTasks } from "@/hooks/useTasks";
import { useFilter } from "@/hooks/useFilter";

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

      <Container>
        <div className="container py-5 h-100 ">
          <div className="row  d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-8 col-xl-6">
              <Accordion className="shadow">
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
              </Accordion>
            </div>
          </div>
        </div>
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