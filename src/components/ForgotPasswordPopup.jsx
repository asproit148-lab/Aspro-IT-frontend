// src/components/ForgotPasswordPopup.jsx
import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { requestPasswordOtp, verifyPasswordOtp } from "../api/email"; 
import { resetPassword } from "../api/auth";

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

const ErrorMessage = styled.p`
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #ff5555;
  margin-top: -8px;
  margin-bottom: 12px;
  width: 100%;
  text-align: center;
`;

const OtpInputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`;

const OtpInput = styled.input`
  width: 50px;
  height: 60px;
  background: #142339;
  color: #C9C9C9;
  border: 1px solid #2A2A2A;
  border-radius: 6px;
  text-align: center;
  font-size: 24px;
  outline: none;

  &:focus {
    border-color: #3f7ec8;
  }
`;

const ResendText = styled.p`
  font-family: Poppins, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #3f7ec8; 
  cursor: pointer;
  margin-top: 12px; 
  margin-bottom: 8px; 
  transition: color 0.2s ease;

  &:hover {
    color: #5aa1e3;
  }
`;

export default function ForgotPasswordPopup({ onClose, onResetSuccess }) {
  const [step, setStep] = useState('email'); // 'email', 'otp', or 'reset'
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Email Input Logic 
  const handleSendOtp = async () => {
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError("Invalid email format");
    }

    try {
      setLoading(true);
      await requestPasswordOtp(email);
      setStep('otp'); // Move to OTP step on success
    } catch (err) {
      const message = err.response?.data?.error || "Failed to send OTP.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };


  // OTP Verification Logic 

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      return setError("Please enter the 6-digit OTP.");
    }

    try {
      setLoading(true);
      await verifyPasswordOtp(email, fullOtp);
      setStep('reset'); 
    } catch (err) {
      const message = err.response?.data?.error || "OTP verification failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    try {
      setResendLoading(true);
      await requestPasswordOtp(email);
      setError("New OTP sent successfully!");
      setOtp(new Array(6).fill("")); // Clear OTP input fields
    } catch (err) {
      const message = err.response?.data?.error || "Failed to resend OTP.";
      setError(message);
    } finally {
      setResendLoading(false);
    }
  };


  // Password Reset Logic 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    setError("");

    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);
      await resetPassword(email, newPassword); 
      onResetSuccess(); // Notify LoginPopup to close and show success message
    } catch (err) {
      const message = err.response?.data?.message || "Password reset failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'email':
        return (
          <>
            <Title>Forgot Password</Title>
            <SubTitle>Enter your email to receive a verification code.</SubTitle>
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="You@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button disabled={loading} onClick={handleSendOtp}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </>
        );

      case 'otp':
        return (
          <>
            <Title>Verify Code</Title>
            <SubTitle>A 6-digit code has been sent to {email}</SubTitle>
            <Label>OTP</Label>
            <OtpInputsContainer>
              {otp.map((data, index) => (
                <OtpInput
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </OtpInputsContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button disabled={loading} onClick={handleVerifyOtp}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
            <ResendText>
              Didn't receive code? 
              <span onClick={resendLoading ? null : handleResendOtp}>
                {resendLoading ? "Sending..." : "Resend OTP"}
              </span>
            </ResendText>
          </>
        );

      case 'reset':
        return (
          <>
            <Title>Set New Password</Title>
            <SubTitle>Enter a new password for **{email}**</SubTitle>
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="New Password (min 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button disabled={loading} onClick={handleResetPassword}>
              {loading ? "Confirming..." : "Confirm New Password"}
            </Button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <PopupOverlay>
      <PopupContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        {renderContent()}
      </PopupContainer>
    </PopupOverlay>
  );
}