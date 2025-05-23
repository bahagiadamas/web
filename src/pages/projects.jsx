import Section from "../components/Section";
import Footer from "../components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import { useEffect, useState } from "react";
import { getData } from "../assets/js/firebase";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SearchBar from "../components/SearchBar";

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  useScrollReveal(".popup, .popup-int", allProjects.length);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const data = await getData("projects", "createdAt");
        setAllProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

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

  return (
    <>
      <Helmet>
        <title>D B I CIPTA | Projects</title>
        <meta
          name="description"
          content="Explore projects and activities from Damas Bahagia Ika Cipta"
        />
      </Helmet>
      <Section id="projects-page">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">My Projects & Initiatives</h2>
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="projects-container">
            {loading ? (
              <p>Loading Projects...</p>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Link
                  to={`/projects/${project.id}`}
                  key={project.id}
                  className="project-item popup-int"
                >
                  <div className="img-wrapper">
                    <img
                      src={project.imgUrl}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>
                  <h4 className="project-title">{project.title}</h4>
                </Link>
              ))
            ) : (
              <p>No projects found for "{currentSearchTerm}".</p>
            )}
          </div>
        </div>
      </Section>
      <Footer></Footer>
    </>
  );
}
