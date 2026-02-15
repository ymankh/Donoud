import { motion } from "framer-motion";
import DeleteButton from "@/shared/components/DeleteButton";
import { formatDate } from "@/shared/utils/dates";
import { Task } from "../models/TasksModel";
import { useAudio } from "react-use";
import strikethroughSound from "@/sounds/strikethrough.wav";
import { useTasks } from "../hooks/useTasks";
import { useModal } from "../hooks/useModal";
import { Box, Checkbox, Typography } from "@mui/material";

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
  const [audio, _, soundEffect] = useAudio({
    src: strikethroughSound,
    autoPlay: false,
  });
  const { modalOpen, open, close } = useModal();
  const { markTaskFinished, deleteTask, setEditedTask } = useTasks();

  const handleEditTask = () => {
    setEditedTask(task);
    modalOpen ? close() : open();
  };

  return (
    <motion.li
      variants={item}
      exit={item.hidden}
      layout
      className="task"
      style={{
        display: "flex",
        alignItems: "center",
        listStyle: "none",
        paddingLeft: 0,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Checkbox
        checked={task.done}
        onChange={() => {
          markTaskFinished(task.id);
          soundEffect.play();
        }}
        sx={{ mr: 1 }}
      />
      <Box
        sx={{ display: "flex", flexGrow: 1, cursor: "pointer" }}
        onClick={handleEditTask}
      >
        <Box sx={{ flex: "0 0 66.67%", maxWidth: "66.67%" }}>
          <Box>
            <span
              className={
                "animated-strikethrough " + (task.done ? "active" : "")
              }
            >
              {task.task}
            </span>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {formatDate(task.date)}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: "0 0 33.33%",
            maxWidth: "33.33%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="body2" sx={{ mr: 1 }}>
            {task.category}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flexShrink: 1 }}>
        <DeleteButton onClick={() => deleteTask(task.id)} />
      </Box>
      {audio}
    </motion.li>
  );
};

export default ListItem;
