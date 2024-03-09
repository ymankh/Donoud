import { useContext } from "react";
import TasksContext from "../../contexts/TasksContext";
import { motion } from "framer-motion";
import ModalContext from "../../contexts/ModalContext";
import DeleteButton from "../shared/DeleteButton";

function formateDate(date = new Date()) {
  const hours = date.getHours();
  let amOrPm = "am";
  let displayedHour = hours;
  if (hours === 0) {
    displayedHour = 12;
  }
  if (hours >= 12) {
    amOrPm = "pm";
    if (hours > 12) {
      displayedHour = hours - 12;
    }
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${amOrPm} ${displayedHour}:${minutes}`;
}
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const ListItem = ({
  // eslint-disable-next-line react/prop-types
  task = { id: "", task: "", done: false, date: new Date() },
}) => {
  const { modalOpen, open, close } = useContext(ModalContext);
  const { markTaskFinished, deleteTask, setEditedTask } =
    useContext(TasksContext);
  const handleEditTask = () => {
    setEditedTask(task);
    modalOpen ? close() : open();
  };

  return (
    <>
      <motion.li
        variants={item}
        exit={item}
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
            {formateDate(task.date)}
          </div>
        </div>

        <DeleteButton onClick={() => deleteTask(task.id)} />
      </motion.li>
    </>
  );
};

export default ListItem;
