import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import ModalComponent from "../../../components/ModalComponent";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../../../index.css";
import DeleteNoteButton from "./DeleteNoteButton";
import "../../../index.css";
import { useContext } from "react";
import NoteContext from "../../../contexts/NoteContext";
// function truncateString(str) {
//   if (str.length <= 150) {
//     return str;
//   } else {
//     return str.slice(0, 150) + "...";
//   }
// }

// eslint-disable-next-line react/prop-types
const Note = ({ note = { text: "some text", id: "1", date: new Date() } }) => {
  const navigate = useNavigate();
  const { deleteNote } = useContext(NoteContext);
  return (
    <div className="note">
      <span
        onClick={() => {
          navigate(`${note.id}`);
        }}
        style={{ display: "block", height: "110px" }}
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
        <small>{format(note.date, "yyy MMM d p")}</small>
        <DeleteNoteButton onClick={() => deleteNote(note)} />
      </div>
      <ModalComponent />
    </div>
  );
};

export default Note;
