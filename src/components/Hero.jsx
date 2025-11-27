// src/components/Hero.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import bg from "../assets/homeBg.jpg";

export default function Hero() {
  // 768px is commonly used as a tablet/mobile breakpoint
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Set isMobile true if screen width is less than 768px
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize(); 
    
    // Event listener for screen size changes
    window.addEventListener("resize", handleResize);
    
    // Cleanup function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Styles adjusted based on isMobile state ---

  const containerStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    // Responsive height: Full viewport height for mobile, fixed height for web
    height: isMobile ? "100vh" : "580px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Responsive padding
    padding: isMobile ? "0 15px" : "0 20px",
    boxShadow: "0px -4px 8px 2px #00508A inset",
    overflow: "hidden",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  };

  const contentStyle = {
    position: "relative",
    zIndex: 10,
    // Responsive max width
    maxWidth: isMobile ? "95%" : "750px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // Responsive alignment: Center on mobile, left on web
    alignItems: isMobile ? "center" : "flex-start",
    // Responsive gap
    gap: isMobile ? "20px" : "24px",
    // Responsive text alignment
    textAlign: isMobile ? "center" : "left",
  };

  const headingStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    // Responsive font size
    fontSize: isMobile ? "32px" : "42px",
    // Responsive line height
    lineHeight: isMobile ? "1.3" : "1.2",
    color: "#FFFFFF",
    margin: 0,
    whiteSpace: "pre-line",
  };

  const descriptionStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    // Font size slightly smaller on mobile, if desired (currently 16px for both)
    fontSize: isMobile ? "16px" : "16px",
    lineHeight: "1.6",
    color: "#FFFFFF",
    margin: 0,
    maxWidth: "600px",
  };

  const buttonStyle = {
    width: "fit-content",
    // Responsive min width
    minWidth: isMobile ? "180px" : "200px",
    // Responsive padding
    padding: isMobile ? "16px 28px" : "14px 24px",
    // Auto margin on mobile to center button (if contentStyle aligns center)
    margin: isMobile ? "0 auto" : "0", 
    borderRadius: "36px",
    border: "3px solid #FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "1.2",
    color: "#FFFFFF",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "transparent",
  };

  // Hover effects are kept for desktop/pointer interaction
  const handleMouseEnter = (e) => {
    e.target.style.border = "3px solid #00A8FF";
    e.target.style.boxShadow = "0 0 15px rgba(0, 168, 255, 0.5)";
    e.target.style.transform = "translateY(-2px)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.border = "3px solid #FFFFFF";
    e.target.style.boxShadow = "none";
    e.target.style.transform = "translateY(0)";
  };

  return (
    <section style={containerStyle}>
      {/* Overlay */}
      <div style={overlayStyle} />

      {/* Content */}
      <div style={contentStyle}>
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          style={headingStyle}
        >
          Future-Ready Skills, On Your Schedule.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          style={descriptionStyle}
        >
          Join thousands of students and trusted companies worldwide who choose Aspro IT 
          to learn, grow, and succeed.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          href="#live-learning"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("live-learning")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          style={buttonStyle}
          // Only apply hover/mouse effects if not on mobile
          onMouseEnter={!isMobile ? handleMouseEnter : undefined}
          onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        >
          Start Learning Today
        </motion.a>
      </div>
    </section>
  );
}