import ModalComponent from "../components/ModalComponent";
import TaskLists from "../components/TaskLists";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";

const Tasks = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="tasks-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0}}
        transition={{ duration: 0.3 }}
      >
        <TaskLists />
        <Box sx={{ mb: 4 }} />
        <ModalComponent />
      </motion.div>
    </AnimatePresence>
  );
};

export default Tasks;
