import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./layout/Navbar";
import BottomNavigator from "./layout/BottomNavigator";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import AppRoutes from "./routes";
import {
  recordMessageHistory,
  unlockEasterEgg,
} from "@/shared/utils/engagementTracker";

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
    type ToastType = "success" | "info" | "warning" | "error";
    type ToastMethod = (...args: unknown[]) => unknown;

    const getMessage = (value: unknown): string => {
      if (typeof value === "string") return value;
      if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
      }
      return "[non-text toast message]";
    };

    const wrap = (methodName: ToastType, original: ToastMethod): ToastMethod => {
      return (...args: unknown[]) => {
        const message = getMessage(args[0]);
        recordMessageHistory({
          message,
          type: methodName,
          source: `toast:${methodName}`,
        });
        return original(...args);
      };
    };

    const originalSuccess = toast.success as ToastMethod;
    const originalInfo = toast.info as ToastMethod;
    const originalWarning = toast.warning as ToastMethod;
    const originalError = toast.error as ToastMethod;

    toast.success = wrap("success", originalSuccess) as typeof toast.success;
    toast.info = wrap("info", originalInfo) as typeof toast.info;
    toast.warning = wrap("warning", originalWarning) as typeof toast.warning;
    toast.error = wrap("error", originalError) as typeof toast.error;

    return () => {
      toast.success = originalSuccess as typeof toast.success;
      toast.info = originalInfo as typeof toast.info;
      toast.warning = originalWarning as typeof toast.warning;
      toast.error = originalError as typeof toast.error;
    };
  }, []);

  useEffect(() => {
    const now = new Date();
    const isBirthday = now.getMonth() === 1 && now.getDate() === 17; // February 17
    if (!isBirthday) return;

    const shownKey = `birthday-toast-${now.getFullYear()}-02-17`;
    if (sessionStorage.getItem(shownKey)) return;

    const message = "Happy Birthday! 🎂";
    toast.success(message);
    unlockEasterEgg("birthday-toast", "app:birthday");
    sessionStorage.setItem(shownKey, "true");
  }, []);

  useEffect(() => {
    const now = new Date();
    const inMidnightWindow = now.getHours() === 0 && now.getMinutes() < 5;
    if (!inMidnightWindow) return;

    const dayKey = now.toISOString().slice(0, 10);
    const shownKey = `night-owl-toast-${dayKey}`;
    if (sessionStorage.getItem(shownKey)) return;

    const message = "Night owl detected. Midnight mode unlocked. 🌙";
    toast.info(message);
    unlockEasterEgg("night-owl", "app:night-owl");
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
            color: "#F5F7FF",
            caretColor: "#F5F7FF",
          },
          ".mdxeditor-root-contenteditable p, .mdxeditor-root-contenteditable li, .mdxeditor-root-contenteditable span":
            {
              color: "#F5F7FF",
            },
          ".mdxeditor-root-contenteditable [contenteditable='true']::placeholder": {
            color: "rgba(245, 247, 255, 0.6)",
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
