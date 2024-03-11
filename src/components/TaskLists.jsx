import { useContext } from "react";
import TasksContext from "../contexts/TasksContext";
import OldTaskList from "./old_tasks/OldTaskList";
import TaskList from "./todays_tasks/TaskList";
import { Accordion, Container } from "react-bootstrap";

const TaskLists = () => {
  const { tasks, oldTasks } = useContext(TasksContext);

  return (
    <>
      <TaskList tasks={tasks} />
      <Container>
        <Accordion>
          {oldTasks.map((tasks) => (
            <OldTaskList key={tasks[0]} tasks={tasks[1]} />
          ))}
        </Accordion>
      </Container>
    </>
  );
};

export default TaskLists;
