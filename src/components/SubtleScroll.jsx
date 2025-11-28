import React, { useState, useEffect } from "react";
import gemini from '../assets/gemini.png';
import { motion } from "framer-motion";

const desktopBreakpoint = 768;

export default function SubtleScroll() {
  const [isAwake, setIsAwake] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Base motion container style
  const motionContainerStyle = {
    width: isMobile ? "90%" : "100%", 
    height: isMobile ? "auto" : "536px", 
    padding: isMobile ? "40px 20px" : "0", // Add vertical padding on mobile
    background: "#101010",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.4s ease",
  };

  // Content wrapper style (the inner motion.div)
  const contentWrapperStyle = {
    display: "flex",
    // ➡️ FIX 2: Stack content vertically on mobile
    flexDirection: isMobile ? "column" : "row", 
    alignItems: "center",
    // On mobile, center the items; on web, adjust based on isAwake
    justifyContent: isMobile ? "center" : (isAwake ? "flex-start" : "center"),
    width: "100%",
    // ➡️ FIX 3: Remove large left padding on mobile
    paddingLeft: isMobile ? "0px" : (isAwake ? "86px" : "0px"),
    gap: isMobile ? "20px" : "40px", // Reduce gap on mobile
    position: "relative",
    zIndex: 2,
    transition: "all 0.4s ease",
  };

  // Left Image style
  const imageStyle = {
    // ➡️ FIX 4: Reduce image size significantly on mobile and ensure it fits
    width: isMobile ? "90%" : "514px",
    maxWidth: isMobile ? "400px" : "514px", 
    height: isMobile ? "auto" : "488px",
    borderRadius: "36px",
    objectFit: "cover",
    flexShrink: 0,
    // Add margin for separation if stacked
    marginBottom: isMobile ? "20px" : "0", 
  };

  // Right Text container style
  const textContainerStyle = {
    // ➡️ FIX 5: Use 100% width on mobile, and apply max-width for consistency
    width: isMobile ? "100%" : "640px",
    maxWidth: isMobile ? "100%" : "640px",
    color: "#FFFFFF",
    fontFamily: "Poppins, sans-serif",
    display: "flex",
    flexDirection: "column",
    textAlign: isMobile ? "center" : "left", // Center text on mobile
    padding: isMobile ? "0 10px" : "0", // Add slight inner padding on mobile
  };

  // Heading style
  const headingStyle = {
    fontWeight: 600,
    // ➡️ FIX 6: Shrink heading font size on mobile
    fontSize: isMobile ? "28px" : "36px", 
    lineHeight: "130%",
    marginBottom: "16px",
    // Remove <br /> tags on mobile using a smaller element or conditional text
  };

  // Paragraph style
  const paragraphStyle = {
    fontWeight: 400,
    // ➡️ FIX 7: Shrink paragraph font size on mobile
    fontSize: isMobile ? "16px" : "20px", 
    lineHeight: "150%",
    color: "#E0E0E0",
  };
  
  // Conditionally render text to remove line breaks for mobile
  const headingText = "Summer Training and Internship Opportunity for College Students";
  const paragraphText = `✨ Kickstart Your Career This Summer! Are you a college student eager to turn your summer break into a career-defining opportunity? Join our Summer Training & Internship Program, carefully crafted for ambitious learners who want more than just classroom knowledge. Over the course of the program, you’ll gain real-world skills, practical hands-on experience, and valuable industry exposure, while collaborating with professionals and peers on projects that truly make an impact. By the end, you won’t just complete a program — you’ll walk away with the confidence, portfolio, and expertise to stand out in your future career journey.`;
  

  return (
    <motion.div
      onMouseEnter={() => {
        if (!isAwake) {
          setTimeout(() => setIsAwake(true), 200);
        }
      }}
      animate={{
        boxShadow: isAwake
          ? "inset 0px 4px 8px #4EA34740, inset 0px -4px 8px #4EA34740"
          : "inset 0px 4px 8px #7956A380, inset 0px -4px 8px #7956A380",
      }}
      transition={{
        type: "spring",
        mass: 1,
        stiffness: 80,
        damping: 20,
        duration: 1.2,
      }}
      style={motionContainerStyle}
    >
      {isAwake && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            mass: 1,
            stiffness: 150,
            damping: 30,
          }}
          style={contentWrapperStyle}
        >
          {/* Subtle Glow Layer (Keep as is) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 1,
              background:
                "radial-gradient(circle at 95% 5%, #4BDA43 50px, #A078D7 80px, #F29B9B 50px, transparent 20px), " +
                "radial-gradient(circle at 5% 95%, #4BDA43 50px, #A078D7 80px, #F29B9B 50px, transparent 320px)",
              filter: "blur(100px)",
            }}
          />
          
          {/* Left Image */}
          <img
            src={gemini}
            alt="gemini"
            style={imageStyle}
          />

          {/* Right Text */}
          <div style={textContainerStyle}>
            <h2 style={headingStyle}>
              {headingText}
            </h2>
            <p style={paragraphStyle}>
              {/* Note: I removed the manual <br /> tags from the original code and let the browser wrap the text naturally */}
              {paragraphText}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}