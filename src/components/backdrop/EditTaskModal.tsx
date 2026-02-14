import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SelectCategory from "../SelectCategory";
import { TaskCategory } from "../../Models/TasksModel";
import { useTasks } from "@/hooks/useTasks";
import { useModal } from "@/hooks/useModal";

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

const EditTaskModal = () => {
  const location = useLocation();
  const { close } = useModal();
  useState<TaskCategory>("" as TaskCategory);
  const { saveEditedTask, editedTask, setEditedTask } = useTasks();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveEditedTask();
    close();
  };

  useEffect(() => { if (location.pathname.includes("notes")) close(); }, [location]);

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
          <div className="mb-3 row">
            <label htmlFor="taskContent" className="form-label">
              The task
            </label>
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                id="taskContent"
                placeholder="ex water the planet..."
                value={editedTask?.task}
                onChange={(e) =>
                  setEditedTask({ ...editedTask!, task: e.target.value })
                }
              />
            </div>
            <div className="col-4">
              <SelectCategory selectedTaskCategory={editedTask?.category ?? ""} handelSelect={(value: TaskCategory) => setEditedTask({ ...editedTask!, category: value })} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="taskDetails" className="form-label">
              Details
            </label>
            <textarea
              className="form-control"
              id="taskDetails"
              rows={3}
              value={editedTask?.details}
              onChange={(e) =>
                setEditedTask({ ...editedTask!, details: e.target.value })
              }
            ></textarea>
          </div>
          <div className="row">
            <div className="btn-group ">
              <button type="submit" className="btn btn-primary col-8">
                Save
              </button>
              <button onClick={close} className="btn btn-outline-primary col-4">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default EditTaskModal;