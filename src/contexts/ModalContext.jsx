import { createContext, useEffect, useState } from "react";

const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  useEffect(()=>{
    document.body.style.overflow = modalOpen? 'hidden': 'unset';
  }, [modalOpen])

  return (
    <ModalContext.Provider
      value={{
        modalOpen,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
