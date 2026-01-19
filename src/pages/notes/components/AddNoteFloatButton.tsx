import { CreateNewFolder, NoteAdd } from "@mui/icons-material";
import { Fab, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../../contexts/NoteContext";

export default function AddNoteFloatButton() {
  const navigate = useNavigate();
  const { createNewNote, createFolder } = useContext(NoteContext)!;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddNote = () => {
    const newNoteId = createNewNote();
    navigate(newNoteId);
    handleClose();
  };

  const handleAddFolder = () => {
    const name = prompt("Folder name?");
    if (name) createFolder(name);
    handleClose();
  };

  return (
    <>
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
        aria-controls={open ? "notes-add-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <NoteAdd />
      </Fab>
      <Menu
        id="notes-add-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MenuItem onClick={handleAddNote}>
          <NoteAdd className="me-2" />
          Add note
        </MenuItem>
        <MenuItem onClick={handleAddFolder}>
          <CreateNewFolder className="me-2" />
          Add folder
        </MenuItem>
      </Menu>
    </>
  );
}
