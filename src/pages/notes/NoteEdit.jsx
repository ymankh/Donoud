import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  InsertTable,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import { Paper } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteContext from "../../contexts/NoteContext";

const NoteEdit = () => {
  const { noteId } = useParams();
  const { getNoteById, deleteNote, updateNote } = useContext(NoteContext);
  const [note, setNote] = useState(getNoteById(noteId));
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className=" container mt-4">
        <form onSubmit={handleSubmit}>
          <div>
            <Paper elevation={4} sx={{ width: "auto", minHeight: "70vh" }}>
              <MDXEditor
                onChange={(text) => setNote({ ...note, text })}
                className="dark-theme"
                contentEditableClassName="prose"
                plugins={[
                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        {" "}
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <BlockTypeSelect />
                        <InsertTable />
                        <ListsToggle />
                      </>
                    ),
                  }),
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),
                  tablePlugin(),
                ]}
                markdown={note.text}
              />
            </Paper>
          </div>
          <div className="row">
            <div className="btn-group">
              <button
                className="btn btn-primary"
                onClick={() => {
                  updateNote(note);
                  navigate("/notes");
                }}
              >
                Save
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteNote(note);
                  navigate("/notes");
                }}
              >
                Delete
              </button>
              <button
                onClick={() => navigate("/notes")}
                className="btn btn-secondary "
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="my-4 p-4"></div>
    </>
  );
};

export default NoteEdit;
