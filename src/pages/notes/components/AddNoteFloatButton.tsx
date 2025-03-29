import { NoteAdd } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../../contexts/NoteContext";

export default function AddNoteFloatButton() {
  const navigate = useNavigate();
  const { createNewNote } = useContext(NoteContext)!;

  return (
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
  );
}
