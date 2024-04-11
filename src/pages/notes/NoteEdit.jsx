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
import { useContext, useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import NoteContext from "../../contexts/NoteContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const NoteEdit = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const { getNoteById, updateNote } = useContext(NoteContext);
  let editedNote = null;
  try {
    editedNote = getNoteById(noteId);
  } catch (error) {}
  const [note, setNote] = useState(editedNote);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (typeof note !== "undefined") updateNote(note);
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
            <div>
              <Paper elevation={4} sx={{ width: "auto", minHeight: "70vh" }}>
                <MDXEditor
                  autoFocus={true}
                  onChange={(text) => {
                    setNote({ ...note, text });
                    updateNote(note);
                  }}
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
