import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import BottomNavigator from "./components/BottomNavigator";
import { TasksContextProvider } from "./contexts/TasksContext";
import { ModalContextProvider } from "./contexts/ModalContext";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { NoteContextProvider } from "./contexts/NoteContext";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { FilterContextProvider } from "./contexts/FilterContext";

import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./assets/custom.scss";
import "./index.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#AE6DAB",
    },
    secondary: {
      main: "#6A3A87",
    },
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
