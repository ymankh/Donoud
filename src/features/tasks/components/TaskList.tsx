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
import {
  unlockAchievement,
} from "@/shared/utils/engagementTracker";

const STREAK_COUNT_KEY = "easter-completion-streak-count";
const STREAK_LAST_DAY_KEY = "easter-completion-streak-last-day";
const STREAK_CELEBRATED_DAY_KEY = "easter-completion-streak-celebrated-day";

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

const toDayDate = (day: string): Date => new Date(`${day}T00:00:00`);
const isYesterday = (lastDay: string, currentDay: string): boolean => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = toDayDate(currentDay).getTime() - toDayDate(lastDay).getTime();
  return diff === msPerDay;
};

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
      const completionMessage = congratsTasksFinished();
      toast.success(completionMessage);
      unlockAchievement("daily-completion", "tasks:all-done");
      const now = new Date();
      const dayKey = format(now, "yyyy-MM-dd");

      const speedrunKey = `easter-speedrun-${dayKey}`;
      if (now.getHours() < 12 && !sessionStorage.getItem(speedrunKey)) {
        const speedrunMessage = "Speedrun achieved: all tasks done before noon. ⚡";
        toast.success(speedrunMessage);
        unlockAchievement("speedrun", "tasks:speedrun");
        sessionStorage.setItem(speedrunKey, "true");
      }

      const lastStreakDay = localStorage.getItem(STREAK_LAST_DAY_KEY);
      if (lastStreakDay !== dayKey) {
        const prevStreak = Number(localStorage.getItem(STREAK_COUNT_KEY) || "0");
        const nextStreak =
          lastStreakDay && isYesterday(lastStreakDay, dayKey) ? prevStreak + 1 : 1;

        localStorage.setItem(STREAK_COUNT_KEY, String(nextStreak));
        localStorage.setItem(STREAK_LAST_DAY_KEY, dayKey);

        if (
          nextStreak >= 7 &&
          localStorage.getItem(STREAK_CELEBRATED_DAY_KEY) !== dayKey
        ) {
          const streakMessage = "Perfect streak: 7 days in a row. 🔥";
          toast.success(streakMessage);
          unlockAchievement("streak-7", "tasks:streak");
          localStorage.setItem(STREAK_CELEBRATED_DAY_KEY, dayKey);
        }
      }

      setCelebrating(true);
      setAllTasksDone(true);
      setTimeout(() => {
        setCelebrating(false);
      }, 10 * 1000);
    }
  }, [tasks, celebrating, allTasksDone, isMounted]);

  return (
    <Box component="section" sx={{ pb: 2 }}>
      {celebrating && (
        <Confetti
          numberOfPieces={800}
          recycle={false}
          run={celebrating}
          width={width}
          height={height}
        />
      )}
      <Container maxWidth="md" sx={{ py: 4, height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Card>
              <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h4" component="h1">
                    Today&rsquo;s Tasks
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {format(new Date(), "EE, d MMM")}
                  </Typography>
                </Box>
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
    </Box>
  );
};

export default TaskList;
