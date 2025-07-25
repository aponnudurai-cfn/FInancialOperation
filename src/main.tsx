import React from "react";
import ReactDOM from "react-dom/client";
import { Authenticator } from '@aws-amplify/ui-react';
/*import App from "./App.tsx";*/
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';
import ContentTest from "./ContentTest.tsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/*<App />*/}
    <Authenticator>
      <ContentTest />
    </Authenticator>
  </React.StrictMode>
);
