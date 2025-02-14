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
  } as Task,
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
      <div className="row" onClick={handleEditTask}>
        <div
          style={task.done ? { textDecoration: "line-through" } : {}}
          className="col-12"
        >
          {task.task}
        </div>
        <div className="small text-muted col-12">
          {formatDate(new Date(task.date))} {/* Ensure it's a Date object */}
        </div>
      </div>

      <DeleteButton onClick={() => deleteTask(task.id)} />
    </motion.li>
  );
};

export default ListItem;
