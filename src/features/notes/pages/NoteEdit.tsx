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
import {
  Box,
  Container,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import SelectNoteColor from "../components/SelectNoteColor";
import { Note, StickyNoteColor, useNotes } from "../hooks/useNotes";
import { notesRoutes } from "../routes";

const NoteEditorToolbar = ({
  selectedColor,
  onColorChange,
}: {
  selectedColor: StickyNoteColor;
  onColorChange: (color: StickyNoteColor) => void;
}) => {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("sm"));
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <UndoRedo />
      <BoldItalicUnderlineToggles />
      {compact ? (
        <Box
          onKeyDown={(event) => {
            if (event.key === "Escape") setMoreOpen(false);
          }}
          sx={{ position: "relative", display: "flex" }}
        >
          <IconButton
            aria-controls={moreOpen ? "more-formatting-panel" : undefined}
            aria-label="More formatting options"
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen((open) => !open)}
            sx={{ color: "var(--baseTextContrast)" }}
          >
            <MoreHorizIcon />
          </IconButton>
          {moreOpen && (
            <Paper
              aria-label="More formatting options"
              elevation={8}
              id="more-formatting-panel"
              role="dialog"
              sx={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                zIndex: 4,
                width: 240,
                p: 1.5,
                backgroundColor: "var(--baseBg)",
                color: "var(--baseTextContrast)",
              }}
            >
              <Typography
                variant="caption"
                sx={{ display: "block", mb: 1, color: "inherit", fontWeight: 700 }}
              >
                More formatting
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}>
                <BlockTypeSelect />
                <InsertTable />
                <ListsToggle />
                <SelectNoteColor
                  handelSelectNoteColor={onColorChange}
                  selectedColor={selectedColor}
                />
              </Box>
            </Paper>
          )}
        </Box>
      ) : (
        <>
          <BlockTypeSelect />
          <InsertTable />
          <ListsToggle />
          <SelectNoteColor
            handelSelectNoteColor={onColorChange}
            selectedColor={selectedColor}
          />
        </>
      )}
    </>
  );
};

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
  }, [navigate, note, updateNote]);
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
        <Container
          sx={{
            mt: 4,
            mb: 12,
            height: "calc(100vh - 180px)",
            display: "flex",
            minHeight: 0,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
              minWidth: 0,
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: "column",
                gap: 2,
                flex: 1,
                minHeight: 0,
                minWidth: 0,
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Compose your note
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "100%",
                  overflow: "hidden",
                  "& .mdxeditor": {
                    height: "100%",
                    width: "100%",
                    maxWidth: "100%",
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  },
                  "& .mdxeditor [role='toolbar']": {
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    flexWrap: "nowrap",
                    overflowX: { xs: "visible", sm: "auto" },
                    overscrollBehaviorX: "contain",
                  },
                  "@media (max-width: 599.95px)": {
                    "& .mdxeditor [role='toolbar'] button:not([role='combobox'])": {
                      width: 44,
                      minWidth: 44,
                      height: 44,
                    },
                  },
                  "& .mdxeditor > div:not([role='toolbar'])": {
                    flex: 1,
                    minWidth: 0,
                    maxWidth: "100%",
                    display: "flex",
                    flexDirection: "column",
                  },
                  "& .mdxeditor-root-contenteditable": {
                    minWidth: 0,
                    maxWidth: "100%",
                    overflowX: "auto",
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
                        <NoteEditorToolbar
                          onColorChange={(color) =>
                            setNote((current) =>
                              current === undefined ? undefined : { ...current, color }
                            )
                          }
                          selectedColor={note?.color ?? "darkOrange"}
                        />
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
