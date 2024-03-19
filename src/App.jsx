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
          <BrowserRouter>
            <ToastContainer position="top-center" theme="colored" />
            <Navbar />
            <Routes>
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/notes" element={<Notes />} />
              <Route
                path="*"
                element={
                  <>
                    <h1>Note Found</h1>
                  </>
                }
              />
            </Routes>
            <BottomNavigator />
          </BrowserRouter>
        </ModalContextProvider>
      </TasksContextProvider>
    </ThemeProvider>
  );
}

export default App;
