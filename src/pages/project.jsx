import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../assets/js/firebase";
import { doc, getDoc } from "firebase/firestore";
import Section from "../components/Section";
import Footer from "../components/Footer";
import useScaler from "../hooks/useScaler";
import useScrollReveal from "../hooks/useScrollReveal";
import { Helmet } from "react-helmet-async";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { targetRef, childRef } = useScaler();
  useScrollReveal(".popup-fade", project);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Project not found.");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchProject();
    }
  }, [id]);

  const getMetaDesc = (projectData) => {
    if (projectData && projectData.description) {
      return projectData.description;
    } else {
      return "Explore interesting project details from my portfolio.";
    }
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Project...</title>
          <meta
            name="description"
            content="Loading project from Damas Bahagia Ika Cipta. Please wait."
          />
        </Helmet>
        <p>Loading project details...</p>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Helmet>
          <title>Project Not Found</title>
          <meta name="description" content="Project not found." />
        </Helmet>
        <p>Project not found.</p>
      </>
    );
  }

  const metaDescContent = getMetaDesc(project);

  return (
    <>
      <Helmet>
        <title>Project | {project.title}</title>
        <meta name="description" content={metaDescContent} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={metaDescContent} />
        <meta property="og:url" content={window.location.href} />
        {project.imgUrl && (
          <meta property="og:image" content={project.imgUrl} />
        )}
        <meta property="og:type" content="article" />
        <link rel="canoical" href={window.location.href} />
      </Helmet>

      <Section id="project-detail">
        <div className="container">
          <div className="banner-wrapper" ref={targetRef}>
            <img src={project.imgUrl} alt={project.title} loading="lazy" />
            <h1 className="project-title popup-fade" ref={childRef}>
              {project.title}
            </h1>
          </div>
          <div className="body">
            <p dangerouslySetInnerHTML={{ __html: project.body }} />
          </div>
        </div>
      </Section>
      <Footer></Footer>
    </>
  );
}
