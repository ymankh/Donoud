import { FaFolder } from "react-icons/fa";
import { Box, Button, Stack } from "@mui/material";
import { useNotes } from "../hooks/useNotes";

const FolderMenu = () => {
  const {
    folders,
    selectedFolder,
    setSelectedFolder,
    renameFolder,
    deleteFolder,
  } = useNotes();

  const rename = () => {
    const folder = folders.find((f) => f.id === selectedFolder);
    const name = prompt("Rename folder", folder?.name);
    if (name && selectedFolder) renameFolder(selectedFolder, name);
  };

  const remove = () => {
    if (selectedFolder && confirm("Delete folder?")) deleteFolder(selectedFolder);
  };

  return (
    <Box className="note-folders">
      <Stack className="note-folders-list" direction="row" useFlexGap flexWrap="wrap" spacing={1}>
        <Button
          variant={selectedFolder ? "outlined" : "contained"}
          color="primary"
          sx={{ borderRadius: 999 }}
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
            sx={{ borderRadius: 999 }}
            onClick={() => setSelectedFolder(folder.id)}
            type="button"
          >
            {folder.name}
          </Button>
        ))}
      </Stack>
      {selectedFolder && (
        <Stack className="note-folders-actions" direction="row" useFlexGap flexWrap="wrap" spacing={1}>
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
    </Box>
  );
};

export default FolderMenu;
