import { MdDeleteForever } from "react-icons/md";

function truncateString(str) {
  if (str.length <= 150) {
    return str;
  } else {
    return str.slice(0, 150) + "...";
  }
}

// eslint-disable-next-line react/prop-types
const Note = ({ note = { text: "some text", id: 1 } }) => {
  return (
    <div className="note">
      <span>{truncateString(note.text)}</span>
      <div className="note-footer">
        <small>2024</small>
        <MdDeleteForever
          onClick={() => console.log("delete")}
          className="delete-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
