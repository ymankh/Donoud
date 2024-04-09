import PushPinIcon from "@mui/icons-material/PushPin";

const PinNoteButton = ({ onClick, active }) => {
  return <PushPinIcon sx={{fontSize:20, color:active? "#009C99": "#E8E0E8"}} onClick={onClick}/>;
};

export default PinNoteButton;
