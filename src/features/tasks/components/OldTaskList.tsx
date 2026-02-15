import ListItem from "./ListItem";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Task } from "../models/TasksModel";

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

const OldTaskList = ({
  tasks,
  eventKey: _eventKey,
}: {
  tasks: Task[];
  eventKey: string;
}) => {
  tasks.sort((a, b) => {
    if (!a.done && b.done) return -1;
    else return 0;
  });
  return (
    <Accordion sx={{ mb: 1.5 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{format(tasks[0].date, "E, d MMM")}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <motion.ul
          variants={container}
          initial="hidden"
          animate="visible"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          {tasks.map((task) => (
            <ListItem key={task.id} task={task} />
          ))}
        </motion.ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default OldTaskList;
