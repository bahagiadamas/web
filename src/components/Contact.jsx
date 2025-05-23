/* eslint-disable no-unused-vars */
import * as ico from "react-icons/io5";
import Section from "./Section";
import Modal from "./Modal";
import Overlay from "./Overlay";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    "entry.1835579550": "", // For Name
    "entry.605824708": "", // For Email Address
    "entry.412088699": "", // For Message
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const actionURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeSokqRoSC_3ohmiSDAoJR60k6gHRli2WwI9EHfF3gyAJ_51A/formResponse";

  // Renamed to handleOnChange to match your JSX
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showPopup = () => {
    setIsModalOpen(true);
  };

  const closePopup = () => {
    setIsModalOpen(false);
    setSubmissionStatus(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmissionStatus(null);

    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }

    console.log("--- Data being sent to Google Forms ---");
    for (let pair of dataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    console.log("---------------------------------------");

    try {
      await fetch(actionURL, {
        method: "POST",
        body: dataToSend,
        mode: "no-cors",
      });

      setFormData({
        "entry.1835579550": "",
        "entry.605824708": "",
        "entry.412088699": "",
      });
      setSubmissionStatus("success");
      showPopup();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
      showPopup();
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Section id="contact">
      <div className="container">
        <div className="section-heading popup">
          <h2>Let's Conect</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis,
            voluptatem optio accusantium recusandae iusto veritatis? Aperiam
            beatae pariatur eum expedita.
          </p>
        </div>
        <form className="popup" onSubmit={handleSubmit} id="myForm">
          <div className="input-group">
            <input
              type="text"
              name="entry.1835579550"
              id="name"
              placeholder=""
              autoComplete="off"
              value={formData["entry.1835579550"]}
              onChange={handleOnChange}
              required
            />
            <label htmlFor="name">Name: </label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="entry.605824708"
              id="email"
              placeholder=""
              autoComplete="off"
              value={formData["entry.605824708"]}
              onChange={handleOnChange}
              required
            />
            <label htmlFor="email">Email Address: </label>
          </div>
          <div className="input-group">
            <textarea
              name="entry.412088699"
              id="msg"
              placeholder=""
              autoComplete="off"
              value={formData["entry.412088699"]}
              onChange={handleOnChange}
              required
            ></textarea>
            <label htmlFor="msg">Message: </label>
          </div>
          <button className="button" type="submit" disabled={isSubmitting}>
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            <ico.IoSendOutline className="icon" />
          </button>
        </form>
      </div>
      <Modal className={`${isModalOpen ? "open" : ""}`}>
        <h4>
          {submissionStatus === "success"
            ? "Thank You For Getting in Touch!"
            : "Something Went Wrong!"}
        </h4>
        <p>
          {submissionStatus === "success"
            ? "Your message has been successfully sent! I appreciate your interest and will get back to you as soon as possible. Please check your email inbox, including your spam/junk folder, in case my reply ends up there. Looking forward to connecting with you! This keeps it professional while ensuring the recipient doesn’t miss your response. Let me know if you’d like any refinements! 🚀"
            : "Something went frong, please try again later."}
        </p>
        <button className="button" onClick={closePopup}>
          Close
        </button>
      </Modal>
      <Overlay />
    </Section>
  );
}
