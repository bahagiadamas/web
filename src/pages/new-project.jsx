/* eslint-disable no-unused-vars */
import Section from "../components/Section";
import Footer from "../components/Footer";
import * as ico from "react-icons/io5";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../assets/js/firebase";
import { Helmet } from "react-helmet-async";

export default function NewProject() {
  console.log("NewProject Component Mounted/Rendered");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const uploadToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dysrm7xcr/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed with status " + res.status);
      }

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("No secure_url in response");
      }

      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return undefined;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !body || !imageFile) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const imgUrl = await uploadToCloudinary(imageFile);

      const docRef = await addDoc(collection(db, "projects"), {
        title,
        description,
        body,
        imgUrl,
        createdAt: Timestamp.now(),
      });

      alert("Project created successfully");
      navigate(`/projects/${docRef.id}`);
    } catch (error) {
      console.error("Failed to create project: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>D B I CIPTA | Create New Project</title>
        <meta
          name="description"
          content="Form to create a new project in the Damas Bahagia Ika Cipta portfolio."
        />
      </Helmet>

      <Section id="new-project">
        <div className="container">
          <h2>Create New Project</h2>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="project-image">Image: </label>
                <input
                  type="file"
                  accept="image/*"
                  id="project-image"
                  required
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </div>
              <div className="input-group">
                <label htmlFor="project-title">Title: </label>
                <input
                  type="text"
                  autoComplete="off"
                  required
                  id="project-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="project-description">Description: </label>
                <textarea
                  id="project-description"
                  rows="3"
                  required
                  value={description}
                  disabled={isSubmitting}
                  maxLength={160}
                  placeholder="Short summary of the project (max. 160 characters)"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <small>{description.length}/160</small>
              </div>
              <div className="input-group">
                <label htmlFor="project-body">Body: </label>
                <ReactQuill
                  theme="snow"
                  id="project-body"
                  value={body}
                  onChange={setBody}
                />
              </div>
              <div className="form-button">
                <button
                  type="button"
                  className="button"
                  onClick={() => navigate("/admin")}
                  disabled={isSubmitting}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
