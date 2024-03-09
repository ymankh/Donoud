import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import TaskLists from "./components/TaskLists";
import { TasksContextProvider } from "./contexts/TasksContext";
import "bootstrap/dist/css/bootstrap.css";
import { ModalContextProvider } from "./contexts/ModalContext";
import ModalComponent from "./components/ModalComponent";

function App() {
  return (
    <TasksContextProvider>
      <ModalContextProvider>
        <ToastContainer position="top-center" theme="colored" />
        <Navbar />
        <TaskLists />
        <ModalComponent />
      </ModalContextProvider>
    </TasksContextProvider>
  );
}

export default App;