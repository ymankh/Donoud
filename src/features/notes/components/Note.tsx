import { useNavigate } from "react-router-dom";
import { FC, useEffect, useRef, useState } from "react";
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
import { notesRoutes } from "../routes";
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Note: FC<{ note: NoteType }> = ({ note }) => {
  const navigate = useNavigate();
  const { deleteNote, updateNote } = useNotes();
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const noteColor = stickyNoteColors[note.color ?? "gold"];
  const { text: textColor, note: bgColor } = noteColor;

  useEffect(() => {
    const checkOverflow = () => {
      const el = previewRef.current;
      if (!el) return;
      setHasOverflow(el.scrollHeight - el.clientHeight > 4);
    };

    const raf = requestAnimationFrame(checkOverflow);
    const timeout = window.setTimeout(checkOverflow, 120);
    window.addEventListener("resize", checkOverflow);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [note.text]);

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
        padding: "0.75rem 0.75rem 0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        width: 280,
        height: 180,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 6, right: 6, zIndex: 1 }}>
        <PinNoteButton
          color={textColor}
          onClick={() => updateNote({ ...note, isPined: !note.isPined })}
          active={Boolean(note.isPined)}
        />
      </Box>
      <Box
        ref={previewRef}
        onClick={() => {
          navigate(notesRoutes.note(note.id));
        }}
        sx={{
          display: "block",
          fontSize: ".8em",
          flex: 1,
          minHeight: 0,
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          pt: 0.5,
          pr: 3,
          "& .mdxeditor-toolbar": { display: "none" },
          "& .mdxeditor": {
            height: "100%",
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backgroundColor: "transparent",
            color: "inherit",
          },
          "& .mdxeditor > div": {
            flex: 1,
            minHeight: 0,
          },
          "& .mdxeditor-root-contenteditable": {
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          },
          '& [contenteditable="true"]': {
            flex: 1,
            minHeight: "100%",
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 0.5,
          position: "relative",
          zIndex: 2,
          ...(hasOverflow
            ? {
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "100%",
                  height: 28,
                  pointerEvents: "none",
                  background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${bgColor} 95%)`,
                },
              }
            : {}),
        }}
      >
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
