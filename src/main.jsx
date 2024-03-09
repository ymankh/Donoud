import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import App from "./App.jsx";
import "./index.css";
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../serviceWorker.js")
  .then(()=> console.log("serviceWorker.js is running")).catch(()=>console.error("serviceWorker load failed"))
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
