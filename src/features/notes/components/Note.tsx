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
import { CheckCircle } from "@mui/icons-material";
import { notesRoutes } from "../routes";
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const LONG_PRESS_MS = 450;

const Note: FC<{
  note: NoteType;
  selectionMode?: boolean;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  onLongPressSelect?: (id: string) => void;
}> = ({
  note,
  selectionMode = false,
  selected = false,
  onToggleSelect,
  onLongPressSelect,
}) => {
  const navigate = useNavigate();
  const { deleteNote, updateNote } = useNotes();
  const previewRef = useRef<HTMLDivElement | null>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const longPressTriggeredRef = useRef(false);
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
    const timeout = globalThis.setTimeout(checkOverflow, 120);
    globalThis.addEventListener("resize", checkOverflow);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      globalThis.removeEventListener("resize", checkOverflow);
    };
  }, [note.text]);

  const clearPressTimer = () => {
    if (longPressTimerRef.current) {
      globalThis.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handlePressStart = () => {
    longPressTriggeredRef.current = false;
    clearPressTimer();
    longPressTimerRef.current = globalThis.setTimeout(() => {
      longPressTriggeredRef.current = true;
      onLongPressSelect?.(note.id);
    }, LONG_PRESS_MS);
  };

  const handlePressEnd = () => {
    clearPressTimer();
  };

  useEffect(() => clearPressTimer, []);

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
        border: selected ? "2px solid #4FC3F7" : "2px solid transparent",
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
      {selectionMode && (
        <Box sx={{ position: "absolute", top: 6, left: 6, zIndex: 2, color: "#4FC3F7" }}>
          <CheckCircle fontSize="small" sx={{ opacity: selected ? 1 : 0.35 }} />
        </Box>
      )}
      <Box sx={{ position: "absolute", top: 6, right: 6, zIndex: 1 }}>
        {!selectionMode && (
          <PinNoteButton
            color={textColor}
            onClick={() => updateNote({ ...note, isPined: !note.isPined })}
            active={Boolean(note.isPined)}
          />
        )}
      </Box>
      <Box
        ref={previewRef}
        onClick={() => {
          if (longPressTriggeredRef.current) {
            longPressTriggeredRef.current = false;
            return;
          }
          if (selectionMode) {
            onToggleSelect?.(note.id);
            return;
          }
          navigate(notesRoutes.note(note.id));
        }}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
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
          "& .mdxeditor p, & .mdxeditor li, & .mdxeditor span, & .mdxeditor a, & .mdxeditor code":
            {
              color: `${textColor} !important`,
            },
          "& .mdxeditor-root-contenteditable": {
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            color: `${textColor} !important`,
          },
          '& [contenteditable="true"]': {
            flex: 1,
            minHeight: "100%",
            color: `${textColor} !important`,
            caretColor: `${textColor} !important`,
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
        {!selectionMode && <DeleteNoteButton onClick={() => deleteNote(note)} color={textColor} />}
      </Box>
      <ModalComponent />
    </motion.div>
  );
};

export default Note;
