import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function LoginPopup({ onClose, setToken, onSignup }) {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn({ email, password });
      if (!res.success) {
        alert(res.message || "Login failed");
        return;
      }

if (res.user?.role === "admin") {
  navigate("/admin/dashboard");
} else {
  navigate("/");
}

      alert("Login Successful!");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Email */}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        {/* Password */}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            height: "48px",
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
            marginBottom: "8px",
          }}
          onMouseEnter={(e) => (e.target.style.border = "2px solid #FFFFFF")}
          onMouseLeave={(e) => (e.target.style.border = "1px solid #2A2A2A")}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Google login */}
        <GoogleLogin
          onSuccess={async (res) => {
            setLoading(true);
            const token = res.credential;
            const response = await signInWithGoogle(token);
            if (!response.success) {
              alert(response.message || "Google login failed");
            } else {
              alert("Login Successful!");
              onClose();
            }
            setLoading(false);
          }}
          onError={() => alert("Google login failed")}
        />

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
          <span style={{ color: "#12549C", cursor: "pointer" }} onClick={onSignup}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
