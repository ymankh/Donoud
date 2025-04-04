import { type FC } from "react";
import { MdDeleteForever } from "react-icons/md";

const DeleteNoteButton: FC<{ onClick: () => void, color?: string }> = ({ onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className="btn rounded-circle btn-sm delete delete-note"
      style={{ marginLeft: "auto" }}
    >
      <MdDeleteForever className="delete" color={color}/>
    </button>
  );
};

export default DeleteNoteButton;
