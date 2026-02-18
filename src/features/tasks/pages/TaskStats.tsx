import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@mui/material";
import { useTasks } from "../hooks/useTasks";
import TaskStatisticsSummaryModule from "../components/TaskStatisticsSummaryModule";
import AchievementTrackerModule from "../components/AchievementTrackerModule";
import EasterEggsModule from "../components/EasterEggsModule";

const TaskStats = () => {
  const { tasks } = useTasks();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="task-stats-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Container maxWidth="md" sx={{ py: 2, pb: 10 }}>
          <TaskStatisticsSummaryModule tasks={tasks} />
          <AchievementTrackerModule />
          <EasterEggsModule />
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskStats;
