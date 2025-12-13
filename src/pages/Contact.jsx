import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import "../Components/styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all required fields");
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-form-wrapper">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>We’d Love to Hear From You</h2>

          {submitted && (
            <p className="success-msg">
              ✅ Thanks for contacting us! Our team will get back to you shortly.
            </p>
          )}

          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="message"
            placeholder="Write your message here *"
            rows="6"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit" className="contact-btn">
            Send Message
          </button>
        </form>
      </div>

      <div className="contact-footer">
        <div className="footer-column brand">
          <h3>YourStore</h3>
          <p>
            YourStore brings you quality products, fast delivery, and a seamless
            shopping experience. We value every customer and work hard to offer
            you the best service.
          </p>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>📍 123 Demo Street, Bengaluru, India</p>
          <p>📧 support@yourstore.com</p>
          <p>📞 +91 98765 43210</p>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaWhatsapp />
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 YourStore — All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default Contact;
