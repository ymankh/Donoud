import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { Box } from "@mui/material";

const Backdrop: FC<{ children: ReactNode, onClick: () => void }> = ({ children, onClick }) => {

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        display: "grid",
        placeItems: "center",
        zIndex: 7000,
      }}
    >
      <Box sx={{ width: "100%", display: "grid", placeItems: "center" }}>{children}</Box>
    </motion.div>
  );
};

export default Backdrop;
