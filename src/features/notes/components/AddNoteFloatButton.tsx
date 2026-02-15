import { CreateNewFolder, NoteAdd } from "@mui/icons-material";
import { Fab, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import TextInputDialog from "@/shared/components/TextInputDialog";

export default function AddNoteFloatButton() {
  const navigate = useNavigate();
  const { createNewNote, createFolder } = useNotes();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
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
    setFolderDialogOpen(true);
    handleClose();
  };

  const handleCreateFolder = () => {
    const name = folderName.trim();
    if (name) createFolder(name);
    setFolderName("");
    setFolderDialogOpen(false);
  };

  return (
    <>
      <Fab
        color="primary"
        sx={{ m: 0, top: "auto", right: 20, bottom: 80, left: "auto", position: "fixed" }}
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
          <NoteAdd style={{ marginRight: 8 }} />
          Add note
        </MenuItem>
        <MenuItem onClick={handleAddFolder}>
          <CreateNewFolder style={{ marginRight: 8 }} />
          Add folder
        </MenuItem>
      </Menu>

      <TextInputDialog
        open={folderDialogOpen}
        title="Create folder"
        label="Folder name"
        value={folderName}
        confirmLabel="Create"
        onChange={setFolderName}
        onClose={() => setFolderDialogOpen(false)}
        onConfirm={handleCreateFolder}
      />
    </>
  );
}
