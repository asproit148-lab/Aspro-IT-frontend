import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import bg from "../assets/homeBg.jpg";
import { getAllResources } from '../api/resource';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

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
      // Use backend proxy to download
      const downloadUrl = `${import.meta.env.VITE_API_URL}/api/resources/download-resource/${resource._id}`;
      
      // Fetch with proper headers
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf'
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Get the blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resource.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading resource:", error);
      alert("Failed to download resource. Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: "black", color: "white", fontFamily: "Poppins, sans-serif" }}>
      <Header />

      <div
        style={{
          width: "100%",
          minHeight: "700px",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "120px",
          marginBottom: "60px",
          gap: "30px",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            position: "relative",
            fontSize: "48px",
            fontWeight: 600,
            color: "#FFFFFF",
            marginTop: "20px",
            marginBottom: 0,
          }}
        >
          Download Notes
        </h1>

        {/* Resources List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "80%" }}>
          {loading ? (
            <p style={{ fontSize: "18px" }}>Loading resources...</p>
          ) : resources.length === 0 ? (
            <p style={{ fontSize: "18px" }}>No resources available</p>
          ) : (
            resources.map((resource) => (
              <div
                key={resource._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "16px 24px",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "18px", fontWeight: 500 }}>{resource.title}</span>
                  {resource.description && (
                    <span style={{ fontSize: "14px", color: "#B0B0B0" }}>{resource.description}</span>
                  )}
                </div>

                <button
                  onClick={() => handleDownload(resource)}
                  style={{
                    width: "180px",
                    height: "45px",
                    borderRadius: "25px",
                    border: "none",
                    background: "#00A8FF",
                    color: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
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