import { createContext, useEffect, useState, ReactNode } from "react";

interface ModalContextType {
  modalOpen: boolean;
  open: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalContextProviderProps {
  children: ReactNode;
}

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "unset";
  }, [modalOpen]);

  return (
    <ModalContext.Provider value={{ modalOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
