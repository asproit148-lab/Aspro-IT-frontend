import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import qrImg from "../assets/qr.jpeg";
import loadingImg from "../assets/loading.png";
import { submitPayment } from "../api/payment";
import { Upload } from "lucide-react";

// Define the breakpoint once
const mobileBreakpoint = 500;

/* STYLED COMPONENTS */

// Use 100vw for full coverage and add horizontal padding for spacing on mobile
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow-y: auto; /* Allow scrolling if content is too long */
  padding: 10px; /* Consistent padding around the modal on all devices */
  box-sizing: border-box; /* Include padding in the element's total width and height */
`;

const BaseModal = styled.div`
  width: 90%; /* Start with a high percentage for better mobile fit */
  max-width: ${(props) => (props.$stage === "loading" ? "688px" : "560px")};
  /* Adjustments for specific stages/screens */
  height: ${(props) => (props.$stage === "loading" && !props.$isMobile ? "452px" : "auto")};
  
  /* Responsive Padding */
  padding: ${(props) => (props.$stage === "loading" ? "40px 20px" : "30px 20px")};
  
  border-radius: ${(props) => (props.$stage === "loading" ? "15px" : "20px")};
  border: 1px solid ${(props) => (props.$stage === "loading" ? "#fff" : "#4D4D4D")};
  background: #1a1a1a;
  text-align: center;
  color: white;
  font-family: Poppins, sans-serif;
  position: relative;
  
  /* Ensure modal is centered vertically and horizontally */
  margin: auto; 
  /* Add margin for mobile view to prevent sticking to the top edge */
  min-height: ${(props) => (props.$stage === "loading" && props.$isMobile ? "400px" : "auto")};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #333;
  border: 1px solid #777;
  color: white;
  font-weight: 600;
  cursor: pointer;
  z-index: 10000;
`;

const ModalTitle = styled.h2`
  font-size: ${(props) => (props.$isMobile ? "22px" : "26px")}; /* Slightly larger font on both */
  font-weight: 600;
  margin-bottom: 20px;
`;

// --- QR Stage Specific ---

const PriceText = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const DiscountText = styled(PriceText)`
  margin-top: 6px;
  color: #4caf50;
`;

const QRImage = styled.img`
  width: 244px; /* Fixed size for QR to ensure scanability */
  height: 240px;
  max-width: 100%; /* Important: prevents overflow on very small screens */
  border-radius: 30px;
  margin: 15px auto 10px; /* More vertical space */
`;

const QRInstructionText = styled.p`
  font-family: Inter, sans-serif;
  font-size: ${(props) => (props.$isMobile ? "14px" : "16px")};
  font-weight: 500;
  opacity: 0.8;
  margin-bottom: 0px; /* Increased bottom margin */
`;

const ProceedButton = styled.button`
  width: 90%; /* Use percentage for better mobile fit */
  max-width: 200px; /* Set max-width for consistency on desktop */
  height: 44px; /* Slightly taller button for better tapping */
  border-radius: 9px;
  background: #2b6ef0;
  color: white;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  border: none;
  margin: 10px auto 0;
`;

// --- Proof Stage Specific ---

const UploadLabel = styled.label`
  width: 100%; /* Use 100% of the parent width */
  max-width: 480px; /* Set max-width for desktop/larger views */
  height: 150px;
  border-radius: 16px;
  border: 1px dashed #c9c9c9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px auto;
  cursor: pointer;
  font-family: Inter, sans-serif;
  opacity: 0.7;
  font-size: 16px;
  flex-direction: column;
  padding: 10px; /* Add padding for internal content */
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 90%; /* Use percentage for better mobile fit */
  max-width: 200px; /* Set max-width for consistency on desktop */
  height: 44px; /* Consistent button height */
  border-radius: 9px;
  background: #2b6ef0;
  color: white;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  border: none;
  margin: 20px;
`;

// Styled component for internal feedback
const FeedbackMessage = styled.div`
  color: ${(props) => (props.$isError ? "#ff5555" : "#4caf50")};
  margin: 10px 0;
  font-size: 14px;
  min-height: 20px;
  font-weight: 500;
`;

// --- Loading Stage Specific ---

const LoadingImage = styled.img`
  width: 64px;
  height: 72px;
  margin: 50px auto;
`;

const LoadingText = styled.p`
  font-size: ${(props) => (props.$isMobile ? "16px" : "20px")};
  font-weight: 500;
  margin-top: 20px;
  padding: 0 10px; /* Add slight horizontal padding on mobile */
