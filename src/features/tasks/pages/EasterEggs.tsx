import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@mui/material";
import EasterEggsModule from "../components/EasterEggsModule";
import AchievementTrackerModule from "../components/AchievementTrackerModule";

const EasterEggs = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="easter-eggs-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Container maxWidth="md" sx={{ py: 2, pb: 10 }}>
          <AchievementTrackerModule />
          <EasterEggsModule />
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default EasterEggs;
