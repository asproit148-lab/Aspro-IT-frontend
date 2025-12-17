import React, { useState } from "react";
import styled from "@emotion/styled";
import { X } from "lucide-react"; 
// import { changeAdminPassword } from "../../api/auth";

const PopupOverlay = styled.div`
    /* *** FIX 1: Ensure it covers the whole screen and is fixed *** */
    position: fixed;
    inset: 0; 
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.65); /* Increased opacity for better blur effect */
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

    max-height: 90vh;
    overflow-y: auto;
`;

const CloseButton = styled.span`
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 28px;
    color: white;
    cursor: pointer;
    line-height: 1;
    padding: 5px;

    &:hover {
        color: #ff5555;
    }
`;

const Title = styled.h1`
    font-family: Poppins, sans-serif;
    font-size: 34px;
    font-weight: 600;
    color: white;
    text-align: center;
    margin-top: 0px; /* *** FIX 2: Reduced top margin for better spacing in popup *** */
    margin-bottom: 24px;

    @media (max-width: 480px) {
        font-size: 28px;
    }
`;

const Label = styled.label`
    width: 100%;
    font-family: Poppins, sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #C9C9C9;
    margin-bottom: 6px;
    margin-top: 10px;
`;

const Input = styled.input`
    width: 100%;
    height: 46px;
    border-radius: 4px;
    border: 1px solid ${props => props.error ? '#ff5555' : '#2A2A2A'};
    background: #142339;
    color: #C9C9C9;
    padding: 10px 12px;
    font-size: 14px;
    box-sizing: border-box;
    margin-bottom: 14px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
        border-color: #3f7ec8;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 48px;
    background: #25A2E1;
    color: white;
    font-family: Poppins, sans-serif;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 16px;
    transition: background-color 0.2s ease;

    &:hover {
        background: #1E8ACF;
    }

    &:disabled {
        background: #1E8ACF;
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const Message = styled.p`
    font-family: Poppins, sans-serif;
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    text-align: center;
    margin-top: -8px;
    margin-bottom: 12px;
`;

const ErrorMessage = styled(Message)`
    color: #ff5555;
`;

const SuccessMessage = styled(Message)`
    color: #4CAF50;
`;

export default function ChangePasswordPopup({ onClose }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!oldPassword || !newPassword || !confirmPassword) {
            return setError("All password fields are required.");
        }
        if (newPassword.length < 6) {
            return setError("New password must be at least 6 characters.");
        }
        if (newPassword !== confirmPassword) {
            return setError("New password and confirm password do not match.");
        }
        if (newPassword === oldPassword) {
            return setError("New password cannot be the same as the old password.");
        }
        
        try {
            setLoading(true);
            
            // await changeAdminPassword(oldPassword, newPassword, token); 

            // Simulating API success
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            setSuccess("Password successfully changed!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            
            // Close the popup after success message is displayed
            setTimeout(() => onClose(), 2500);

        } catch {
            const message = "Failed to change password. Please check your old password and try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PopupOverlay onClick={onClose}>
            <PopupContainer onClick={(e) => e.stopPropagation()} as="form" onSubmit={handleSubmit}>
                
                <CloseButton onClick={onClose}>
                    <X size={24} color="currentColor" />
                </CloseButton>

                <Title>Change Password</Title>

                <Label htmlFor="oldPassword">Old Password</Label>
                <Input
                    id="oldPassword"
                    type="password"
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    error={error && !oldPassword}
                />

                <Label htmlFor="newPassword">New Password</Label>
                <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password (min 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={error && (newPassword.length > 0 && newPassword.length < 6)}
                />

                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={error && newPassword !== confirmPassword}
                />

                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}

                <Button disabled={loading || success}>
                    {loading ? "Confirming..." : "Confirm"}
                </Button>
            </PopupContainer>
        </PopupOverlay>
    );
}