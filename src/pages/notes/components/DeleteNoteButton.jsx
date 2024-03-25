import { MdDeleteForever } from "react-icons/md";


const DeleteNoteButton = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="btn btn-danger rounded-circle btn-sm delete delete-note"
        style={{ marginLeft: "auto" }}
      >
        <MdDeleteForever className="delete" />
      </button>
    );
  };
  
  export default DeleteNoteButton;