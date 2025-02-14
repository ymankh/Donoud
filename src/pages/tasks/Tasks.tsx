import ModalComponent from "../../components/ModalComponent";
import TaskLists from "../../components/TaskLists";
import { motion } from "framer-motion";
const Tasks = () => {
  return (
    <motion.div
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
      exit={{ opacity: 0, x: 100 }}
    >
      <TaskLists />
      <div className="mb-4"></div>
      <ModalComponent />
    </motion.div>
  );
};

export default Tasks;
