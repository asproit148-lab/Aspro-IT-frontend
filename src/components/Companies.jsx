import React, { useState, useEffect } from "react";
import walmart from "../assets/walmart.png";
import infosys from "../assets/infosys.png";
import samsung from "../assets/samsung.png";
import tcs from "../assets/tcs.png";
import wipro from "../assets/wipro.png";
import hcl from "../assets/hcl.png";
import amazon from "../assets/amazon.png";
import atlassian from "../assets/atlassian.png";

const desktopBreakpoint = 768; 
export default function Companies() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allLogos = [walmart, infosys, samsung, tcs, wipro, hcl, amazon, atlassian];

  const sectionStyle = {
    width: "100%",
    height: isMobile ? "auto" : "650px",
    padding: isMobile ? "40px 15px 60px 15px" : "0", 
    background: "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
    boxShadow:
      "-4px -4px 16px 0px #FFFFFF0D inset, 4px 4px 16px 0px #FFFFFF0D inset",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  };

  const headingStyle = {
    width: isMobile ? "95%" : "100%", 
    height: isMobile ? "auto" : "72px",
    marginTop: isMobile ? "0" : "30px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontSize: isMobile ? "32px" : "60px",
    lineHeight: "130%",
    textAlign: "center",
    color: "#FFFFFF",
    zIndex: 1,
  };

  const spanStyle = {
    color: "#FAAD4F",
    fontSize: isMobile ? "36px" : "64px",
    fontWeight: 700,
  };

  const logosContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "30px" : "25px",
    marginTop: isMobile ? "40px" : "80px",
    maxWidth: isMobile ? "350px" : "1200px",
    width: "100%",
    zIndex: 1,
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: isMobile ? "20px" : "100px", 
    flexWrap: isMobile ? "wrap" : "nowrap",
  };

  const logoImageStyle = {
    width: isMobile ? "100px" : "150px",
    height: isMobile ? "100px" : "150px",
    objectFit: "contain",
    filter: "brightness(0.9)",
  };

  return (
    <section style={sectionStyle}>
      {/* Subtle Glow Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(circle at 5% 5%, rgba(180,180,180,0.9) 0px, rgba(180,180,180,0.55) 80px, rgba(180,180,180,0.25) 250px, transparent 320px)",
          filter: "blur(60px)",
        }}
      />

      {/* Heading */}
      <h2 style={headingStyle}>
        We Provide{" "}
        <span style={spanStyle}>
          Guidance{" "}
        </span>
        To Get Placed in Top Companies
      </h2>

      {/* Company Logos */}
      <div style={logosContainerStyle}>
        {/* Row 1: Walmart, Infosys, Samsung */}
        <div style={rowStyle}>
          {allLogos.slice(0, 3).map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt="company logo"
              style={logoImageStyle}
            />
          ))}
        </div>

        {/* Row 2: TCS, Wipro, HCL, Amazon, Atlassian */}
        <div style={rowStyle}>
          {allLogos.slice(3).map((logo, i) => (
            <img
              key={i + 3} 
              src={logo}
              alt="company logo"
              style={logoImageStyle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}