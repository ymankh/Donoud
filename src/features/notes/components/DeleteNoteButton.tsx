import { type FC } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IconButton } from "@mui/material";

const DeleteNoteButton: FC<{ onClick: () => void, color?: string }> = ({ onClick, color }) => {
  return (
    <IconButton
      onClick={onClick}
      size="small"
      sx={{ ml: "auto" }}
    >
      <MdDeleteForever className="delete" color={color} />
    </IconButton>
  );
};

export default DeleteNoteButton;
