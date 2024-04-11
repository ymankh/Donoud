import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useContext, useEffect } from "react";
import ModalContext from "../../contexts/ModalContext";
import TasksContext from "../../contexts/TasksContext";
import { useLocation } from "react-router-dom";
import { Notes } from "@mui/icons-material";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = () => {
  const { close } = useContext(ModalContext);
  const { saveEditedTask, editedTask, setEditedTask } =
    useContext(TasksContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    saveEditedTask();
    close();
  };
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("notes")) close();
  }, [location]);
  return (
    <Backdrop onClick={close}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal-new"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskContent" className="form-label">
              The task
            </label>
            <input
              type="text"
              className="form-control"
              id="taskContent"
              placeholder="ex water the planet..."
              value={editedTask.task}
              onChange={(e) =>
                setEditedTask({ ...editedTask, task: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskDetails" className="form-label">
              Details
            </label>
            <textarea
              className="form-control"
              id="taskDetails"
              rows="3"
              value={editedTask.details}
              onChange={(e) =>
                setEditedTask({ ...editedTask, details: e.target.value })
              }
            ></textarea>
          </div>
          <div className="btn-group ">
            <button type="submit" className="btn btn-primary">
              Save added changes
            </button>
            <button onClick={close} className="btn btn-outline-primary ">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
