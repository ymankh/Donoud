import { ChangeEvent, FormEvent, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { TaskCategory } from "../models/TasksModel";
import { getSentenceForTask, randomEmoji, taskKeywords } from "../utils/sentencesGenerator";
import SelectCategory from "./SelectCategory";
import { useTasks } from "../hooks/useTasks";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";


const AddTaskForm = () => {
  const [task, setTask] = useState("");
  const [selectedTaskCategory, setSelectedTaskCategory] =
    useState<TaskCategory>("" as TaskCategory);
  const { addTask } = useTasks();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.length < 5) {
      toast.error("Task should be at least 5 characters" + randomEmoji(), {
        transition: Bounce,
      });
      return;
    }

    const showToast = (sentence: string) => {
      toast.success(sentence, { transition: Bounce });
    };

    const checkTask = (task: string, keywords: string[]) => {
      return keywords.some((word) => task.includes(word));
    };

    const handleTask = (task: string) => {
      for (const [taskName, keywords] of Object.entries(taskKeywords)) {
        if (checkTask(task, keywords)) {
          showToast(getSentenceForTask(taskName));
          return;
        }
      }
    };

    handleTask(task);
    addTask(task, selectedTaskCategory);
    setTask("");
    setSelectedTaskCategory("");
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Add a new task
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Box sx={{ flex: "1 1 auto" }}>
            <TextField
              fullWidth
              size="small"
              id="Task"
              placeholder="ex water the plant..."
              value={task}
              onChange={onChange}
            />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: 180 } }}>
            <SelectCategory selectedTaskCategory={selectedTaskCategory} handelSelect={(value: TaskCategory) => setSelectedTaskCategory(value)} />
          </Box>
        </Stack>
      </Box>
      <Button type="submit" variant="contained" color="primary" size="large">
        Add task
      </Button>
    </form>
  );
};

export default AddTaskForm;
