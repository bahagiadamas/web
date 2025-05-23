/* eslint-disable no-unused-vars */
import Section from "../components/Section";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import * as ico from "react-icons/io5";
import useScaler from "../hooks/useScaler";
import useScrollReveal from "../hooks/useScrollReveal";
import { getData } from "../assets/js/firebase";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";

// IMAGES
import BANNER from "../assets/img/BANNER1.jpeg";
import Damas from "../assets/img/Damas.png";
import ut from "../assets/img/ut.png";
import unsoed from "../assets/img/unsoed.png";
import noov from "../assets/img/noovoleum.jpeg";
import dnd from "../assets/img/dndkirim.webp";
import jala from "../assets/img/jala-blue.jpeg";

export default function HomePage() {
  const bannerStyle = {
    background: `url(${BANNER}) center / cover no-repeat fixed`,
  };
  const { targetRef, childRef } = useScaler();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const textRef = useRef(null);
  useScrollReveal(
    ".popup, .popup-int, .popup-left, .popup-right, .popup-up, .popup-down, .popup-fade"
  );

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null);
      try {
        const data = await getData("projects", "createdAt");
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const displayProjects = projects.slice(0, 12);

  useEffect(() => {
    const texts = [
      "Empowering Communities",
      "Driving Innovation",
      "Bridging Technology",
      "Sustainable Solutions",
      "Optimizing Impact",
      "Transforming Industries",
      "Fostering Growth",
    ];
    const speed = 100;
    const eraseSpeed = 50;
    const delayBeforeErase = 3000;

    let textIndex = 0;
    let charIndex = 0;
    let timeoutId;

    function typeWriter() {
      if (!textRef.current) return;

      if (charIndex < texts[textIndex].length) {
        textRef.current.innerHTML = texts[textIndex].substring(
          0,
          charIndex + 1
        );
        charIndex++;
        timeoutId = setTimeout(typeWriter, speed);
      } else {
        timeoutId = setTimeout(eraseText, delayBeforeErase);
      }
    }

    function eraseText() {
      if (!textRef.current) return;

      if (charIndex > 0) {
        textRef.current.innerHTML = texts[textIndex].substring(
          0,
          charIndex - 1
        );
        charIndex--;
        timeoutId = setTimeout(eraseText, eraseSpeed);
      } else {
        textIndex = (textIndex + 1) % texts.length;
        timeoutId = setTimeout(typeWriter, speed);
      }
    }

    typeWriter();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Helmet>
        <title>D B I CIPTA | HOME</title>
        <meta
          name="description"
          content="Explore a portfolio showcasing innovative projects in technology, sustainability and community empowerment."
        />
      </Helmet>
      <Section id="hero">
        <div className="container" ref={targetRef} style={bannerStyle}>
          <div className="section-heading" ref={childRef}>
            <h1 className="popup">Damas Bahagia</h1>
            <h2 className="popup typewriter-text" ref={textRef}></h2>
            <div className="btn popup">
              <a href="#about">
                <ico.IoChevronDown />
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section id="about">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title popup">About Me</h2>
            <p className="popup">
              Hi, I'm Damas Bahagia Ika Cipta — a professional passionate about
              community development, business, sustainability, and web
              development.
              <br />
              <br />
              My focus lies in empowerment, innovation, and technology-driven
              solutions to create positive impact. With experience across
              diverse industries (aquaculture, logistics, waste management), I
              consistently bring both empathy and execution to every project.
              <br />
              <br /> I'm eager to collaborate on projects and partnerships that
              aim to make a real difference. Let's connect!
            </p>
            <div className="social-icons">
              <a
                href="mailhref:bahagiadamas@gmail.com"
                target="_blank"
                className="popup-int"
                style={{ display: "inline-block" }}
              >
                <ico.IoMailOutline className="icon" />
              </a>
              <a
                href="https://github.com/bahagiadamas"
                className="popup-int"
                style={{ display: "inline-block" }}
                target="_blank"
              >
                <ico.IoLogoGithub className="icon" />
              </a>
              <a
                href="mailto:https://www.linkedin.com/in/damas-bahagia-ika-cipta-958261220/@gmail.com"
                className="popup-int"
                style={{ display: "inline-block" }}
                target="_blank"
              >
                <ico.IoLogoLinkedin className="icon" />
              </a>
            </div>
          </div>
          <div className="about-img popup">
            <img src={Damas} alt="Damas Bahagia Ika Cipta" loading="lazy" />
          </div>
        </div>
      </Section>

      <Section id="skill">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title popup">Core Competencies</h2>
            <p className="popup">
              Combining technology, sustainability, and community-driven
              strategies, I bring practical skills that accelerate growth and
              generate long-term impact. These are the strengths I apply to lead
              change and deliver results.
            </p>
          </div>
          <div className="skill-container">
            <div className="skill-item popup-int">
              <div className="icon-wrapper">
                <ico.IoLaptopOutline className="icon" />
              </div>
              <div className="item-body">
                <h4 className="item-title">Technology & Digital Solutions</h4>
                <p>
                  Proficient in web development, digital platforms, and
                  leveraging technology for efficiency and innovation.
                </p>
              </div>
            </div>
            <div className="skill-item popup-int">
              <div className="icon-wrapper">
                <ico.IoStatsChartOutline className="icon" />
              </div>
              <div className="item-body">
                <h4 className="item-title">Data & Productivity Optimization</h4>
                <p>
                  Skilled in organizing, analyzing, and utilizing data-driven
                  tools for better decision-making and workflow management.
                </p>
              </div>
            </div>
            <div className="skill-item popup-int">
              <div className="icon-wrapper">
                <ico.IoPeopleOutline className="icon" />
              </div>
              <div className="item-body">
                <h4 className="item-title">Community & Sustainability</h4>
                <p>
                  Experienced in empowering communities, fostering partnerships,
                  and implementing sustainable solutions for long-term impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="education">
        <div className="container">
          <h2 className="popup section-title popup">Education</h2>
          <div className="edu-container">
            <div className="timeline-component">
              <div className="timeline-progress popup">
                <div className="timeline-progress-bar"></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup">
                    September 2023 - Present
                  </h3>
                </div>
                <div className="timeline-center popup">
                  <div className="timeline-circle edu ut">
                    <img src={ut} alt="UT" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup">Terbuka University</h3>
                    <p className="tagline popup">
                      Bachelor Degree in General Management
                    </p>
                    <p className="popup">
                      Currently pursuing a Bachelor’s degree focused on
                      strategic and operational functions in business, including
                      marketing, finance, human resources, and organizational
                      management. The program equips me with analytical,
                      leadership, and decision-making skills to effectively
                      develop and execute business strategies across various
                      industries.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup">September 2018 - 2021</h3>
                </div>
                <div className="timeline-center popup">
                  <div className="timeline-circle edu unsoed">
                    <img src={unsoed} alt="UNSOED" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup">Jenderal Soedirman University</h3>
                    <p className="tagline popup">
                      Associate Degree in Aquaculture
                    </p>
                    <p className="popup">
                      Completed an Associate’s Degree with a focus on
                      aquaculture science, combining both theoretical and
                      hands-on learning. Gained practical experience in field
                      operations, problem-solving, and process optimization,
                      while developing strong analytical and communication
                      skills applicable to various technical and community-based
                      roles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="experiences">
        <div className="container">
          <h2 className="popup section-title">Experiences</h2>
          <div className="expe-container">
            <div className="timeline-component">
              <div className="timeline-progress popup">
                <div className="timeline-progress-bar"></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup">
                    September 2024 - Present
                  </h3>
                </div>
                <div className="timeline-center popup">
                  <div className="timeline-circle expe noov">
                    <img src={noov} alt="noov" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup">noovoleum</h3>
                    <p className="tagline popup">
                      Community Engagement Officer - Jakarta - Palembang
                    </p>
                    <p className="popup">
                      Lead community-based initiatives to support waste oil
                      collection by engaging households, food vendors, and small
                      producers. Built and maintained strong local relationships
                      through outreach and education programs. Worked
                      cross-functionally to ensure operational efficiency, while
                      utilizing AI tools to optimize data tracking and reporting
                      across collection activities.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup">
                    February - September 2024
                  </h3>
                </div>
                <div className="timeline-center popup">
                  <div className="timeline-circle expe dnd">
                    <img src={dnd} alt="dnd" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup">DND Kirim Indonesia</h3>
                    <p className="tagline popup">
                      Business Development - Jakarta
                    </p>
                    <p className="popup">
                      Identified and pursued new business opportunities aligned
                      with company goals. Developed market-entry strategies, led
                      client acquisition campaigns, and collaborated with
                      marketing to create impactful promotional content. Managed
                      key partnerships, negotiated terms, and tracked
                      performance to maximize growth and client satisfaction.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup">
                    January - October 2023
                  </h3>
                </div>
                <div className="timeline-center popup">
                  <div className="timeline-circle expe jala">
                    <img src={jala} alt="jala" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup">JALA Tech</h3>
                    <p className="tagline popup">
                      Community Development Executive - Yogyakarta
                    </p>
                    <p className="popup">
                      Managed online and offline customer communities, fostering
                      engagement and collaboration. Developed affiliate and
                      partnership networks to expand user reach. Conducted
                      research and community mapping to align initiatives with
                      local needs. Worked closely with marketing and sales teams
                      to drive product adoption and upselling through
                      community-led strategies.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-left">
                  <h3 className="timeline-date popup">May - December 2022</h3>
                </div>
                <div className="timeline-center popup">
                  <div className="timeline-circle expe jala">
                    <img src={jala} alt="jala" loading="lazy" />
                  </div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-text">
                    <h3 className="popup">JALA Tech</h3>
                    <p className="tagline popup">Field Assistant - Cirebon</p>
                    <p className="popup">
                      Provided on-the-ground support to shrimp farmers,
                      including daily monitoring and training on aquaculture
                      best practices. Facilitated workshops to promote inclusive
                      participation in the industry. Supported the
                      implementation of field programs, improving awareness and
                      adoption of digital tools in rural aquaculture
                      communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title popup">
              Driving Innovation Through Action
            </h2>
            <p className="popup">
              Each project reflects a commitment to meaningful progress. From
              grassroots initiatives to collaborative programs, here are
              selected activities where I’ve contributed to growth, engagement,
              and practical change in the field.
            </p>
            <a
              href="/projects"
              className="button popup"
              style={{ display: "block" }}
            >
              Explore Projects
            </a>
          </div>

          {loading ? (
            <p style={{ textAlign: "center", padding: "50px 0" }}>
              Loading Projects...
            </p>
          ) : error ? (
            <p style={{ textAlign: "center", padding: "50px 0", color: "red" }}>
              {error}
            </p>
          ) : displayProjects.length > 0 ? (
            <Swiper
              className="popup"
              modules={[Autoplay, Pagination]}
              loop={true}
              speed={2000}
              spaceBetween={20}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {displayProjects.map((project) => (
                <SwiperSlide key={project.id}>
                  <Link to={`/projects/${project.id}`} className="project-item">
                    <div className="img-wrapper">
                      <img
                        src={project.imgUrl}
                        alt={project.title}
                        loading="lazy"
                      />
                    </div>
                    <h4 className="project-title">{project.title}</h4>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p style={{ textAlign: "center", padding: "50px 0" }}>
              No projects available.
            </p>
          )}
        </div>
      </Section>

      <Contact />

      <Footer></Footer>
    </>
  );
}
