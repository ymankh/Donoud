import { FolderOpen } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface FolderCardProps {
  id: string;
  name: string;
  onOpen: () => void;
  selectionMode?: boolean;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  onLongPressSelect?: (id: string) => void;
}

const LONG_PRESS_MS = 450;

export default function FolderCard({
  id,
  name,
  onOpen,
  selectionMode = false,
  selected = false,
  onToggleSelect,
  onLongPressSelect,
}: FolderCardProps) {
  const longPressTimerRef = useRef<ReturnType<typeof globalThis.setTimeout> | null>(null);
  const longPressTriggeredRef = useRef(false);

  const clearPressTimer = () => {
    if (longPressTimerRef.current) {
      globalThis.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handlePressStart = () => {
    longPressTriggeredRef.current = false;
    clearPressTimer();
    longPressTimerRef.current = globalThis.setTimeout(() => {
      longPressTriggeredRef.current = true;
      onLongPressSelect?.(id);
    }, LONG_PRESS_MS);
  };

  const handlePressEnd = () => {
    clearPressTimer();
  };

  useEffect(() => clearPressTimer, []);

  return (
    <motion.div
      onClick={() => {
        if (longPressTriggeredRef.current) {
          longPressTriggeredRef.current = false;
          return;
        }
        if (selectionMode) {
          onToggleSelect?.(id);
          return;
        }
        onOpen();
      }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      style={{
        width: 280,
        height: 180,
        borderRadius: 8,
        backgroundColor: "rgba(174, 109, 171, 0.2)",
        border: selected
          ? "2px solid #4FC3F7"
          : "1px solid rgba(174, 109, 171, 0.6)",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        padding: "0.75rem",
        position: "relative",
      }}
    >
      {selectionMode && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor: selected ? "#4FC3F7" : "transparent",
            border: "1px solid #4FC3F7",
          }}
        />
      )}
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
