import { FC } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IconButton } from "@mui/material";

// eslint-disable-next-line react/prop-types
const DeleteButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      size="small"
      sx={{ ml: "auto" }}
    >
      <MdDeleteForever className="delete" />
    </IconButton>
  );
};

export default DeleteButton;
