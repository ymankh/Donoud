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
import { Box, Container, Paper, Typography } from "@mui/material";
import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import SelectNoteColor from "../components/SelectNoteColor";
import { Note, useNotes } from "../hooks/useNotes";
import { notesRoutes } from "../routes";

const NoteEdit = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const { getNoteById, updateNote } = useNotes();
  let editedNote: Note | undefined;
  try {
    if (noteId) editedNote = getNoteById(noteId);
  } catch (error) { 
    toast.error(`Some Thing went wrong while trying to get your note. 💀`);
    console.error(error);
  }
  const [note, setNote] = useState(editedNote);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (note) updateNote(note);
    else {
      navigate(notesRoutes.root);
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
        <Container sx={{ mt: 4, mb: 12 }}>
          <form onSubmit={handleSubmit}>
            <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Compose your note
              </Typography>
              <Box
                sx={{
                  minHeight: "68vh",
                  display: "flex",
                  flexDirection: "column",
                  "& .mdxeditor": { height: "100%", display: "flex", flexDirection: "column" },
                  "& .mdxeditor > div:not([role='toolbar'])": {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  },
                }}
              >
                <MDXEditor
                  autoFocus={true}
                  onChange={(text) => {
                    setNote({ ...note!, text });
                    updateNote(note!);
                  }}
                  plugins={[
                    toolbarPlugin({
                      toolbarContents: () => (
                        <>
                          <UndoRedo />
                          <BoldItalicUnderlineToggles />
                          <BlockTypeSelect />
                          <InsertTable />
                          <ListsToggle />
                          <SelectNoteColor
                            handelSelectNoteColor={(color) =>
                              setNote((current) =>
                                current === undefined ? undefined : { ...current, color }
                              )
                            }
                            selectedColor={note?.color ?? "darkOrange"}
                          />
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
              </Box>
            </Paper>
          </form>
        </Container>
      </motion.div>
    );
  else {
    return <></>;
  }
};

export default NoteEdit;
