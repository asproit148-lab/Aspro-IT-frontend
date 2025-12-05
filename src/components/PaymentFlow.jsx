import React, { useState, useEffect  } from "react";
import qrImg from "../assets/qr.jpeg";
import loadingImg from "../assets/loading.png";
import { submitPayment } from "../api/payment"; 
import { Upload } from "lucide-react"; 

// Use a common mobile breakpoint for all stages
const mobileBreakpoint = 500;

export default function PaymentFlow({ open, onClose, price, courseId }) {
  const [stage, setStage] = useState("qr"); 
  const [coupon, setCoupon] = useState("");
  const [paymentFile, setPaymentFile] = useState(null);

  const [finalPrice, setFinalPrice] = useState(price);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth < mobileBreakpoint;

  // 1. Screen size tracking for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
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
}, [stage]);

  if (!open) return null;

  const closeAll = () => {
    setStage("qr");
    setCoupon("");
    setPaymentFile(null);
    setDiscountPercent(0);
    setFinalPrice(price);
    setCouponError("");
    onClose && onClose();
  };

  const closeBtn = (
    <button
      onClick={closeAll}
      style={{
        position: "absolute",
        top: "12px",
        right: "12px",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "#333",
        border: "1px solid #777",
        color: "white",
        fontWeight: 600,
        cursor: "pointer",
        zIndex: 10000,
      }}
    >
      ✕
    </button>
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: isMobile ? "90%" : "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        overflowX: "hidden", 
        padding: isMobile ? "20px" : "0", // Padding on mobile for modal clearance
      }}
    >
      {/*  QR POPUP  */}
      {stage === "qr" && (
        <div
          style={{
            width: isMobile ? "100%" : "560px",
            maxWidth: "560px",
            padding: "30px",
            borderRadius: "20px",
            background: "#1A1A1A",
            border: "1px solid #4D4D4D",
            textAlign: "center",
            color: "white",
            fontFamily: "Poppins",
            position: "relative",
            margin: isMobile ? "0" : "auto",
          }}
        >
          {closeBtn}

          <h2 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: 600 }}>Scan to Proceed</h2>

          <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: 600 }}>
            Price: ₹{price}
          </p>

          {discountPercent > 0 && (
            <p
              style={{
                marginTop: "6px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#4CAF50",
              }}
            >
              After Discount ({discountPercent}%): ₹{finalPrice}
            </p>
          )}

          <img
            src={qrImg}
            alt="QR Code"
            style={{
              width: isMobile ? "80%" : "244px",
              height: "auto",
              maxWidth: "244px",
              borderRadius: "30px",
              margin: "25px auto",
            }}
          />

          <p
            style={{
              fontFamily: "Inter",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: 500,
              opacity: 0.8,
              marginBottom: "25px",
            }}
          >
            Scan this code to proceed with the payment
          </p>

          <button
            onClick={() => setStage("proof")}
            style={{
              width: isMobile ? "90%" : "150px",
              height: "39px",
              borderRadius: "9px",
              background: "#2B6EF0",
              color: "white",
              fontWeight: 600,
              fontFamily: "Poppins",
              cursor: "pointer",
              border: "none",
              margin: isMobile ? "10px auto 0" : "0", // Center on mobile
            }}
          >
            Proceed to Upload
          </button>
        </div>
      )}

      {/* Payment Proof */}
      {stage === "proof" && (
        <div
          style={{
            width: isMobile ? "100%" : "560px",
            maxWidth: "560px",
            padding: "30px",
            borderRadius: "20px",
            background: "#1A1A1A",
            border: "1px solid #4D4D4D",
            textAlign: "center",
            color: "white",
            fontFamily: "Poppins",
            position: "relative",
            margin: isMobile ? "0" : "auto",
          }}
        >
          {closeBtn}

          <h2 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: 600 }}>Add Payment Screenshot</h2>

          <label
            style={{
              width: isMobile ? "90%" : "480px",
              maxWidth: "480px",
              height: "150px",
              borderRadius: "16px",
              border: "1px dashed #C9C9C9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "25px auto",
              cursor: "pointer",
              fontFamily: "Inter",
              opacity: 0.7,
              fontSize: "16px",
              flexDirection: "column",
            }}
          >
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
              onChange={(e) => setPaymentFile(e.target.files[0])}
            />
          </label>


          <button
            onClick={async () => {
              if (!paymentFile) {
                alert("Please upload a screenshot before submitting.");
                return;
              }

              try {
                await submitPayment(courseId, paymentFile);
                alert("Payment submitted successfully! Pending verification.");
                setStage("loading");
              } catch (err) {
                console.error(err);
                alert("Failed to submit payment. Try again.");
              }
            }}
            style={{
              width: isMobile ? "90%" : "150px",
              height: "39px",
              borderRadius: "9px",
              background: "#2B6EF0",
              color: "white",
              fontWeight: 600,
              fontFamily: "Poppins",
              cursor: "pointer",
              border: "none",
              margin: "20px",
            }}
          >
            Submit Payment
          </button>
        </div>
      )}

      {/*  Loading  */}
      {stage === "loading" && (
        <div
          style={{
            width: isMobile ? "100%" : "688px",
            maxWidth: "688px",
            height: isMobile ? "auto" : "452px",
            borderRadius: "15px",
            border: "1px solid #fff",
            background: "#1A1A1A",
            textAlign: "center",
            padding: "40px",
            fontFamily: "Poppins",
            color: "white",
            position: "relative",
            margin: isMobile ? "0" : "auto",
          }}
        >
          {closeBtn}

          <h2 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: 600 }}>Thank you for choosing AsproIT</h2>

          <img
            src={loadingImg}
            alt="loading"
            style={{ width: "64px", height: "72px", margin: "50px auto" }}
          />

          <p style={{ fontSize: isMobile ? "16px" : "20px", fontWeight: 500, marginTop: "20px" }}>
            A mail will be sent to you shortly when your payment status is verified
          </p>
        </div>
      )}
    </div>
  );
}