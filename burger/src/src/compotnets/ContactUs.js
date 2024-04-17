import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import whatsapp from "./iconWhatsapp.png";
import facebook from "./iconFacebook.png";
import instagram from "./iconInstagram.png";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const uninput = [];
    let feedbackFilled = false;
    if (!name) uninput.push("Name");
    if (!email) uninput.push("Email");
    if (!message) uninput.push("Message");

    if (uninput.length > 0 && !name && !email && !message)
      feedbackFilled = false;
    else if (uninput.length === 0 && name && email && message)
      feedbackFilled = true;

    if (feedbackFilled) {
      const emailParams = {
        from_name: name,
        from_email: email,
        message: message,
      };

      // Use the emailjs library to send the email
      emailjs
        .send(
          "service_bb7d32d",
          "template_qwxul8i",
          emailParams,
          "UQn43roZpxPG3iMvp"
        )
        .then((response) => {
          console.log("Email sent successfully!", response);
          window.alert("Thanks for your message!");

          // Add any success message or further actions here
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          // Add error handling or display an error message here
        });

      // Reset the form fields
      setName("");
      setEmail("");
      setMessage("");
      feedbackFilled = false;
    } else if (!feedbackFilled)
      window.alert(`Please fill in your ${uninput.join(", ")} before submit!`);
  };

  return (
    <div className={styles.container} ref={contactRef}>
      <div className={styles["left-container"]}>
        <div id={styles.contactHead}>Contact Us</div>
        <div>Cooke Street | Hong Kong</div>
        <div>+852 3062 4700</div>
        <div>info@ddiburger.com</div>
        <div id={styles.socialMediaContainer}>
          <a href="https://wa.me/85230624700" rel="noreferrer" target="_blank">
            <img className={styles.icon} src={whatsapp} alt="iconWhatsapp" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61558010205465"
            rel="noreferrer"
            target="_blank"
          >
            <img className={styles.icon} src={facebook} alt="iconFacebook" />
          </a>
          <a
            href="https://www.instagram.com/ddiburger/"
            rel="noreferrer"
            target="_blank"
          >
            <img className={styles.icon} src={instagram} alt="iconInstagram" />
          </a>
        </div>
      </div>

      <div className={styles["right-container"]}>
        <div className={styles["right-top-container"]}>
          <input
            className={styles.name}
            type="text"
            id="name"
            placeholder="Your great name please"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.email}
            type="text"
            id="email"
            placeholder="Your email address please"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <textarea
          className={styles.msg}
          id="message"
          placeholder="What happened?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className={styles.submit} onClick={handleFormSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
export const contactRef = React.createRef();
