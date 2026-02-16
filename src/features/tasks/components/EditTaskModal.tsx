import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SelectCategory from "./SelectCategory";
import { TaskCategory } from "../models/TasksModel";
import { useTasks } from "../hooks/useTasks";
import { useModal } from "../hooks/useModal";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const EditTaskModal = () => {
  const location = useLocation();
  const { modalOpen, close } = useModal();
  useState<TaskCategory>("" as TaskCategory);
  const { saveEditedTask, editedTask, setEditedTask } = useTasks();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveEditedTask();
    close();
  };

  useEffect(() => { if (location.pathname.includes("notes")) close(); }, [location]);

  return (
    <Dialog
      open={modalOpen}
      onClose={close}
      fullWidth
      maxWidth="md"
      aria-labelledby="edit-task-title"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle id="edit-task-title">Edit task</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 2, pt: 0.5 }}>
            <Typography variant="body2" sx={{ width: "100%", mb: 1 }}>
              The task
            </Typography>
            <Box sx={{ flex: "1 1 360px" }}>
              <TextField
                fullWidth
                size="small"
                id="taskContent"
                placeholder="ex water the plant..."
                value={editedTask?.task}
                onChange={(e) =>
                  setEditedTask({ ...editedTask!, task: e.target.value })
                }
              />
            </Box>
            <Box sx={{ flex: "1 1 180px" }}>
              <SelectCategory selectedTaskCategory={editedTask?.category ?? ""} handelSelect={(value: TaskCategory) => setEditedTask({ ...editedTask!, category: value })} />
            </Box>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Details
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="taskDetails"
              value={editedTask?.details}
              onChange={(e) =>
                setEditedTask({ ...editedTask!, details: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: "100%" }}>
            <Button type="submit" variant="contained" sx={{ flex: 2 }}>
              Save
            </Button>
            <Button onClick={close} variant="outlined" sx={{ flex: 1 }}>
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EditTaskModal;
