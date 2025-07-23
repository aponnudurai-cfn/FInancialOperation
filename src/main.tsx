import React from "react";
import ReactDOM from "react-dom/client";
/*import App from "./App.tsx";*/
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import Course  from "./Course.tsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/*<App />*/}
    <Course />
  </React.StrictMode>
);
