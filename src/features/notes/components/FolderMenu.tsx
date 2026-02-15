import { FaFolder } from "react-icons/fa";
import { Box, Button, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import { useNotes } from "../hooks/useNotes";
import ConfirmDialog from "@/shared/components/ConfirmDialog";
import TextInputDialog from "@/shared/components/TextInputDialog";

const FolderMenu = () => {
  const {
    folders,
    selectedFolder,
    setSelectedFolder,
    renameFolder,
    deleteFolder,
  } = useNotes();
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const selectedFolderName = useMemo(
    () => folders.find((f) => f.id === selectedFolder)?.name ?? "",
    [folders, selectedFolder]
  );

  const rename = () => {
    if (!selectedFolder) return;
    setRenameValue(selectedFolderName);
    setRenameOpen(true);
  };

  const remove = () => {
    if (!selectedFolder) return;
    setDeleteOpen(true);
  };

  const handleRenameConfirm = () => {
    const name = renameValue.trim();
    if (name && selectedFolder) renameFolder(selectedFolder, name);
    setRenameOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedFolder) deleteFolder(selectedFolder);
    setDeleteOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
        <Button
          variant={selectedFolder ? "outlined" : "contained"}
          color="primary"
          onClick={() => setSelectedFolder("")}
          type="button"
        >
          All Notes
        </Button>
        {folders.map((folder) => (
          <Button
            key={folder.id}
            variant={selectedFolder === folder.id ? "contained" : "outlined"}
            color="primary"
            startIcon={<FaFolder />}
            onClick={() => setSelectedFolder(folder.id)}
            type="button"
          >
            {folder.name}
          </Button>
        ))}
      </Stack>
      {selectedFolder && (
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={rename}
            type="button"
          >
            Rename
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={remove}
            type="button"
          >
            Delete
          </Button>
        </Stack>
      )}

      <TextInputDialog
        open={renameOpen}
        title="Rename folder"
        label="Folder name"
        value={renameValue}
        confirmLabel="Rename"
        onChange={setRenameValue}
        onClose={() => setRenameOpen(false)}
        onConfirm={handleRenameConfirm}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete folder?"
        description="This action will keep notes but remove the folder."
        confirmLabel="Delete"
        confirmColor="error"
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default FolderMenu;
