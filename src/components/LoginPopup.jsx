// src/components/LoginPopup.jsx
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPopup({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "461px",
          height: "560.757px",
          border: "2px solid #FFFFFF",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px",
          gap: "16px",
          background: "#0B1C39",
          boxSizing: "border-box",
        }}
      >
        {/* Close button */}
        <span
          style={{
            position: "absolute",
            top: "8px",
            right: "18px",
            fontSize: "32px",
            fontWeight: "bold",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          ×
        </span>

        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "40px",
            color: "#FFFFFF",
            width: "304px",
            height: "48px",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "0",
          }}
        >
          Welcome Back
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
          Login to your account to continue
        </p>

        {/* Email Label */}
        <span
          style={{
            width: "100%",
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "#C9C9C9",
            marginTop: "4px",
            marginLeft: "24px",
          }}
        >
          Email Address
        </span>
        <input
          type="email"
          placeholder="You@example.com"
          style={{
            width: "360px",
            height: "44px",
            color: "#434D5B",
            borderRadius: "3.3px",
            border: "0.82px solid #2A2A2A",
            background: "#142339",
            padding: "12px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            outline: "none",
          }}
        />

        {/* Password Label */}
        <span
          style={{
            width: "100%",
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "#C9C9C9",
            marginTop: "2px",
            marginLeft: "24px",
          }}
        >
          Password
        </span>
        <input
          type="password"
          placeholder="Enter your password"
          style={{
            width: "360px",
            height: "44px",
            borderRadius: "3.3px",
            border: "0.82px solid #2A2A2A",
            background: "#142339",
            padding: "12px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            outline: "none",
          }}
        />

        <button
          style={{
            width: "360px",
            height: "44px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            border: "none", 
            cursor: "pointer",
            paddingTop: "8px",
            paddingBottom: "12px",
            background: "#052E5A",
            border: "1px solid #2A2A2A",
            color: "#FFFFFF",
            marginTop: "16px",
            marginBottom: "12px",
          }}
          onMouseEnter={(e) => (e.target.style.border = "2px solid #FFFFFF")}
          onMouseLeave={(e) => (e.target.style.border = "1px solid #2A2A2A")}
        >
          Login
        </button>

        <button
          style={{
            width: "360px",
            height: "44px",
            color: "#434D5B",
            borderRadius: "3.3px",
            border: "1px solid #2A2A2A",
            background: "#142339",
            paddingTop: "4px",
            paddingBottom: "16px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            alignItems: "center",
            fontWeight: 600,
            outline: "none",
          }}
          onMouseEnter={(e) => (e.target.style.border = "2px solid #FFFFFF")}
          onMouseLeave={(e) => (e.target.style.border = "1px solid #2A2A2A")}
        >
          <FcGoogle size={22} />
          {" "}Continue with Google
        </button>

        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "13px",
            fontWeight: "600",
            color: "#6D829F",
            marginTop: "6px",
          }}
        >
          New user?{" "}
          <span
            style={{ color: "#12549C", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
