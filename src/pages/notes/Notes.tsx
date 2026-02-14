import { Container } from "react-bootstrap";
import Note from "./components/Note";
import { useEffect } from "react";
import NoNoteImage from "./components/NoNoteImage";
import { motion, AnimatePresence } from "framer-motion";
import SortBar from "./components/SortBar";
import AddNoteFloatButton from "./components/AddNoteFloatButton";
import { useNotes } from "@/hooks/useNotes";
import { useFilter } from "@/hooks/useFilter";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Notes = () => {
  const {
    notes: allNotes,
    deleteEmptyNotes,
    sortValue,
    orderReversed,
    selectedFolder,
  } = useNotes();
  const { filter } = useFilter();

  const notes = allNotes
    .filter((note) =>
      note.text.includes(filter) &&
      (selectedFolder ? note.folderId === selectedFolder : true)
    )
    .sort((a, b) => {
      let difference = 0;
      if (sortValue === "Date created")
        difference = b.date.getTime() - a.date.getTime();
      else difference = b.lastChange.getTime() - a.lastChange.getTime();
      if (orderReversed) return -difference;
      return difference;
    })
    .sort((a, b) => {
      if (Boolean(a.isPined) !== Boolean(b.isPined)) {
        return a.isPined ? -1 : 1;
      } else {
        return 0;
      }
    });

  useEffect(() => {
    deleteEmptyNotes();
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <SortBar />
      <AddNoteFloatButton />
      <AnimatePresence mode="wait">
        {notes.length > 0 ? (
          <Container key="notes-list">
            <div className="m-2" />
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="notes-list"
            >
              <AnimatePresence>
                {notes.map((note) => (
                  <motion.div key={note.id} variants={item} exit="exit">
                    <Note note={note} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </Container>
        ) : (
          <NoNoteImage key="no-notes" />
        )}
      </AnimatePresence>
      <div className="my-4 p-4"></div>
    </motion.div>
  );
};

export default Notes;
