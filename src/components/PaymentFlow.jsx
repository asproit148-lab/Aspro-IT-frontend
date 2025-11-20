import React, { useState } from "react";
import qrImg from "../assets/qr.jpeg";
import loadingImg from "../assets/loading.png";

export default function PaymentFlow({ open, onClose }) {
  const [stage, setStage] = useState("qr"); // qr → proof → loading
  const [coupon, setCoupon] = useState("");
  const [paymentFile, setPaymentFile] = useState(null);

  if (!open) return null;

  const closeAll = () => {
    setStage("qr");
    setCoupon("");
    setPaymentFile(null);
    onClose && onClose();
  };

  // X BUTTON STYLE
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
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {/* ================= QR POPUP ================= */}
      {stage === "qr" && (
        <div
          style={{
            width: "560px",
            padding: "30px",
            borderRadius: "20px",
            background: "#1A1A1A",
            border: "1px solid #4D4D4D",
            textAlign: "center",
            color: "white",
            fontFamily: "Poppins",
            position: "relative",
          }}
        >
          {closeBtn}

          <h2 style={{ fontSize: "24px", fontWeight: 600 }}>Scan to Proceed</h2>

          <img
            src={qrImg}
            alt="QR Code"
            style={{ width: "244px", height: "237px", borderRadius: "30px", margin: "25px auto" }}
          />

          <p
            style={{
              fontFamily: "Inter",
              fontSize: "16px",
              fontWeight: 500,
              opacity: 0.8,
              marginBottom: "25px",
            }}
          >
            Scan this code to proceed with the payment
          </p>

          {/* Coupon Input */}
          <div
            style={{
              width: "317px",
              height: "39px",
              borderRadius: "10px",
              border: "1px solid #BFBFBF",
              margin: "0 auto 20px auto",
              display: "flex",
              alignItems: "center",
              background: "#000",
            }}
          >
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Apply Coupon Code"
              style={{
                flex: 1,
                height: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                paddingLeft: "10px",
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: 600,
                color: "#fff",
              }}
            />
            <button
              style={{
                width: "100px",
                height: "100%",
                borderRadius: "10px",
                border: "1px solid #BFBFBF",
                background: "#666",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Apply
            </button>
          </div>

          <button
            onClick={() => setStage("proof")}
            style={{
              width: "113px",
              height: "39px",
              borderRadius: "9px",
              background: "#2B6EF0",
              color: "white",
              fontWeight: 600,
              fontFamily: "Poppins",
              cursor: "pointer",
              border: "none",
            }}
          >
            Save
          </button>
        </div>
      )}

      {/* ================= PAYMENT PROOF POPUP ================= */}
      {stage === "proof" && (
        <div
          style={{
            width: "560px",
            padding: "30px",
            borderRadius: "20px",
            background: "#1A1A1A",
            border: "1px solid #4D4D4D",
            textAlign: "center",
            color: "white",
            fontFamily: "Poppins",
            position: "relative",
          }}
        >
          {closeBtn}

          <h2 style={{ fontSize: "24px", fontWeight: 600 }}>Add Payment Screenshot</h2>

          <label
            style={{
              width: "480px",
              height: "200px",
              borderRadius: "16px",
              border: "1px dashed #C9C9C9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "25px auto",
              cursor: "pointer",
              fontFamily: "Inter",
              opacity: 0.7,
            }}
          >
            {paymentFile ? (
              <p>Uploaded: {paymentFile.name}</p>
            ) : (
              "Upload screenshot"
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setPaymentFile(e.target.files[0])}
            />
          </label>

          <button
            onClick={() => setStage("loading")}
            style={{
              width: "113px",
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
            Save
          </button>
        </div>
      )}

      {/* ================= LOADING POPUP ================= */}
      {stage === "loading" && (
        <div
          style={{
            width: "688px",
            height: "452px",
            borderRadius: "15px",
            border: "1px solid #fff",
            background: "#1A1A1A",
            textAlign: "center",
            padding: "40px",
            fontFamily: "Poppins",
            color: "white",
            position: "relative",
          }}
        >
          {closeBtn}

          <h2 style={{ fontSize: "24px", fontWeight: 600 }}>Thank you for choosing AsproIT</h2>

          <img
            src={loadingImg}
            alt="loading"
            style={{ width: "64px", height: "72px", margin: "50px auto" }}
          />

          <p style={{ fontSize: "20px", fontWeight: 500, marginTop: "20px" }}>
            A mail will be sent to you shortly when your payment status is verified
          </p>
        </div>
      )}
    </div>
  );
}
