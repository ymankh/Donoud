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
  Checkbox,
  IconButton,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

const EditTaskModal = () => {
  const location = useLocation();
  const { modalOpen, close } = useModal();
  const { saveEditedTask, editedTask, setEditedTask } = useTasks();
  const [newSubTask, setNewSubTask] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveEditedTask();
    close();
  };

  useEffect(() => { if (location.pathname.includes("notes")) close(); }, [location]);

  const addSubTask = () => {
    const title = newSubTask.trim();
    if (!title || !editedTask) return;
    const nextSubTasks = [...(editedTask.subTasks ?? []), { id: uuidv4(), title, done: false }];
    setEditedTask({ ...editedTask, subTasks: nextSubTasks });
    setNewSubTask("");
  };

  const toggleSubTask = (subTaskId: string) => {
    if (!editedTask) return;
    const nextSubTasks = (editedTask.subTasks ?? []).map((subTask) =>
      subTask.id === subTaskId ? { ...subTask, done: !subTask.done } : subTask
    );
    setEditedTask({ ...editedTask, subTasks: nextSubTasks });
  };

  const removeSubTask = (subTaskId: string) => {
    if (!editedTask) return;
    const nextSubTasks = (editedTask.subTasks ?? []).filter((subTask) => subTask.id !== subTaskId);
    setEditedTask({ ...editedTask, subTasks: nextSubTasks });
  };

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
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Sub tasks
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Add sub task..."
                value={newSubTask}
                onChange={(e) => setNewSubTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSubTask();
                  }
                }}
              />
              <Button type="button" variant="outlined" onClick={addSubTask}>
                Add
              </Button>
            </Stack>
            <Stack spacing={0.5} sx={{ mt: 1 }}>
              {(editedTask?.subTasks ?? []).map((subTask) => (
                <Box
                  key={subTask.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 1,
                    px: 0.5,
                    py: 0.25,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
                    <Checkbox
                      size="small"
                      checked={subTask.done}
                      onChange={() => toggleSubTask(subTask.id)}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: subTask.done ? "line-through" : "none",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {subTask.title}
                    </Typography>
                  </Box>
                  <IconButton size="small" color="error" onClick={() => removeSubTask(subTask.id)}>
                    <DeleteOutline fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
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
