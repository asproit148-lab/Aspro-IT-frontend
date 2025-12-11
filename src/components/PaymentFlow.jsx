import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import qrImg from "../assets/qr.jpeg";
import loadingImg from "../assets/loading.png";
import { submitPayment } from "../api/payment"; 
import { Upload } from "lucide-react"; 

const mobileBreakpoint = 500;

/* STYLED COMPONENTS */

// --- Overlay and Base Modal ---

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.$isMobile ? "90%" : "100vw"};
  height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow-x: hidden;
  padding: ${props => props.$isMobile ? "20px" : "0"};
`;

const BaseModal = styled.div`
  width: ${props => props.$isMobile ? "100%" : (props.$stage === "loading" ? "688px" : "560px")};
  max-width: ${props => props.$stage === "loading" ? "688px" : "560px"};
  /* Height only for loading screen on desktop, otherwise auto */
  height: ${props => props.$stage === "loading" && !props.$isMobile ? "452px" : "auto"};
  padding: ${props => props.$stage === "loading" ? "40px" : "30px"};
  border-radius: ${props => props.$stage === "loading" ? "15px" : "20px"};
  border: 1px solid ${props => props.$stage === "loading" ? "#fff" : "#4D4D4D"};
  background: #1A1A1A;
  text-align: center;
  color: white;
  font-family: Poppins, sans-serif;
  position: relative;
  margin: ${props => props.$isMobile ? "0" : "auto"};
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
  font-size: ${props => props.$isMobile ? "20px" : "24px"};
  font-weight: 600;
`;

// --- QR Stage Specific ---

const PriceText = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const DiscountText = styled(PriceText)`
  margin-top: 6px;
  color: #4CAF50;
`;

const QRImage = styled.img`
  width: ${props => props.$isMobile ? "80%" : "244px"};
  height: auto;
  max-width: 244px;
  border-radius: 30px;
  margin: 25px auto;
`;

const QRInstructionText = styled.p`
  font-family: Inter, sans-serif;
  font-size: ${props => props.$isMobile ? "14px" : "16px"};
  font-weight: 500;
  opacity: 0.8;
  margin-bottom: 25px;
`;

const ProceedButton = styled.button`
  width: ${props => props.$isMobile ? "90%" : "150px"};
  height: 39px;
  border-radius: 9px;
  background: #2B6EF0;
  color: white;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  border: none;
  margin: ${props => props.$isMobile ? "10px auto 0" : "0"};
`;

// --- Proof Stage Specific ---

const UploadLabel = styled.label`
  width: ${props => props.$isMobile ? "90%" : "480px"};
  max-width: 480px;
  height: 150px;
  border-radius: 16px;
  border: 1px dashed #C9C9C9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px auto;
  cursor: pointer;
  font-family: Inter, sans-serif;
  opacity: 0.7;
  font-size: 16px;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  width: ${props => props.$isMobile ? "90%" : "150px"};
  height: 39px;
  border-radius: 9px;
  background: #2B6EF0;
  color: white;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  border: none;
  margin: 20px;
`;

// NEW: Styled component for internal feedback
const FeedbackMessage = styled.div`
  color: ${props => props.$isError ? '#FF5555' : '#4CAF50'};
  margin: 10px 0;
  font-size: 14px;
  min-height: 20px; /* Reserve space to prevent layout shift */
`;

// --- Loading Stage Specific ---

const LoadingImage = styled.img`
  width: 64px;
  height: 72px;
  margin: 50px auto;
`;

const LoadingText = styled.p`
  font-size: ${props => props.$isMobile ? "16px" : "20px"};
  font-weight: 500;
  margin-top: 20px;
`;

// ------------------------------------

export default function PaymentFlow({ open, onClose, price, courseId }) {
  const [stage, setStage] = useState("qr"); 
  const [coupon] = useState(""); // Retain original state initialization
  const [paymentFile, setPaymentFile] = useState(null);

  // Retain original state initializations (though unused)
  const [finalPrice] = useState(price);
  const [discountPercent] = useState(0);
  const [couponError] = useState("");
  
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [feedback, setFeedback] = useState({ message: "", isError: false }); // NEW: State for feedback
  const isMobile = screenWidth < mobileBreakpoint;

  // 1. Screen size tracking for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
  if (stage === "loading") {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    return () => clearTimeout(timer);
  }
  setFeedback({ message: "", isError: false }); // Clear feedback on stage change
}, [stage]);

  if (!open) return null;

  const closeAll = () => {
    setStage("qr");
    // Removed unused state resets
    setPaymentFile(null);
    setFeedback({ message: "", isError: false }); // Reset feedback on close
    onClose && onClose();
  };

  const renderCloseBtn = (
    <CloseButton onClick={closeAll}>
      ✕
    </CloseButton>
  );
  
  const handleSubmitProof = async () => {
    if (!paymentFile) {
      // Replaced alert()
      setFeedback({ message: "Please upload a screenshot before submitting.", isError: true });
      return;
    }

    setFeedback({ message: "Submitting payment...", isError: false });

    try {
      await submitPayment(courseId, paymentFile);
      // Replaced alert()
      setFeedback({ message: "Payment submitted successfully! Pending verification.", isError: false });
      setStage("loading");
    } catch (err) {
      console.error(err);
      // Replaced alert()
      setFeedback({ message: "Failed to submit payment. Try again.", isError: true });
    }
  };


  return (
    <ModalOverlay $isMobile={isMobile} onClick={closeAll}>
      <div onClick={e => e.stopPropagation()}> {/* Prevent closing when clicking inside the modal */}
        {/*  QR POPUP  */}
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

            <QRImage src={qrImg} alt="QR Code" $isMobile={isMobile} />

            <QRInstructionText $isMobile={isMobile}>
              Scan this code to proceed with the payment
            </QRInstructionText>

            <ProceedButton onClick={() => setStage("proof")} $isMobile={isMobile}>
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

            <UploadLabel $isMobile={isMobile}>
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
                onChange={(e) => {setPaymentFile(e.target.files[0]); setFeedback({ message: "", isError: false });}}
              />
            </UploadLabel>

            <SubmitButton onClick={handleSubmitProof} $isMobile={isMobile}>
              Submit Payment
            </SubmitButton>
          </BaseModal>
        )}

        {/*  Loading  */}
        {stage === "loading" && (
          <BaseModal $isMobile={isMobile} $stage="loading">
            {renderCloseBtn}

            <ModalTitle $isMobile={isMobile}>Thank you for choosing AsproIT</ModalTitle>

            <LoadingImage src={loadingImg} alt="loading" />

            <LoadingText $isMobile={isMobile}>
              A mail will be sent to you shortly when your payment status is verified
            </LoadingText>
          </BaseModal>
        )}
      </div>
    </ModalOverlay>
  );
}