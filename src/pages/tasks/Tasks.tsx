import ModalComponent from "../../components/ModalComponent";
import TaskLists from "../../components/TaskLists";
import { motion, AnimatePresence } from "framer-motion";

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
        <div className="mb-4"></div>
        <ModalComponent />
      </motion.div>
    </AnimatePresence>
  );
};

export default Tasks;
