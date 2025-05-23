import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// LAYOUT
import HomePageLayout from "./components/HomeLayout";
import SideLayout from "./components/SideLayout";

// PAGES
import HomePage from "./pages/home";
import Projects from "./pages/projects";
import ProjectDetail from "./pages/project";
import AdminPage from "./pages/admin";
import NewProject from "./pages/new-project";
import LoginPage from "./pages/login";
import EditProject from "./pages/edit-project";

// UTILS
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route element={<HomePageLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route element={<SideLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute requireAdmin={true}>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/new-project"
              element={
                <PrivateRoute requireAdmin={true}>
                  <NewProject />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/edit-project/:id"
              element={
                <PrivateRoute requireAdmin={true}>
                  <EditProject />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
