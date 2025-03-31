import { useContext } from "react";
import ModalContext from "../contexts/ModalContext";
import EditTaskModal from "./backdrop/EditTaskModal";

const ModalComponent = () => {
  const { modalOpen } = useContext(ModalContext)!;
  return modalOpen && <EditTaskModal />;
};

export default ModalComponent;
