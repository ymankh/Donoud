import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SelectCategory from "./SelectCategory";
import { TaskCategory } from "../models/TasksModel";
import { useTasks } from "../hooks/useTasks";
import { useModal } from "../hooks/useModal";
import { Box, TextField, Button, ButtonGroup, Typography } from "@mui/material";

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
          <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Typography variant="body2" sx={{ width: "100%", mb: 1 }}>
              The task
            </Typography>
            <Box sx={{ flex: "0 0 66.67%", maxWidth: "66.67%" }}>
              <TextField
                fullWidth
                size="small"
                id="taskContent"
                placeholder="ex water the planet..."
                value={editedTask?.task}
                onChange={(e) =>
                  setEditedTask({ ...editedTask!, task: e.target.value })
                }
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <SelectCategory selectedTaskCategory={editedTask?.category ?? ""} handelSelect={(value: TaskCategory) => setEditedTask({ ...editedTask!, category: value })} />
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Details
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              id="taskDetails"
              value={editedTask?.details}
              onChange={(e) =>
                setEditedTask({ ...editedTask!, details: e.target.value })
              }
            />
          </Box>
          <ButtonGroup fullWidth>
            <Button type="submit" variant="contained" sx={{ flex: 2 }}>
              Save
            </Button>
            <Button onClick={close} variant="outlined" sx={{ flex: 1 }}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default EditTaskModal;
