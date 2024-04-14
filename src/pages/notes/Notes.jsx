import { Container } from "react-bootstrap";
import Note from "./components/Note";
import Fab from "@mui/material/Fab";
import { useContext, useEffect, useState } from "react";
import NoteContext from "../../contexts/NoteContext";
import { useNavigate } from "react-router-dom";
import NoNoteImage from "./components/NoNoteImage";
import { motion } from "framer-motion";
import FilterContext from "../../contexts/FilterContext";
import SortBar from "./components/SortBar";
import NoteAdd from "@mui/icons-material/NoteAdd";

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
  const sortOptions = ["Date created", "Date modified"];
  const [orderReversed, setOrderReversed] = useState(false);
  const [sortValue, setSortValue] = useState(sortOptions[0]);

  const {
    notes: allNotes,
    createNewNote,
    deleteEmptyNotes,
  } = useContext(NoteContext);
  const { filter } = useContext(FilterContext);
  const notes = allNotes
    .filter((note) => note.text.includes(filter))
    .sort((a, b) => {
      let difference = 0;
      if (sortValue == "Date created") difference = b.date - a.date;
      else difference = b.lastChange - a.lastChange;
      if (orderReversed) return -difference;
      return difference;
    })
    .sort((a, b) => {
      if (Boolean(a.isPined) !== Boolean(b.isPined)) {
        // Sort pinned before not pined
        return a.isPined ? -1 : 1;
      } else {
        // If both are not pinned, no further sorting needed
        return 0;
      }
    });
  const navigate = useNavigate();
  useEffect(() => {
    deleteEmptyNotes();
  }, []);
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
      <SortBar
        sortOptions={sortOptions}
        value={sortValue}
        setValue={setSortValue}
        orderReversed={orderReversed}
        setOrderReversed={setOrderReversed}
      />
      <Fab
        color="primary"
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
        <NoteAdd />
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
