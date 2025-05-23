// src/components/SideLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function SideLayout() {
  return (
    <div className="app-root side-layout">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
