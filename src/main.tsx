import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "@fontsource-variable/inter";
import "./index.css";
import App from "./App.tsx";
import Layout from "./pages/layout.tsx";
import OrdersPage from "./pages/orders.tsx";
import TablesPage from "./pages/tables.tsx";
import Reports from "./pages/reports.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
