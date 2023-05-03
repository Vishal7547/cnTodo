import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./component/App";
import { ToastProvider } from "react-toast-notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ToastProvider autoDismiss autoDismissTimeout={1500} placement="top-left">
    <App />
  </ToastProvider>
);
