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
        <div className="container py-5 h-100 ">
          <div className="row  d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-8 col-xl-6">
              <Accordion className="shadow">
                {oldTasks.map((tasks) => (
                  <OldTaskList key={tasks[0]} tasks={tasks[1]} />
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TaskLists;
