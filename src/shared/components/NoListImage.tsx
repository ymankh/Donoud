import noListImage from "@/images/nolist.png";
import { Box, Typography } from "@mui/material";

const NoListImage = () => {
  return (
    <Box sx={{ textAlign: "center", py: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        It is time to be productive. Every second counts...
      </Typography>
      <Box
        component="img"
        src={noListImage}
        alt="No tasks yet"
        sx={{ width: 220, maxWidth: "100%", mx: "auto", display: "block", opacity: 0.92 }}
      />
    </Box>
  );
};

export default NoListImage;
