import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.scss";
import App from "./App.tsx";
import { Categories } from "./components/Categories";
import { AppHeader } from "./components/AppHeader";
import { BudgetAllocation } from "./components/BudgetAllocation";
import { NotFound } from "./components/NotFound";
import { Theme } from "@carbon/react";
import { Logs } from "./components/Logs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme theme="g100" style={{ height: "100vh", overflow: "auto" }}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/budget" element={<BudgetAllocation />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
