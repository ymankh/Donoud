import { useContext } from "react";
import ModalContext from "../contexts/ModalContext";
import Modal from "./backdrop/Modal";

const ModalComponent = () => {
  const { modalOpen } = useContext(ModalContext);
  return (
    modalOpen && (
      <Modal text={"Some Text"} />
    )
  );
};

export default ModalComponent;
