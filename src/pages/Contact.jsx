import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import bg from "../assets/homeBg.jpg";
import contactImg from "../assets/contact.png";
import Footer from "../components/Footer";
import { sendContact } from "../api/email";

const desktopBreakpoint = 768; 

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.phone_no || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    // Phone number must be exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone_no)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }
    setLoading(true);

    try {
      const res = await sendContact(formData);

      alert(res.message || "Message sent successfully!");

      setFormData({ name: "", phone_no: "", message: "" }); 
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const mainSectionStyle = {
    backgroundImage: `url(${bg})`,
    width: "100%",
    minHeight: isMobile ? "auto" : "550px", 
    paddingTop: isMobile ? "40px" : "0", 
    paddingBottom: isMobile ? "40px" : "0", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: isMobile ? "70px" : "105px", 
    flexDirection: isMobile ? "column" : "row",
    paddingLeft: isMobile ? "20px" : "40px",
    paddingRight: isMobile ? "20px" : "40px",
    gap: isMobile ? "40px" : "25px", 
    boxSizing: 'border-box', 
  };
  
  const leftSideStyle = {
    flex: isMobile ? 'none' : 1, 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: isMobile ? '100%' : 'auto',
  };
  
  const contactImageStyle = {
    maxWidth: "90%",
    height: "480px",
    padding: "50px",
  };

  const rightSideStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: isMobile ? "center" : "flex-start", 
    gap: "20px",
    width: '100%',
    padding: isMobile ? '0' : '20px 0',
  };
  
  const headingStyle = {
    fontSize: isMobile ? "40px" : "56px", 
    fontWeight: 600,
    marginBottom: "10px",
    marginTop: 0,
    color: "#FFFFFF",
    textAlign: isMobile ? "center" : "left", 
    width: "100%",
  };
  
  const formElementWidth = isMobile ? "100%" : "80%";
  const buttonWidth = isMobile ? "100%" : "50%";

  const formElementStyle = {
    width: formElementWidth,
    height: "50px",
    borderRadius: "10px",
    border: "none",
    background: "#FFFFFF",
    color: "#000",
    fontSize: "18px",
    paddingLeft: "20px",
    outline: "none",
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    ...formElementStyle,
    width: isMobile ? "100%" : "80%", 
    height: "100px",
    padding: "15px 20px",
    resize: "none",
  };
  
  const buttonStyle = {
    width: buttonWidth,
    height: "50px",
    borderRadius: "25px",
    border: "none",
    background: "#00A8FF",
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.3s",
    alignSelf: isMobile ? "center" : "flex-start", 
    boxSizing: 'border-box',
  };


  return (
    <div style={{ 
      backgroundColor: "black", 
      color: "white", 
      fontFamily: "Poppins, sans-serif",
      overflowX: "hidden",
    }}>
      <Header />

      <div style={mainSectionStyle}>
        
        {/* Left Side */}
        {!isMobile && (
          <div style={leftSideStyle}>
            <img
              src={contactImg}
              alt="Contact Illustration"
              style={contactImageStyle}
            />
          </div>
        )}

        {/* Right Side (Form) */}
        <div style={rightSideStyle}>
          <h1 style={headingStyle}>
            Get in Touch
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: isMobile ? "center" : "flex-start",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={formElementStyle}
            />

            <input
              type="tel"
              name="phone_no"
              placeholder="Mobile Number"
              value={formData.phone_no}
              onChange={handleChange}
              required
              style={formElementStyle}
            />

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              style={textareaStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.background = "#0090DD")}
              onMouseLeave={(e) => !loading && (e.currentTarget.style.background = "#00A8FF")}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}