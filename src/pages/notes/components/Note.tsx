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
import { Note as NoteType, stickyNoteColors, useNotes } from "@/hooks/useNotes";
import ModalComponent from "@/components/ModalComponent";
import { format } from "date-fns";
import DeleteNoteButton from "./DeleteNoteButton";
import PinNoteButton from "./PinNoteButton";
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Note: FC<{ note: NoteType }> = ({ note }) => {
  const navigate = useNavigate();
  const { deleteNote, updateNote } = useNotes();
  const noteColor = stickyNoteColors[note.color?? "gold"];
  const { text: textColor, note: bgColor } = noteColor;
  return (
    <motion.div
      className="note"
      variants={item}
      exit={item.hidden}
      transition={{ duration: 0.2 }}
      layout="position"
      style={{ backgroundColor: bgColor, color: textColor, "--noteTextColor": textColor } as React.CSSProperties}
    >
      <div className="note-header">
        <small style={{ fontSize: "0.6em" }}></small>
        <PinNoteButton color={textColor}
          onClick={() => updateNote({ ...note, isPined: !note.isPined })}
          active={Boolean(note.isPined)}
        />
      </div>
      <span
        onClick={() => {
          navigate(`${note.id}`);
        }}
        style={{ display: "block", fontSize: ".8em", height: "110px" }}
      >
        <MDXEditor
          className="dark-theme"
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
      </span>
      <div className="note-footer" style={{ color: textColor, "--bgColor": bgColor } as React.CSSProperties}
      >
        <small >
          {format(note.date, "yyy MMM d p")}
        </small>
        <DeleteNoteButton onClick={() => deleteNote(note)} color={textColor} />
      </div>
      <ModalComponent />
    </motion.div>
  );
};

export default Note;
