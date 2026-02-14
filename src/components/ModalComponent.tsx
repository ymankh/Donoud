import EditTaskModal from "./backdrop/EditTaskModal";
import { useModal } from "@/hooks/useModal";

const ModalComponent = () => {
  const { modalOpen } = useModal();
  return modalOpen && <EditTaskModal />;
};

export default ModalComponent;
