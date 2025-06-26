import { useContext } from "react";
import NoteContext from "@/contexts/NoteContext";

const FolderMenu = () => {
  const {
    folders,
    selectedFolder,
    setSelectedFolder,
    createFolder,
    renameFolder,
    deleteFolder,
  } = useContext(NoteContext)!;

  const addFolder = () => {
    const name = prompt("Folder name?");
    if (name) createFolder(name);
  };

  const rename = () => {
    const folder = folders.find((f) => f.id === selectedFolder);
    const name = prompt("Rename folder", folder?.name);
    if (name && selectedFolder) renameFolder(selectedFolder, name);
  };

  const remove = () => {
    if (selectedFolder && confirm("Delete folder?")) deleteFolder(selectedFolder);
  };

  return (
    <div className="d-flex align-items-center gap-1">
      <select
        className="form-select"
        value={selectedFolder}
        onChange={(e) => setSelectedFolder(e.target.value)}
      >
        <option value="">All Notes</option>
        {folders.map((f) => (
          <option key={f.id} value={f.id}>
            {f.name}
          </option>
        ))}
      </select>
      <button className="btn btn-sm btn-secondary" onClick={addFolder}>
        +
      </button>
      {selectedFolder && (
        <>
          <button className="btn btn-sm btn-secondary" onClick={rename}>
            Rename
          </button>
          <button className="btn btn-sm btn-danger" onClick={remove}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default FolderMenu;

