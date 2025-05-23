/* eslint-disable no-unused-vars */
import * as ico from "react-icons/io5";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-logo">
            <div className="logo">Let’s Build a Better Future Together</div>
            <p>
              Building a better future by connecting people, technology, and
              sustainable solutions. Let’s collaborate for meaningful change.
            </p>
          </div>
          <div className="footer-nav">
            <p>Links</p>
            <ul>
              <li>
                <a href="/">
                  <ico.IoHome className="icon" />
                  <span className="text">Home</span>
                </a>
              </li>
              <li>
                <a href="/projects">
                  <ico.IoFolderOutline className="icon" />
                  <span className="text">Project</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <p>Connect with Me</p>
            <ul>
              <li>
                <a href="mailto:bahagiadamas@gmail.com" target="_blank">
                  <ico.IoMailOutline className="icon" />
                  <span className="text">Email</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/bahagiadamas" target="_blank">
                  <ico.IoLogoGithub className="icon" />
                  <span className="text">GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/damas-bahagia-ika-cipta-958261220/"
                  target="_blank"
                >
                  <ico.IoLogoLinkedin className="icon" />
                  <span className="text">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 D B I CIPTA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
