import { Container } from "react-bootstrap";
import Note from "./components/Note";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import NoteContext from "../../contexts/NoteContext";
import { useNavigate } from "react-router-dom";
import NoNoteImage from "./components/NoNoteImage";

const Notes = () => {
  const { notes, createNewNote } = useContext(NoteContext);
  const navigate = useNavigate();
  return (
    <>
      
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
        <div className="notes-list">
          
          {notes.length >0? notes.map((note) => (
            <Note key={note.id} note={note} />
          )):  <NoNoteImage/>}
        </div>
      </Container>
      <div className="my-4 p-4 "></div>
    </>
  );
};

export default Notes;
