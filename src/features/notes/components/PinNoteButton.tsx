import { FC } from "react";
import { TiPinOutline, TiPin } from "react-icons/ti";
import { IconButton } from "@mui/material";

const PinNoteButton: FC<{
  onClick: () => void;
  active: boolean;
  color: string;
}> = ({ onClick, active, color }) => {
  return (
    <IconButton onClick={onClick} size="small" sx={{ color }}>
      {active ? (
        <TiPin style={{ fontSize: 20, color }} />
      ) : (
        <TiPinOutline style={{ fontSize: 20, color }} />
      )}
    </IconButton>
  );
};

export default PinNoteButton;
