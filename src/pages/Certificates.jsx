import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import bg from "../assets/homeBg.jpg";
import { downloadCertificate } from "../api/certificate";

const desktopBreakpoint = 992; 

export default function Certificates() {
  const [name, setName] = useState("");
  const [enrollId, setEnrollId] = useState("");
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownload = async() => {
    if (!name || !enrollId) {
      alert("Please enter your Name and Enrollment ID.");
      return;
    }
    await downloadCertificate({ name, enrollmentId: enrollId });
  };


  const heroSectionStyle = {
    width: isMobile ? "95%" : "100%", 
    minHeight: isMobile ? "400px" : "550px", 
    marginTop: isMobile ? "70px" : "105px", 
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: isMobile ? "20px" : "28px",
    padding: isMobile ? "20px" : "0",
  };

  const headingStyle = {
    fontSize: isMobile ? "32px" : "48px",
    fontWeight: 600,
    color: "#FFFFFF",
    marginBottom: isMobile ? "20px" : "40px",
    lineHeight: 1.2,
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column", 
    alignItems: "center",
    gap: isMobile ? "15px" : "30px", 
    width: "100%",
  };

  const inputBaseStyle = {
    width: isMobile ? "85%" : "30%", 
    maxWidth: "450px", 
    height: isMobile ? "50px" : "60px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    paddingLeft: isMobile ? "15px" : "20px",
    fontSize: isMobile ? "16px" : "18px",
    background: "#FFFFFF",
    color: "#000000",
    fontFamily: "Poppins, sans-serif",
    boxSizing: "border-box", 
  };

  const downloadButtonStyle = {
    width: isMobile ? "85%" : "25%", 
    maxWidth: "450px", 
    height: isMobile ? "45px" : "50px",
    borderRadius: "30px",
    border: "none",
    background: "#00A8FF",
    color: "#FFFFFF",
    fontSize: isMobile ? "16px" : "20px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: isMobile ? "10px" : "20px",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };


  return (
    <div 
      style={{ 
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "black",
        color: "#FFFFFF",
        fontFamily: "Poppins, sans-serif", 
      }}
    >
      <Header />

      {/* Hero Section */}
      <div style={heroSectionStyle}>
        <h1 style={headingStyle}>
          Download Certificate
        </h1>

        <div style={inputContainerStyle}>
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputBaseStyle}
          />

          <input
            type="text"
            placeholder="Enter your Enrollment ID"
            value={enrollId}
            onChange={(e) => setEnrollId(e.target.value)}
            style={inputBaseStyle}
          />
        </div>

        <button
          onClick={handleDownload}
          style={downloadButtonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#0090DD")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#00A8FF")}
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
}