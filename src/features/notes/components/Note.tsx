import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { motion } from "framer-motion";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import { Note as NoteType, stickyNoteColors, useNotes } from "../hooks/useNotes";
import ModalComponent from "@/features/tasks/components/ModalComponent";
import { format } from "date-fns";
import DeleteNoteButton from "./DeleteNoteButton";
import PinNoteButton from "./PinNoteButton";
import { Box, Typography } from "@mui/material";
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Note: FC<{ note: NoteType }> = ({ note }) => {
  const navigate = useNavigate();
  const { deleteNote, updateNote } = useNotes();
  const noteColor = stickyNoteColors[note.color ?? "gold"];
  const { text: textColor, note: bgColor } = noteColor;
  return (
    <motion.div
      variants={item}
      exit={item.hidden}
      transition={{ duration: 0.2 }}
      layout="position"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: 8,
        padding: "0.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        minHeight: 220,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <PinNoteButton
          color={textColor}
          onClick={() => updateNote({ ...note, isPined: !note.isPined })}
          active={Boolean(note.isPined)}
        />
      </Box>
      <Box
        onClick={() => {
          navigate(`${note.id}`);
        }}
        sx={{
          display: "block",
          fontSize: ".8em",
          minHeight: 118,
          cursor: "pointer",
          overflow: "hidden",
          "& .mdxeditor-toolbar": { display: "none" },
          "& .mdxeditor": {
            backgroundColor: "transparent",
            color: "inherit",
          },
        }}
      >
        <MDXEditor
          markdown={note.text}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            tablePlugin(),
          ]}
          readOnly={true}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: "auto" }}>
        <Typography variant="caption" sx={{ color: textColor }}>
          {format(note.date, "yyy MMM d p")}
        </Typography>
        <DeleteNoteButton onClick={() => deleteNote(note)} color={textColor} />
      </Box>
      <ModalComponent />
    </motion.div>
  );
};

export default Note;
