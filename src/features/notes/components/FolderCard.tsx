import { FolderOpen } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface FolderCardProps {
  name: string;
  onOpen: () => void;
}

export default function FolderCard({ name, onOpen }: FolderCardProps) {
  return (
    <motion.div
      onClick={onOpen}
      style={{
        width: 280,
        height: 180,
        borderRadius: 8,
        backgroundColor: "rgba(174, 109, 171, 0.2)",
        border: "1px solid rgba(174, 109, 171, 0.6)",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        padding: "0.75rem",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FolderOpen color="primary" />
        <Typography
          variant="subtitle2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: 600,
          }}
        >
          {name}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }} />
      <Typography variant="caption" sx={{ opacity: 0.8 }}>
        Open folder
      </Typography>
    </motion.div>
  );
}
