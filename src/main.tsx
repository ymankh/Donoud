import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.js";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

if (import.meta.env.PROD) {
  serviceWorkerRegistration.register();
} else if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
