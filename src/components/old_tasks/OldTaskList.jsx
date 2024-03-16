import ListItem from "../todays_tasks/ListItem";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Accordion } from "react-bootstrap";

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

// eslint-disable-next-line react/prop-types
const OldTaskList = ({ tasks = [{}] }) => {
  return (
    <Accordion.Item eventKey={tasks[0].date} >
      <Accordion.Header>{format(tasks[0].date, "E, d MMM")} </Accordion.Header>
      <Accordion.Body>
        <motion.ul
          variants={container}
          initial="hidden"
          animate="visible"
          className="list-group rounded-0"
        >
          {tasks.map((task) => (
            <ListItem key={task.id} task={task} />
          ))}
        </motion.ul>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OldTaskList;
