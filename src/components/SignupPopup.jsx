// src/components/SignupPopup.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPopup({ onClose }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)", // dark overlay for blur effect
        backdropFilter: "blur(4px)",
        zIndex: 1000,
      }}
      onClick={onClose} // click outside to close
    >
      <div
        style={{
          width: "461px",
          minHeight: "580px",
          border: "2px solid #FFFFFF",
          borderRadius: "12px",
          background: "#0B1C39",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px",
          gap: "16px",
          boxSizing: "border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "28px",
            color: "#FFFFFF",
            width: "304px",
            height: "36px",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "0",
          }}
        >
          welcome to Aspro IT
        </h1>
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            color: "#6D829F",
            width: "286px",
            height: "18px",
            textAlign: "center",
            marginTop: 0,
          }}
        >
          signup to explore the courses
        </p>

        {/* Name Field */}
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            color: "#C9C9C9",
            alignSelf: "flex-start",
            marginLeft: "24px",
            marginBottom: 0,
          }}
        >
          Full Name
        </p>
        <input
          type="text"
          placeholder="Enter your full name"
          style={{
            width: "360px",
            height: "44px",
            borderRadius: "3.3px",
            border: "0.82px solid #2A2A2A",
            background: "#142339",
            paddingLeft: "12px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "#FFFFFF",
            outline: "none",
          }}
        />

        {/* Email Field */}
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            color: "#C9C9C9",
            alignSelf: "flex-start",
            marginLeft: "24px",
            marginBottom: 0,
          }}
        >
          Email Address
        </p>
        <input
          type="email"
          placeholder="You@example.com"
          style={{
            width: "360px",
            height: "44px",
            borderRadius: "3.3px",
            border: "0.82px solid #2A2A2A",
            background: "#142339",
            paddingLeft: "12px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "#FFFFFF",
            outline: "none",
          }}
        />

        {/* Password Field */}
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            color: "#C9C9C9",
            alignSelf: "flex-start",
            marginLeft: "24px",
            marginBottom: 0,
          }}
        >
          Password
        </p>
        <input
          type="password"
          placeholder="Enter your password"
          style={{
            width: "360px",
            height: "44px",
            borderRadius: "3.3px",
            border: "0.82px solid #2A2A2A",
            background: "#142339",
            paddingLeft: "12px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "#FFFFFF",
            outline: "none",
          }}
        />

        {/* Signup Button */}
        <button
          style={{
            width: "363px",
            height: "54px",
            background: "#052E5A",
            border: "2px solid #2A2A2A",
            color: "#FFFFFF",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            cursor: "pointer",
            marginTop: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onMouseEnter={(e) => (e.target.style.border = "2px solid #FFFFFF")}
          onMouseLeave={(e) => (e.target.style.border = "1px solid #2A2A2A")}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
