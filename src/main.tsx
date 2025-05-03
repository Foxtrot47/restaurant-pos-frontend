import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "@fontsource-variable/inter";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";
import App from "./App.tsx";
import Layout from "./pages/layout.tsx";
import OrdersPage from "./pages/orders.tsx";
import TablesPage from "./pages/tables.tsx";
import Reports from "./pages/reports.tsx";
import DashboardPage from "./pages/dashboard.tsx"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </DndProvider>
  </BrowserRouter>
);
