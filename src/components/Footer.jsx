import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import facebook from "../assets/facebook.png";
import whatsapp from "../assets/whatsapp.png";
import instagram from "../assets/instagram.png";
import x from "../assets/x.png";
import linkedin from "../assets/linkedin.png";

const desktopBreakpoint = 768; 

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Style Definitions ---

  const footerStyle = {
    width: "100%",
    minHeight: isMobile ? "auto" : "450px", 
    background: "#101010",
    boxShadow: "inset 0px -8px 12px #2A292940, inset 0px 8px 12px #2A292940",
    display: "flex",
    flexDirection: isMobile ? "column" : "row", 
    alignItems: isMobile ? "center" : "flex-start",
    padding: isMobile ? "40px 20px" : "50px 40px", 
    position: "relative",
    color: "#FFFFFF",
    fontFamily: "Poppins, sans-serif",
    gap: isMobile ? "40px" : "50px",
    flexWrap: isMobile ? "nowrap" : "wrap", 
    overflowX: "hidden", // Final check to prevent horizontal scroll
  };

  // LEFT SIDE (Company, Subscribe)
  const leftSideStyle = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "20px" : "48px",
    minWidth: isMobile ? "100%" : "280px", 
    maxWidth: isMobile ? "100%" : "407px", // Allow full width on mobile
    textAlign: isMobile ? "center" : "left",
    alignItems: isMobile ? "center" : "flex-start",
  };

  // Right Side Container (Address, Company, Contacts)
  const rightSideStyle = {
    display: "flex",
    // Use row layout on both, but rely on flexWrap and conditional sizing
    flexDirection: "row", 
    gap: isMobile ? "40px" : "50px",
    flexWrap: "wrap", // ALLOWS COLUMNS TO STACK/WRAP IF THEY DON'T FIT
    justifyContent: isMobile ? "center" : "flex-start",
    // Crucial: Use flex-grow on desktop, full width on mobile
    width: isMobile ? "100%" : "auto", 
    flexGrow: isMobile ? 0 : 1,
  };

  // Individual Column Heading (Address, Company, Contacts)
  const columnHeadingStyle = {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: isMobile ? "28px" : "36px", 
    margin: 0,
    width: "100%",
    textAlign: isMobile ? "center" : "left",
  };

  // Individual Column Content (Address, Company, Contacts)
  const columnContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    // FIX: Min-width should be auto on mobile to prevent overflow
    minWidth: isMobile ? "auto" : "150px", 
    // Important: Allow columns to take roughly 1/3rd of the available space on desktop.
    flex: isMobile ? 'none' : '1 1 auto', 
    textAlign: isMobile ? "center" : "left",
  };
  
  // Link/Paragraph Text
  const linkTextStyle = {
    textDecoration: "none",
    color: "#FFFFFF99",
    fontSize: isMobile ? "16px" : "24px", // Reduced size slightly more for mobile
    fontWeight: 500,
    lineHeight: isMobile ? "24px" : "32px",
    transition: "all 0.3s ease",
    // FIX: Allow wrapping on mobile, but keep original nowrap on desktop for aesthetics
    whiteSpace: isMobile ? "normal" : "nowrap", 
    // Center text on mobile if the parent columnContentStyle is centered
    textAlign: isMobile ? "center" : "left",
  };

  // Social Media Icons Section
  const socialIconsStyle = {
    // FIX: Remove absolute positioning on mobile; integrate into flow
    position: isMobile ? "relative" : "absolute", 
    right: isMobile ? "auto" : "200px",
    bottom: isMobile ? "auto" : "80px",
    marginTop: isMobile ? "20px" : "0", 
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: isMobile ? "center" : "space-between",
    gap: isMobile ? "15px" : "24px",
    width: isMobile ? "100%" : "auto",
    maxWidth: isMobile ? "100%" : "400px", // Use 100% of the container on mobile
    order: isMobile ? 4 : 0, 
  };
  
  // Social Icon Image size
  const iconImageStyle = {
    width: isMobile ? "32px" : "50px", // Slightly smaller icons on mobile
    height: isMobile ? "32px" : "50px",
    objectFit: "contain",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  };

  return (
    <footer style={footerStyle}>
      
      {/* LEFT SIDE (Company, Subscribe) */}
      <div style={leftSideStyle}>
        {/* Company Description */}
        <div style={{ width: "100%", textAlign: isMobile ? "center" : "left" }}>
          <img
            src={logo}
            alt="AsproIT Logo"
            style={{
              width: isMobile ? "180px" : "221px", 
              height: isMobile ? "50px" : "63px",
              mixBlendMode: "lighten",
              marginBottom: isMobile ? "10px" : "0",
              // Center image horizontally in its container on mobile
              display: 'block',
              margin: isMobile ? '0 auto 10px auto' : '0 0 0 0',
            }}
          />
          <p
            style={{
              fontWeight: 400,
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: "160%",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            “AsproIT is an IT training and internship company dedicated to
            empowering students and professionals with practical skills in
            Python, Generative AI, and Data Analytics. With hands-on projects,
            expert mentors, and strong career support, we help learners
            confidently step into the future of technology.”
          </p>
        </div>
        {/* NOTE: If there was a Subscribe input field, it would go here */}
      </div>

      {/* RIGHT SIDE (Address, Company, Contacts) */}
      <div style={rightSideStyle}>
        {/* Address */}
        <div style={columnContentStyle}>
          <h3 style={columnHeadingStyle}>
            Address
          </h3>
          <p style={{ ...linkTextStyle, whiteSpace: "normal" }}>
            1st Floor, Pratiksha,
            <br />
            Bhawan khajpura,
            <br />
            Patna, India-800014
          </p>
        </div>

        {/* Company Links */}
        <div style={columnContentStyle}>
          <h3 style={columnHeadingStyle}>
            Company
          </h3>
          {["Home", "Courses", "About", "Contact"].map((item, i) => (
            <a key={i} href="#" style={linkTextStyle}>
              {item}
            </a>
          ))}
        </div>

        {/* Contacts */}
        <div style={columnContentStyle}>
          <h3 style={columnHeadingStyle}>
            Contacts
          </h3>
          {/* FIX: Ensure contacts wrap correctly on mobile */}
          {["+91-9128444000", "admin@asproit.com"].map((item, i) => (
            <a key={i} href="#" style={{ ...linkTextStyle, whiteSpace: 'normal' }}>
              {item}
            </a>
          ))}
        </div>
      </div>
      
      {/* Social Media Icons Section - Now responsive */}
      <div style={socialIconsStyle}>
        {[facebook, instagram, x, whatsapp, linkedin].map((icon, i) => (
          <img
            key={i}
            src={icon}
            alt="social-icon"
            style={iconImageStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          />
        ))}
      </div>
    </footer>
  );
}