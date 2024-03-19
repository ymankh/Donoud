import ModalComponent from "../../components/ModalComponent";
import TaskLists from "../../components/TaskLists";

const Tasks = () => {
  return (
    <>
      <TaskLists />
      <div className="mb-4"></div>
      <ModalComponent />
    </>
  );
};

export default Tasks;
