import ListItem from "./ListItem";
import AddTaskForm from "./AddTaskForm";
import NoListImage from "@/shared/components/NoListImage";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { Task } from "../models/TasksModel";
import { Container, Card, CardContent, Typography, Box } from "@mui/material";

// Function to Get a Random Congrats Message
function congratsTasksFinished(): string {
  const sentences = [
    "Congratulations on completing all your tasks for today! 🎉",
    "Well done on checking off everything on your to-do list today! 🌟",
    "Hats off to you for finishing all your tasks today! 👒",
    "Congratulations on a productive day! All tasks completed! 🚀",
    "You did it! All tasks for today are done! Congratulations! 🥳",
    "Way to go! You've conquered all your tasks for today! 🏆",
    "Congratulations on accomplishing everything you set out to do today! 🎉",
    "Fantastic job! You've successfully completed all your tasks for today! 🌟",
    "Mission accomplished! You've finished all your tasks for today! 🎯",
    "You've nailed it! All tasks completed! Congratulations! 💼",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

// Motion Variants
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const TaskList: React.FC<{
  tasks: Task[];
}> = ({ tasks = [] }) => {
  const { width, height } = useWindowSize();
  const [celebrating, setCelebrating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [allTasksDone, setAllTasksDone] = useState(false);

  // Sort tasks to show unfinished tasks first
  tasks.sort((a, b) => (!a.done && b.done ? -1 : 1));

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      if (tasks.length > 0) setAllTasksDone(!tasks.some((task) => !task.done));
      return;
    }

    if (
      tasks.length > 0 &&
      tasks.every((task) => task.done) &&
      !celebrating &&
      !allTasksDone
    ) {
      toast.success(congratsTasksFinished());
      setCelebrating(true);
      setAllTasksDone(true);
      setTimeout(() => {
        setCelebrating(false);
      }, 10 * 1000);
    }
  }, [tasks, celebrating, allTasksDone, isMounted]);

  return (
    <section id="notes">
      {celebrating && (
        <Confetti
          numberOfPieces={800}
          recycle={false}
          run={celebrating}
          width={width}
          height={height}
        />
      )}
      <Container maxWidth="sm" sx={{ py: 5, height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4, boxShadow: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h4" component="span" sx={{ mr: 2 }}>
                    Today&rsquo;s Tasks
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ pb: 2 }}
                >
                  {format(new Date(), "EE, d MMM")}
                </Typography>
                <AddTaskForm />
                <Box sx={{ mb: 3 }} />
                <motion.ul
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  style={{ listStyle: "none", padding: 0, margin: 0 }}
                >
                  {tasks.length === 0 ? (
                    <NoListImage />
                  ) : (
                    tasks.map((task) => <ListItem key={task.id} task={task} />)
                  )}
                </motion.ul>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default TaskList;
