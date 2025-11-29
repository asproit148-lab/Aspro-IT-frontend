// src/components/CourseHeader.jsx
import React, { useState, useEffect } from "react";

const desktopBreakpoint = 768; 

export default function CourseHeader() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const headerStyle = {
    width: "100%",
    minHeight: isMobile ? "70px" : "90px",
    backgroundColor: "black",
    borderBottom: "1px solid",
    borderImageSource: "linear-gradient(90deg, #8A38F5 12.98%, #F29B9B 76.44%)",
    borderImageSlice: 1,
    display: "flex",
    alignItems: "center",
    padding: isMobile ? "0 20px" : "0 5vw", 
    backdropFilter: "blur(1px)",
    overflowX: 'hidden', 
    boxSizing: 'border-box',
  };

  const baseTextStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    lineHeight: "100%",
    letterSpacing: isMobile ? "1px" : "2px",
    color: "white",
    fontSize: isMobile ? "24px" : "2.2vw", 
    margin: 0, 
  };

  const spanTextStyle = {
    background: "linear-gradient(90deg, #E515D7 44.71%, #99A2E4 100%)",
    fontWeight: 700,
    fontSize: isMobile ? "28px" : "2.6vw", 
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <header style={headerStyle}>
      <h1 style={baseTextStyle}>
        Learn with{" "}
        <span style={spanTextStyle}>
          AsproIT
        </span>
      </h1>
    </header>
  );
}