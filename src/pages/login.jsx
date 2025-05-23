/* eslint-disable no-unused-vars */
import Section from "../components/Section";
import * as ico from "react-icons/io5";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../assets/js/firebase";
import { Helmet } from "react-helmet-async";
import logo from "../assets/img/logo.png";


export default function LoginPage() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged-in with Google as UID: ", user.uid);
      navigate("/admin");
    } catch (error) {
      console.error("Error during Google login:", error);
      alert(
        "Login with Google failed. Please check your connection or try again."
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>D B I CIPTA | Sign in</title>
        <meta
          name="description"
          content="Sign in page for Damas Bahagia Ika Cipta Portofolio"
        />
      </Helmet>
      <Section id="login-page">
        <div className="container">
          <div className="form-container">
            <div className="form-heading">
              <img src={logo} alt="" />
              <h4>Sign in to verify your Identity</h4>
            </div>
            <div className="form-body">
              <form>
                <div className="input-group">
                  <label htmlFor="email">Email: </label>
                  <input type="text" />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password: </label>
                  <input type="password" />
                </div>
                <div className="input-button">
                  <button type="submit" className="button">
                    Sign in
                  </button>
                  <div className="google-login" onClick={handleGoogleLogin}>
                    <ico.IoLogoGoogle className="icon" />
                    <span>Sign in with Google</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
