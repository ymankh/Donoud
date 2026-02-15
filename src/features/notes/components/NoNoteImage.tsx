import noNotes from "@/assets/noNotes.svg";
import { Box } from "@mui/material";

const NoNoteImage = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box component="img" src={noNotes} alt="no notes" sx={{ maxWidth: "100%", height: "auto" }} />
    </Box>
  );
};

export default NoNoteImage;
