import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import BottomNavigator from "./components/BottomNavigator";
import { TasksContextProvider } from "./contexts/TasksContext";
import "bootstrap/dist/css/bootstrap.css";
import { ModalContextProvider } from "./contexts/ModalContext";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Tasks from "./pages/tasks/Tasks";
import Notes from "./pages/notes/Notes";
import NoteEdit from "./pages/notes/NoteEdit";
import { NoteContextProvider } from "./contexts/NoteContext";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { FilterContextProvider } from "./contexts/FilterContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TasksContextProvider>
        <ModalContextProvider>
          <NoteContextProvider>
            <FilterContextProvider>
              <BrowserRouter>
                <ToastContainer position="top-center" theme="colored" />
                <Navbar />
                <AnimatedRoutes />
                <BottomNavigator />
              </BrowserRouter>
            </FilterContextProvider>
          </NoteContextProvider>
        </ModalContextProvider>
      </TasksContextProvider>
    </ThemeProvider>
  );
}

export default App;
