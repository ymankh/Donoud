import { FaFolder } from "react-icons/fa";
import { useNotes } from "@/hooks/useNotes";

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
    <div className="note-folders">
      <div className="note-folders-list">
        <button
          className={`note-folder-button${selectedFolder ? "" : " active"}`}
          onClick={() => setSelectedFolder("")}
          type="button"
        >
          All Notes
        </button>
        {folders.map((folder) => (
          <button
            key={folder.id}
            className={`note-folder-button${selectedFolder === folder.id ? " active" : ""}`}
            onClick={() => setSelectedFolder(folder.id)}
            type="button"
          >
            <FaFolder className="me-2" />
            {folder.name}
          </button>
        ))}
      </div>
      {selectedFolder && (
        <div className="note-folders-actions">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={rename}
            type="button"
          >
            Rename
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={remove}
            type="button"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FolderMenu;
