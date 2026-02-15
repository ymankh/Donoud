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
import { Box, Container, FormControl, MenuItem, Paper, Select } from "@mui/material";
import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import SelectNoteColor from "../components/SelectNoteColor";
import { Note, useNotes } from "../hooks/useNotes";

const NoteEdit = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const { getNoteById, updateNote, folders } = useNotes();
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
        <Container sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth size="small">
                <Select
                  value={note?.folderId ?? ""}
                  onChange={(e) =>
                    setNote((n) =>
                      n ? { ...n, folderId: String(e.target.value) || undefined } : n
                    )
                  }
                >
                  <MenuItem value="">No Folder</MenuItem>
                  {folders.map((f) => (
                    <MenuItem key={f.id} value={f.id}>
                      {f.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Paper elevation={4} sx={{ width: "auto", minHeight: "70vh", display: "flex", flexDirection: "column" }}>
                <MDXEditor
                  autoFocus={true}
                  onChange={(text) => {
                    setNote({ ...note!, text });
                    updateNote(note!);
                  }}
                  className="dark-theme"
                  contentEditableClassName="prose"
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
            </Box>
          </form>
        </Container>
        <Box sx={{ my: 4, p: 4 }} />
      </motion.div>
    );
  else {
    return <></>;
  }
};

export default NoteEdit;
