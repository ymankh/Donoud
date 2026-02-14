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
import { FormEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteContext, { Note, stickyNoteColors } from "../../contexts/NoteContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import SelectNoteColor from "./editNoteToolbar/SelectNoteColor";

const NoteEdit = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const { getNoteById, updateNote, folders } = useContext(NoteContext)!;
  let editedNote: Note | undefined;
  try {
    if (noteId) editedNote = getNoteById(noteId);
  } catch (error) { }
  const [note, setNote] = useState(editedNote);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (note) updateNote(note);
    else {
      navigate("/notes");
      toast.error(`Some Thing went wrong while trying to get your note. 💀`);
    }
  }, [note]);
  if (editedNote)
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
        <div className=" container mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <select
                className="form-select"
                value={note?.folderId ?? ""}
                onChange={(e) =>
                  setNote((n) =>
                    n ? { ...n, folderId: e.target.value || undefined } : n
                  )
                }
              >
                <option value="">No Folder</option>
                {folders.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Paper elevation={4} sx={{ width: "auto", minHeight: "70vh", display: 'flex', flexDirection: 'column' }}>
                <MDXEditor
                  autoFocus={true}
                  onChange={(text) => {
                    setNote({ ...note!, text });
                    updateNote(note!);
                  }}
                  className="dark-theme flex-grow-1 d-flex flex-column"
                  contentEditableClassName="prose flex-grow-1"
                  plugins={[
                    toolbarPlugin({
                      toolbarContents: () => (
                        <>
                          <UndoRedo />
                          <BoldItalicUnderlineToggles />
                          <BlockTypeSelect />
                          <InsertTable />
                          <ListsToggle />
                          <SelectNoteColor handelSelectNoteColor={(color) => setNote(note => note === undefined ? undefined : { ...note, color })} selectedColor={note?.color ?? "darkOrange"} />
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
                  markdown={note!.text}
                />
              </Paper>
            </div>
          </form>
        </div>
        <div className="my-4 p-4"></div>
      </motion.div>
    );
  else {
    return <></>;
  }
};

export default NoteEdit;
