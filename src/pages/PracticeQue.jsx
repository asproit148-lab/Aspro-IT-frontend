import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import bg from "../assets/homeBg.jpg";
import { getAllQuestions } from "../api/practiceque";

const desktopBreakpoint = 992;

export default function PracticeQue() {
  const [questions, setQuestions] = useState([]);
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
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        setQuestions(data || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // PracticeQue.jsx - CORRECTED handleDownload function

  const handleDownload = async (question) => {
    try {
      // Ensure VITE_API_URL is correctly defined (e.g., in .env file)
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const downloadUrl = `${baseUrl}/api/questions/download-question/${question._id}`;
      
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf'
        }
      });

      // 2. Robust error checking: Check if the response is OK (200-299)
      if (!response.ok) {
        // If the backend sent a JSON error (e.g., 401/403), we try to read it.
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          throw new Error(`Download failed: ${response.status} - ${errorData.message || 'Authentication error'}`);
        }
        throw new Error(`Download failed with status: ${response.status}`);
      }

      // Proceed only if response is successful
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${question.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading question:", error);
      // Provide a helpful alert message
      alert(`Failed to download question. Check console for details. Error: ${error.message}`);
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

  const questionsListContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: isMobile ? "100%" : "80%",
    margin: isMobile ? "0 auto" : "0",
  };

  const questionItemStyle = {
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

  const titleContainerStyle = {
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
        <h1 style={headingStyle}>
          Download Practice Questions
        </h1>

        <div style={questionsListContainerStyle}>
          {loading ? (
            <p style={{ fontSize: "18px", textAlign: isMobile ? "center" : "left" }}>Loading...</p>
          ) : questions.length === 0 ? (
            <p style={{ fontSize: "18px", textAlign: isMobile ? "center" : "left" }}>No Practice Questions available</p>
          ) : (
            questions.map((question) => (
              <div key={question._id} style={questionItemStyle}>
                <div style={titleContainerStyle}>
                  <span style={{ fontSize: "18px", fontWeight: 500 }}>{question.title}</span>
                  {question.description && (
                    <span style={{ fontSize: "14px", color: "#B0B0B0" }}>{question.description}</span>
                  )}
                </div>

                <button
                  onClick={() => handleDownload(question)}
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
