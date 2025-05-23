import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function HomePageLayout() {
  return (
    <div className="app-root home-layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
