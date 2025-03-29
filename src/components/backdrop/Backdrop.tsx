import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

const Backdrop: FC<{ children: ReactNode, onClick: () => void }> = ({ children, onClick }) => {

  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;