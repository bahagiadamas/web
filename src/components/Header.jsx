import { useState } from "react";
import Overlay from "./Overlay";
import { IoMenuOutline } from "react-icons/io5";
import logo from "../assets/img/logo.png";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Header() {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };
  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <img loading="lazy" src={logo} alt="Logo Damas Bahagia Ika Cipta" />
          <span className="text">D B I CIPTA</span>
        </div>
        <div className="menubar" onClick={toggleMenu}>
          <IoMenuOutline className="icon" />
        </div>
        <nav id="navbar" className={menu ? "open" : ""}>
          <a href="/#about" onClick={closeMenu}>
            About
          </a>
          <a href="/#projects" onClick={closeMenu}>
            Project
          </a>
          <a href="/#contact" onClick={closeMenu}>
            Connect
          </a>
          <ThemeToggleButton />
        </nav>
        <Overlay className="menu-overlay" onClick={closeMenu} />
      </div>
    </header>
  );
}
