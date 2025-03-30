import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@carbon/react";
import "./index.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Button>Hello</Button>
  </StrictMode>
);
