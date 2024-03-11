import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import TasksContext from "../contexts/TasksContext";
import { motion } from "framer-motion";
import ListItem from "../components/todays_tasks/ListItem";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

function Test() {
  const { oldTasks: tasks } = useContext(TasksContext);
  console.log(tasks);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="list-group rounded-0"
    >
      <Accordion>
        {/* {tasks.map((task) => (
            <Accordion.Item eventKey="0" key={task.id}>
              <Accordion.Header>Accordion Item #1</Accordion.Header>
              <Accordion.Body>
                <ListItem  task={task} />
              </Accordion.Body>
            </Accordion.Item>
        ))} */}
      </Accordion>
    </motion.div>
  );
}

export default Test;
