import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FirebaseAppContextProvider } from "./firebase/FirebaseConfig.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseAppContextProvider>
      <App />
    </FirebaseAppContextProvider>
  </React.StrictMode>
);
