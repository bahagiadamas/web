/* eslint-disable no-unused-vars */
import Section from "../components/Section";
import Footer from "../components/Footer";
import * as ico from "react-icons/io5";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../assets/js/firebase";

export default function EditProject() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Edit Project | ${title}`;
  }, [title]);

  useEffect(() => {
    async function fetchProject() {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setBody(data.body || "");
          setImgUrl(data.imgUrl || "");
        } else {
          alert("Project not found");
          navigate("/admin");
        }
      } catch (error) {
        console.error("Error getting project:", error);
        alert("Failed to load project");
        navigate("/admin");
      }
    }
    fetchProject();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      alert("Please fill in title and body");
      return;
    }

    setIsSubmitting(true);

    try {
      let updatedImgUrl = imgUrl;

      if (imageFile) {
        // Kalau mau pakai Cloudinary atau storage lain untuk upload gambar baru,
        // proses upload harus di sini, dapatkan URL baru, assign ke updatedImgUrl.
        // Contoh sementara: alert user kalau belum implementasi upload gambar baru.
        alert(
          "Uploading new image feature belum diimplementasi. Simpan tanpa update gambar."
        );
      }

      const docRef = doc(db, "projects", id);
      await updateDoc(docRef, {
        title,
        body,
        imgUrl: updatedImgUrl,
        updatedAt: Timestamp.now(),
      });

      alert("Project updated successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Failed to update project:", error);
      alert("Failed to update project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Section id="edit-project">
        <div className="container">
          <h2>Edit Project</h2>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Current Image:</label>
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt="Project"
                    style={{
                      maxWidth: "300px",
                      marginBottom: "1rem",
                      aspectRatio: "16/9",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="project-image">Change Image (optional): </label>
                <input
                  type="file"
                  accept="image/*"
                  id="project-image"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </div>

              <div className="input-group">
                <label htmlFor="project-title">Title: </label>
                <input
                  type="text"
                  id="project-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
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
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
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
