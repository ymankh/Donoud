import { FC } from "react";
import { MdDeleteForever } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const DeleteButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn rounded-circle btn-sm delete"
      style={{ marginLeft: "auto" }}
    >
      <MdDeleteForever className="delete" />
    </button>
  );
};

export default DeleteButton;