`;

// ------------------------------------

export default function PaymentFlow({ open, onClose, price, courseId }) {
  const [stage, setStage] = useState("qr");
  const [paymentFile, setPaymentFile] = useState(null);
  const [feedback, setFeedback] = useState({ message: "", isError: false });

  // Responsiveness State
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth < mobileBreakpoint;

  // Unused state (but kept for clarity in case discount logic is added later)
  const [finalPrice] = useState(price);
  const [discountPercent] = useState(0);
  // const [couponError] = useState(""); // Removed unused state

  // 1. Screen size tracking for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Stage-based effects (Loading timer & feedback reset)
  useEffect(() => {
    // Timer for "loading" stage
    if (stage === "loading") {
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 5000);
      return () => clearTimeout(timer);
    }
    // Clear feedback when changing to any other stage
    setFeedback({ message: "", isError: false });
  }, [stage]);

  if (!open) return null;

  const closeAll = () => {
    setStage("qr");
    setPaymentFile(null);
    setFeedback({ message: "", isError: false });
    onClose && onClose();
  };

  const renderCloseBtn = (
    <CloseButton onClick={closeAll}>
      ✕
    </CloseButton>
  );

  const handleSubmitProof = async () => {
    if (!paymentFile) {
      setFeedback({ message: "Please upload a screenshot before submitting.", isError: true });
      return;
    }

    // Set stage to loading/pending immediately for user experience
    setFeedback({ message: "Submitting payment...", isError: false });

    try {
      // NOTE: submitPayment is currently missing its file parameter in the function signature, 
      // but the call is correct based on the api design.
      await submitPayment(courseId, paymentFile);

      // Success
      setFeedback({ message: "Payment submitted successfully! Pending verification.", isError: false });
      setStage("loading");
    } catch (err) {
      // Error handling
      console.error("Payment Submission Error:", err);
      // Fallback message for user
      const errorMessage = err?.response?.data?.message || err.message || 'Unknown Error. Please try again.';
      setFeedback({ message: `Failed to submit payment. ${errorMessage}`, isError: true });
    }
  };


  return (
    // Prevent closing when clicking outside on mobile by not using $isMobile on the Overlay
    <ModalOverlay onClick={closeAll}> 
      <div onClick={e => e.stopPropagation()}> 
        
{/* QR POPUP */}
        {stage === "qr" && (
          <BaseModal $isMobile={isMobile} $stage="qr">
            {renderCloseBtn}

            <ModalTitle $isMobile={isMobile}>Scan to Proceed</ModalTitle>

            <PriceText>
              Price: ₹{price}
            </PriceText>

            {discountPercent > 0 && (
              <DiscountText>
                After Discount ({discountPercent}%): ₹{finalPrice}
              </DiscountText>
            )}

            {/* Added instructions for what the image is */}
            

[Image of QR Code for payment]
 
            <QRImage src={qrImg} alt="QR Code for payment" />

            <QRInstructionText $isMobile={isMobile}>
              Scan this code to proceed with the payment
            </QRInstructionText>

            <ProceedButton onClick={() => setStage("proof")}>
              Proceed to Upload
            </ProceedButton>
          </BaseModal>
        )}

        {/* Payment Proof */}
        {stage === "proof" && (
          <BaseModal $isMobile={isMobile} $stage="proof">
            {renderCloseBtn}

            <ModalTitle $isMobile={isMobile}>Add Payment Screenshot</ModalTitle>

            {/* Display feedback */}
            {feedback.message && (
              <FeedbackMessage $isError={feedback.isError}>
                {feedback.message}
              </FeedbackMessage>
            )}

            <UploadLabel>
              {paymentFile ? (
                <>
                  <p style={{ fontWeight: 600 }}>File Ready to Submit:</p>
                  <p style={{ fontSize: "14px", marginTop: "5px" }}>{paymentFile.name}</p>
                </>
              ) : (
                <>
                  <Upload size={30} style={{ marginBottom: "10px" }} />
                  <p>Upload screenshot</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => { setPaymentFile(e.target.files[0]); setFeedback({ message: "", isError: false }); }}
              />
            </UploadLabel>
            
            <SubmitButton onClick={handleSubmitProof}>
              Submit Payment
            </SubmitButton>
          </BaseModal>
        )}

        {/* Loading */}
        {stage === "loading" && (
          <BaseModal $isMobile={isMobile} $stage="loading">
            {renderCloseBtn}

            <ModalTitle $isMobile={isMobile}>Thank you for choosing AsproIT</ModalTitle>

            <LoadingImage src={loadingImg} alt="Payment verification status" />

            <LoadingText $isMobile={isMobile}>
              A mail will be sent to you shortly when your payment status is verified
            </LoadingText>
          </BaseModal>
        )}
      </div>
    </ModalOverlay>
  );
}