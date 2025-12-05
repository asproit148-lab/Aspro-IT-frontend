import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import bg from "../assets/homeBg.jpg";
import { getAllResources } from '../api/resource';

const desktopBreakpoint = 992; 

export default function PracticeQue() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getAllResources();
        setResources(data || []);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleDownload = async (resource) => {
    try {
      const downloadUrl = `${import.meta.env.VITE_API_URL}/api/resources/download-resource/${resource._id}`;
      
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf'
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resource.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading resource:", error);
      alert("Failed to download resource. Please try again.");
    }
  };

  
  const mainContentStyle = {
    width: isMobile ? "90%" : "100%", 
    minHeight: "600px",
    marginTop: isMobile ? "70px" : "105px", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: isMobile ? "20px 20px 40px 20px" : "20px 120px 60px 120px",
    gap: isMobile ? "20px" : "30px",
    backgroundImage: `url(${bg})`,  
    color: "#FFFFFF",
    fontFamily: "Poppins, sans-serif",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const headingStyle = {
    position: "relative",
    fontSize: isMobile ? "36px" : "48px",
    fontWeight: 600,
    color: "#FFFFFF",
    marginTop: "0",
    marginBottom: 0,
    textAlign: isMobile ? "center" : "left",
  };

  const resourcesListContainerStyle = { 
    display: "flex", 
    flexDirection: "column", 
    gap: "20px", 
    width: isMobile ? "100%" : "80%", 
    margin: isMobile ? "0 auto" : "0", 
  };
  
  const resourceItemStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: isMobile ? "flex-start" : "center",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: isMobile ? "16px" : "16px 24px",
    backdropFilter: "blur(6px)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
    gap: isMobile ? "12px" : "0", 
  };
  
  const resourceTitleContainerStyle = {
    display: "flex", 
    flexDirection: "column", 
    gap: "8px", 
    flex: isMobile ? "none" : 1,
  };
  
  const downloadButtonStyle = {
    width: isMobile ? "100%" : "180px",
    height: "45px",
    borderRadius: "25px",
    border: "none",
    background: "#00A8FF",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  };
  

  return (
    <div style={{ backgroundColor: "black", color: "white", fontFamily: "Poppins, sans-serif" }}>
      <Header />

      <div style={mainContentStyle}>
        
        {/* Heading */}
        <h1 style={headingStyle}>
          Download Practice Questions
        </h1>

        {/* Resources List */}
        <div style={resourcesListContainerStyle}>
          {loading ? (
            <p style={{ fontSize: "18px", textAlign: isMobile ? "center" : "left" }}>Loading...</p>
          ) : resources.length === 0 ? (
            <p style={{ fontSize: "18px", textAlign: isMobile ? "center" : "left" }}>No Practice Questions available</p>
          ) : (
            resources.map((resource) => (
              <div
                key={resource._id}
                style={resourceItemStyle}
              >
                <div style={resourceTitleContainerStyle}>
                  <span style={{ fontSize: "18px", fontWeight: 500 }}>{resource.title}</span>
                  {resource.description && (
                    <span style={{ fontSize: "14px", color: "#B0B0B0" }}>{resource.description}</span>
                  )}
                </div>

                <button
                  onClick={() => handleDownload(resource)}
                  style={downloadButtonStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#0090DD")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#00A8FF")}
                >
                  Download
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}