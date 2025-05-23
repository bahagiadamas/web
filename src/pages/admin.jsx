import Section from "../components/Section";
import Footer from "../components/Footer";
// eslint-disable-next-line no-unused-vars
import * as ico from "react-icons/io5";
import { getData } from "../assets/js/firebase";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { db } from "../assets/js/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import SearchBar from "../components/SearchBar";

export default function AdminPage() {
  const { currentUser, handleLogout } = useAuth();
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const onLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getData("projects", "createdAt");
      setAllProjects(data);
      if (currentSearchTerm.trim() !== "") {
        const lowercasedSearchTerm = currentSearchTerm.toLowerCase();
        const results = data.filter(
          (project) =>
            project.title.toLowerCase().includes(lowercasedSearchTerm) ||
            (project.description &&
              project.description.toLowerCase().includes(lowercasedSearchTerm))
        );
        setFilteredProjects(results);
      } else {
        setFilteredProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, [currentSearchTerm]);

  useEffect(() => {
    loadProjects();
    if (location.state && location.state.refresh) {
      loadProjects();
      navigate(location.pathname, { replace: true, state: {} });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProjects, location.state, navigate]);

  const handleSearch = (searchTerm) => {
    setCurrentSearchTerm(searchTerm);
    if (searchTerm.trim() === "") {
      setFilteredProjects(allProjects);
      return;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = allProjects.filter((project) => {
      const titleMatch = project.title
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const bodyMatch = project.body
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      return titleMatch || bodyMatch;
    });

    setFilteredProjects(results);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "projects", id));
      alert("Project deleted successfully");
      loadProjects();
    } catch (error) {
      console.error("Failed to delete project: ", error);
    }
  };

  return (
    <>
      <Section id="admin-page">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">Admin Page</h2>
            <button onClick={onLogoutClick} className="button">
              <ico.IoLogOut className="icon" />
              Logout
            </button>
          </div>

          <div className="section-body">
            {currentUser ? (
              <p>Halo, Admin {currentUser.displayName || currentUser.email}!</p>
            ) : (
              <p>Memuat informasi pengguna...</p> //
            )}
            <div className="table-heading">
              <h3>Project List</h3>
              <SearchBar onSearch={handleSearch} />
              <button
                onClick={() =>
                  navigate("/admin/new-project", { state: { refresh: true } })
                }
                className="button"
              >
                <ico.IoAdd className="icon" />
                <span>Project</span>
              </button>
            </div>
            <div className="table-wrapper">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        Loading Data...
                      </td>
                    </tr>
                  ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <tr key={project.id}>
                        <td>
                          <Link
                            className="project-title"
                            to={`/projects/${project.id}`}
                          >
                            {project.title}
                          </Link>
                        </td>
                        <td className="action-button">
                          <button
                            className="edit-btn"
                            onClick={() =>
                              navigate(`/admin/edit-project/${project.id}`, {
                                state: { refresh: true },
                              })
                            }
                          >
                            <ico.IoPencil className="icon" />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(project.id)}
                          >
                            <ico.IoTrash className="icon" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        No projects found for "{currentSearchTerm}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>
      <Footer></Footer>
    </>
  );
}
