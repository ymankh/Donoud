import { Container } from "react-bootstrap";
import Note from "./components/Note";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import NoteContext from "../../contexts/NoteContext";
import { useNavigate } from "react-router-dom";
import NoNoteImage from "./components/NoNoteImage";
import { motion } from "framer-motion";

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

const Notes = () => {
  const { notes, createNewNote } = useContext(NoteContext);
  const navigate = useNavigate();
  return (
    <motion.div
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
      exit={{ opacity: 0, x: 100 }}
    >
      <Fab
        color="secondary"
        style={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 80,
          left: "auto",
          position: "fixed",
        }}
        aria-label="add"
        onClick={() => {
          const newNoteId = createNewNote();
          navigate(newNoteId);
        }}
      >
        <AddIcon />
      </Fab>
      <Container>
        <div className="m-2" />
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="notes-list"
        >
          {notes.length > 0 ? (
            notes.map((note) => <Note key={note.id} note={note} />)
          ) : (
            <NoNoteImage />
          )}
        </motion.div>
      </Container>
      <div className="my-4 p-4 "></div>
    </motion.div>
  );
};

export default Notes;
