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
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NoteContext from "../../contexts/NoteContext";
import { motion } from "framer-motion";

const NoteEdit = () => {
  const { noteId } = useParams();
  const { getNoteById, updateNote } = useContext(NoteContext);
  const [note, setNote] = useState(getNoteById(noteId));
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    updateNote(note);
  }, [note]);
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
            <Paper
              elevation={4}
              sx={{ width: "auto", minHeight: "70vh" }}
              className="mdx-container"
            >
              <MDXEditor
                style={{ minHeight: "80vh" }}
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
};

export default NoteEdit;
