import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./layout/Navbar";
import BottomNavigator from "./layout/BottomNavigator";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import AppRoutes from "./routes";

import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const appTheme = createTheme({
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
  useEffect(() => {
    const now = new Date();
    const isBirthday = now.getMonth() === 1 && now.getDate() === 17; // February 17
    if (!isBirthday) return;

    const shownKey = `birthday-toast-${now.getFullYear()}-02-17`;
    if (sessionStorage.getItem(shownKey)) return;

    toast.success("Happy Birthday! 🎂");
    sessionStorage.setItem(shownKey, "true");
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "#root": { minHeight: "100vh" },
          ".mdxeditor-root-contenteditable": {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          },
          ".mdxeditor-root-contenteditable > div": {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          },
          '.mdxeditor-root-contenteditable [contenteditable="true"]': {
            flex: 1,
            minHeight: "100%",
            outline: "none",
          },
        }}
      />
      <BrowserRouter>
        <ToastContainer position="top-center" theme="colored" />
        <Navbar />
        <AppRoutes />
        <BottomNavigator />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
