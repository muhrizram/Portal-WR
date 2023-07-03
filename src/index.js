import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

const oidcConfig = {
  authority: "https://sso.cloudias79.com/realms/Portal-79",
  client_id: "working-report",
  redirect_uri: "http://localhost:3000/",
  client_secret: "OPFP3ue9racnGasvUmvDYkt1w1X3O8HV",
};
root.render(
  <AuthProvider {...oidcConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
