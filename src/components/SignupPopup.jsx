import React, { useState } from "react";
import styled from "@emotion/styled";
import { GoogleLogin } from "@react-oauth/google";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { IoArrowBack } from "react-icons/io5";

// ------------ Reused Styling From LoginPopup ------------

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
  background: #0b1c39;
  border: 1px solid #ffffff40;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
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

const BackButton = styled.span`
  position: absolute;
  top: 16px;
  left: 18px;
  font-size: 26px;
  color: white;
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: Poppins, sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: white;
  text-align: center;
  margin-top: 18px;
  margin-bottom: 0;

  @media (max-width: 480px) {
    font-size: 26px;
    margin-top: 18px;
    margin-bottom: 0;
  }
`;

const SubTitle = styled.p`
  font-family: Poppins, sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #6d829f;
  text-align: center;
  margin-top: 0;
  margin-bottom: 18px;
`;

const Label = styled.label`
  width: 100%;
  font-family: Poppins, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #c9c9c9;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  height: 46px;
  border-radius: 4px;
  border: 1px solid #2a2a2a;
  background: #142339;
  color: #c9c9c9;
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
  background: #052e5a;
  color: white;
  font-family: Poppins, sans-serif;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #2a2a2a;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.2s ease;

  &:hover {
    border: 1px solid #fff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function SignupPopup({ onClose, onBack }) {
  const { signInWithGoogle } = useAuth();

  // ---- Your original signup logic (NO CHANGES) ----
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (fullName.trim().length < 3) {
      alert("Full name must be at least 3 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      await registerUser({ name: fullName, email, password });
      alert("Signup Successful! Please login.");
      onClose();
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "Signup failed");
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
        alert("Google Login Successful!");
        onClose();
      }
    } catch {
      alert("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopupOverlay>
      <PopupContainer>

        {/* Back arrow */}
        <BackButton onClick={onBack}>
          <IoArrowBack />
        </BackButton>

        {/* Close button */}
        <CloseButton onClick={onClose}>×</CloseButton>

        <Title>Create Account</Title>
        <SubTitle>Signup to explore the courses</SubTitle>

        <Label>Full Name</Label>
        <Input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

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

        <Button disabled={loading} onClick={handleSignup}>
          {loading ? "Signing up..." : "Signup"}
        </Button>

        <div style={{ marginTop: "12px" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google login failed")}
          />
        </div>
      </PopupContainer>
    </PopupOverlay>
  );
}
