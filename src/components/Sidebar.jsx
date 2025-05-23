/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import * as ico from "react-icons/io5";
import { getData } from "../assets/js/firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "../assets/js/firebase";
import logo from "../assets/img/logo.png";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getData("projects", "createdAt")
      .then(setProjects)
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    if (!newState) {
      setActiveDropdown(null);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setActiveDropdown(null);
  };

  const toggleSubmenu = (menuKey) => {
    setActiveDropdown((prev) => (prev === menuKey ? null : menuKey));
    if (!sidebarOpen) {
      setSidebarOpen(true);
    }
  };

  return (
    <>
      <nav id="sidebar" className={sidebarOpen ? "open" : ""}>
        <div className="sidebar-wrapper">
          <ul className="logo">
            <li>
              <img loading="lazy" className="icon" src={logo} alt="Logo" />
              <span className="text">D B I CIPTA</span>
              <ico.IoMenuOutline className="icon" onClick={toggleSidebar} />
            </li>
          </ul>
          <ul className="navigations">
            <li>
              <div
                className={`dropdown-btn ${
                  activeDropdown === 0 ? "rotate" : ""
                }`}
                onClick={() => toggleSubmenu(0)}
              >
                <ico.IoHome className="icon" />

                <span className="text">Home</span>
                <ico.IoChevronDown className="icon" />
              </div>
              <ul className={`sub-menu ${activeDropdown === 0 ? "show" : ""}`}>
                <div>
                  <li>
                    <a href="/#about">About</a>
                  </li>
                  <li>
                    <a href="/#project">Projects</a>
                  </li>
                  <li>
                    <a href="/#contact">Connect</a>
                  </li>
                </div>
              </ul>
            </li>
            <li>
              <div
                className={`dropdown-btn ${
                  activeDropdown === 1 ? "rotate" : ""
                }`}
                onClick={() => toggleSubmenu(1)}
              >
                <ico.IoFolderOutline className="icon" />
                <span className="text">Projects</span>
                <ico.IoChevronDown className="icon" />
              </div>
              <ul
                id="navPlaceholder"
                className={`sub-menu ${activeDropdown === 1 ? "show" : ""}`}
              >
                <div>
                  {projects.length === 0 ? (
                    <li>
                      <em>Loading...</em>
                    </li>
                  ) : (
                    projects.map((project) => (
                      <li key={project.id}>
                        <a href={`/projects/${project.id}`}>{project.title}</a>
                      </li>
                    ))
                  )}
                </div>
              </ul>
            </li>
          </ul>
          <ul className="settings">
            <li>
              <div className="admin-nav">
                <a onClick={handleButtonClick}>
                  <ico.IoPersonOutline className="icon" />
                  <span className="text">Admin Panel</span>
                </a>
              </div>
            </li>
            <li>
              <div className="theme-toggler">
                <ico.IoContrastOutline className="icon" />
                <span className="text">Dark Mode</span>
                <ThemeToggleButton />
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div
        id="overlay"
        className="sidebar-overlay"
        onClick={closeSidebar}
      ></div>
    </>
  );
}
