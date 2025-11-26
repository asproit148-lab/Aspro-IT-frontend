import React, { useState } from "react";
import Header from "../components/Header";
import bg from "../assets/homeBg.jpg";
import { downloadCertificate } from "../api/certificate";
export default function Certificates() {
  const [name, setName] = useState("");
  const [enrollId, setEnrollId] = useState("");

  const handleDownload = async() => {
    if (!name || !enrollId) {
      alert("Please enter your Name and Enrollment ID.");
      return;
    }

    await downloadCertificate({ name, enrollmentId: enrollId });
  };

  return (
    <div style={{ backgroundColor: "black", color: "white", fontFamily: "Poppins, sans-serif" }}>
      <Header />

      {/* Hero Section */}
      <div
        style={{
          width: "100%",
          minHeight: "550px",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "28px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 600,
            color: "#FFFFFF",
            marginBottom: "40px",
          }}
        >
          Download Certificate
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            width: "100%",
          }}
        >
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "30%",
              height: "60px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              paddingLeft: "20px",
              fontSize: "18px",
              background: "#FFFFFF",
              color: "#000000",
              fontFamily: "Poppins, sans-serif",
            }}
          />

          <input
            type="text"
            placeholder="Enter your Enrollment ID"
            value={enrollId}
            onChange={(e) => setEnrollId(e.target.value)}
            style={{
              width: "30%",
              height: "60px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              paddingLeft: "20px",
              fontSize: "18px",
              background: "#FFFFFF",
              color: "#000000",
              fontFamily: "Poppins, sans-serif",
            }}
          />
        </div>

        <button
          onClick={handleDownload}
          style={{
            width: "25%",
            height: "50px",
            borderRadius: "30px",
            border: "none",
            background: "#00A8FF",
            color: "#FFFFFF",
            fontSize: "20px",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "20px",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#0090DD")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#00A8FF")}
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
}
