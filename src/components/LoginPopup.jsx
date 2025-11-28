import React, { useState } from "react";
import styled from "@emotion/styled";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  z-index: 2000;
  padding: 20px;
`;

const PopupContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  padding: 28px 24px;
  background: #0B1C39;
  border: 1px solid #ffffff40;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  /* FIX: Smooth scrolling only if needed */
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 18px;
  font-size: 32px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: Poppins, sans-serif;
  font-size: 34px;
  font-weight: 600;
  color: white;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 28px;
    margin-top: 20px;
  }
`;

const SubTitle = styled.p`
  font-family: Poppins, sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #6D829F;
  text-align: center;
  margin-top: 0;
  margin-bottom: 18px;
`;

const Label = styled.label`
  width: 100%;
  font-family: Poppins, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #C9C9C9;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  height: 46px;
  border-radius: 4px;
  border: 1px solid #2A2A2A;
  background: #142339;
  color: #C9C9C9;
  padding: 10px 12px;
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 14px;
  outline: none;

  &:focus {
    border-color: #3f7ec8;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  background: #052E5A;
  color: white;
  font-family: Poppins, sans-serif;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #2A2A2A;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 16px;
  transition: 0.2s ease;

  &:hover {
    border: 1px solid #fff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SignupText = styled.p`
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #6D829F;
  margin-top: 12px;

  span {
    color: #3f7ec8;
    cursor: pointer;
    font-weight: 600;
  }
`;

export default function LoginPopup({ onClose, onSignup }) {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert("Invalid email format");

    if (password.length < 6) return alert("Password must be at least 6 characters");

    try {
      setLoading(true);
      const res = await signIn({ email, password });

      if (!res.success) {
        alert(res.message || "Login failed");
        return;
      }

      if (res.user?.role === "admin") navigate("/admin/dashboard");
      else navigate("/");

      alert("Login Successful!");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (res) => {
    setLoading(true);
    try {
      const response = await signInWithGoogle(res.credential);
      if (!response.success) alert(response.message || "Google login failed");
      else {
        alert("Login Successful!");
        onClose();
      }
    } catch (e) {
      alert("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopupOverlay>
      <PopupContainer>

        <CloseButton onClick={onClose}>×</CloseButton>

        <Title>Welcome Back</Title>
        <SubTitle>Login to your account to continue</SubTitle>

        <Label>Email Address</Label>
        <Input
          type="email"
          placeholder="You@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button disabled={loading} onClick={handleLogin}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div style={{ marginTop: "12px" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google login failed")}
          />
        </div>

        <SignupText>
          New user? <span onClick={onSignup}>Signup</span>
        </SignupText>
      </PopupContainer>
    </PopupOverlay>
  );
}
