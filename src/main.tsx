import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import App from "./App.js";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Provider } from "react-redux";
import { store } from "./store/store.js";

serviceWorkerRegistration.register();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
