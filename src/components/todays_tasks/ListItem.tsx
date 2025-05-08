import { useContext } from "react";
import { motion } from "framer-motion";
import TasksContext from "../../contexts/TasksContext";
import ModalContext from "../../contexts/ModalContext";
import DeleteButton from "../shared/DeleteButton";
import { formatDate } from "../../utils/dates";
import { Task } from "../../Models/TasksModel";

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ListItem: React.FC<{ task: Task }> = ({
  task = {
    id: "",
    task: "",
    done: false,
    date: new Date(),
    category: "",
  },
}) => {
  const { modalOpen, open, close } = useContext(ModalContext)!;
  const { markTaskFinished, deleteTask, setEditedTask } =
    useContext(TasksContext)!;

  const handleEditTask = () => {
    setEditedTask(task);
    modalOpen ? close() : open();
  };

  return (
    <motion.li
      variants={item}
      exit={item.hidden}
      layout
      className="task list-group-item border-0 d-flex align-items-center ps-0"
    >
      <input
        className="form-check-input me-3"
        type="checkbox"
        checked={task.done}
        onChange={() => markTaskFinished(task.id)}
      />
      <div className="row flex-grow-1" onClick={handleEditTask}>
        <div className="col-8" style={task.done ? { textDecoration: "line-through" } : {}}>
          <div>{task.task}</div>
          <div className="small text-muted">{formatDate(task.date)}</div>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          <div className="me-2">{task.category}</div>
        </div>
      </div>
      <div className="flex-shrink-1">
        <DeleteButton onClick={() => deleteTask(task.id)} />
      </div>
    </motion.li>
  );
};

export default ListItem;
