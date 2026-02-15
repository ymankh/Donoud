import noNotes from "@/assets/noNotes.svg";
import { Box, Typography } from "@mui/material";

const NoNoteImage = () => {
  return (
    <Box sx={{ display: "grid", placeItems: "center", py: 6, textAlign: "center", gap: 2 }}>
      <Typography variant="h6">No notes yet</Typography>
      <Typography variant="body2" color="text.secondary">
        Create one from the floating action button.
      </Typography>
      <Box component="img" src={noNotes} alt="no notes" sx={{ width: 260, maxWidth: "100%", height: "auto" }} />
    </Box>
  );
};

export default NoNoteImage;
