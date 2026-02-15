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
        padding: "0.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: 280,
        height: 240,
        overflow: "hidden",
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
        ref={previewRef}
        onClick={() => {
          navigate(`${note.id}`);
        }}
        sx={{
          display: "block",
          fontSize: ".8em",
          flex: 1,
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          "& .mdxeditor-toolbar": { display: "none" },
          "& .mdxeditor": {
            height: "100%",
            overflow: "hidden",
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
        {hasOverflow ? (
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 28,
              pointerEvents: "none",
              background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${bgColor} 95%)`,
            }}
          />
        ) : null}
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
