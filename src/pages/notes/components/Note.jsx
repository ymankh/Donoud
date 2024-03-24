import { MDXEditor } from "@mdxeditor/editor";
import { MdDeleteForever } from "react-icons/md";
import ModalComponent from "../../../components/ModalComponent";
import { useNavigate } from "react-router-dom";

function truncateString(str) {
  if (str.length <= 150) {
    return str;
  } else {
    return str.slice(0, 150) + "...";
  }
}

// eslint-disable-next-line react/prop-types
const Note = ({ note = { text: "some text", id: 1 } }) => {
  const navigate = useNavigate()
  return (
    <div className="note">
      <span onClick={()=>{navigate(`${note.id}`)}} style={{ display: "block", height: "110px" }}>
        <MDXEditor  markdown={truncateString(note.text)} readOnly={true} />
      </span>
      <div className="note-footer">
        <small>2024</small>
        <MdDeleteForever
          onClick={() => console.log("delete")}
          className="delete-icon"
          size="1.3em"
        />
      </div>
      <ModalComponent />
    </div>
  );
};

export default Note;
