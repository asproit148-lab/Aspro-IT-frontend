import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { getInternships } from "../api/job"; 

// Define a mobile breakpoint
const mobileBreakpoint = 768;

export default function Internships() {
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isMobile = screenWidth < mobileBreakpoint;

  // 1. Screen size tracking for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    (async () => {
      try {
        const data = await getInternships();
        setInternships(data || []);
      } catch (err) {
        console.error("Failed to fetch internships:", err);
      }
    })();
  }, []);

  return (
    <div 
        style={{ 
            width: "100%", 
            minHeight: "100vh", 
            background: "black",
            // ⬅️ Fix: Prevent horizontal scrollbar
            overflowX: "hidden", 
        }}
    >
      <Header />

      <div
        style={{
          width: isMobile ? "80%" : "100%",
          color: "white",
          fontFamily: "Poppins, sans-serif",
          // ⬅️ RESPONSIVE: Adjust main container padding
          padding: isMobile ? "40px 20px 20px" : "50px 40px 20px 40px",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontWeight: 600,
            // ⬅️ RESPONSIVE: Font size
            fontSize: isMobile ? "28px" : "36px",
            lineHeight: "100%",
            marginBottom: "10px",
          }}
        >
          Internships
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "100%",
            color: "white",
            opacity: 0.9,
            marginBottom: "40px",
          }}
        >
          From learning to earning - Start here
        </p>

        {/* internship Cards Grid */}
        <div
          style={{
            width: "100%", // Changed from 90%
            maxWidth: "1150px", // Set max width for desktop
            display: "grid",
            // ⬅️ CRUCIAL RESPONSIVE CHANGE: 1 column on mobile, 3 on desktop
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            // ⬅️ RESPONSIVE: Gap
            gap: isMobile ? "20px" : "30px",
            // ⬅️ RESPONSIVE: Remove fixed margin to center on mobile
            margin: isMobile ? "20px auto 100px auto" : "50px 0 100px 50px", 
          }}
        >
          {internships.map((job, index) => (
            <div
              key={index}
              style={{
                // ⬅️ RESPONSIVE: Use 100% width on mobile, 90% on desktop (to match original intention)
                width: isMobile ? "100%" : "90%",
                height: "210px",
                borderRadius: "12px",
                border: "1px solid #FFFFFF33",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "radial-gradient(196.17% 302.03% at 6.35% 24.96%, #101010 0%, #595959 100%)",
              }}
            >
              <div>
                {/* Role */}
                <h2
                  style={{
                    fontWeight: 700,
                    // ⬅️ RESPONSIVE: Font size
                    fontSize: isMobile ? "18px" : "20px",
                    marginBottom: "10px",
                  }}
                >
                  {job.roleTitle}
                </h2>

                {/* Company */}
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: "16px",
                    marginBottom: "10px",
                  }}
                >
                  {job.companyName}
                </p>

                {/* Package */}
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: "16px",
                  }}
                >
                  {job.ctcOrStipend}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid #FFFFFF33",
                  marginTop: "15px",
                }}
              ></div>

              {/* Apply Button */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => window.open(job.companyWebsite, "_blank")}
                  style={{
                    width: isMobile ? "100%" : "97px", // ⬅️ RESPONSIVE: Full width button on mobile
                    height: "34px",
                    background: "#2B6EF0",
                    borderRadius: "10px",
                    border: "none",
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}