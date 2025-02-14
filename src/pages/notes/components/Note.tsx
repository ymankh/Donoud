import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import { Note as NoteType } from "../../../contexts/NoteContext";
import ModalComponent from "../../../components/ModalComponent";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import DeleteNoteButton from "./DeleteNoteButton";
import { FC, useContext } from "react";
import NoteContext from "../../../contexts/NoteContext";
import { motion } from "framer-motion";
import PinNoteButton from "./PinNoteButton";
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// eslint-disable-next-line react/prop-types
const Note: FC<{ note: NoteType }> = ({ note }) => {
  const navigate = useNavigate();
  const { deleteNote, updateNote } = useContext(NoteContext)!;
  return (
    <motion.div
      className="note"
      variants={item}
      exit={item.hidden}
      transition={{ duration: 0.2 }}
      layout="position"
    >
      <div className="note-heder">
        <small style={{ fontSize: "0.6em" }}></small>
        <PinNoteButton
          onClick={() =>
            updateNote({ ...note, isPined: !note.isPined } as NoteType)
          }
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
      <div className="note-footer">
        <small style={{ fontSize: "0.6em" }}>
          {format(note.date, "yyy MMM d p")}
        </small>
        <DeleteNoteButton onClick={() => deleteNote(note)} />
      </div>
      <ModalComponent />
    </motion.div>
  );
};

export default Note;
