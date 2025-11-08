// src/components/admin/AddCoupon.jsx
import React, { useState } from "react";

export default function AddCoupon({ onClose, onSave, existingData }) {
  const [code, setCode] = useState(existingData?.code || "");
  const [discount, setDiscount] = useState(existingData?.discount || "");
  const [expiry, setExpiry] = useState(existingData?.expiry || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code || !discount || !expiry) {
      alert("Please fill all fields.");
      return;
    }

    const newCoupon = {
      id: Date.now(),
      code,
      discount,
      expiry,
    };

    if (onSave) onSave(newCoupon);
    onClose(); // close after save
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "600px",
          background: "#1B1B1B",
          borderRadius: "20px",
          padding: "30px 40px",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Heading */}
        <div>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "24px",
              color: "#FFFFFF",
              textAlign: "left",
              marginBottom: "8px",
            }}
          >
            Add New Coupon
          </h2>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: "15px",
              color: "#C9C9C9",
              textAlign: "left",
            }}
          >
            Enter details below to create a new discount offer.
          </p>
        </div>

        {/* Code */}
        <input
          type="text"
          placeholder="Enter coupon code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "30px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#2E2E2E",
            color: "#FFFFFF",
            fontSize: "18px",
            paddingLeft: "20px",
            fontFamily: "Poppins, sans-serif",
            outline: "none",
          }}
        />

        {/* Discount */}
        <input
          type="tel"
          placeholder="Enter discount %"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          style={{
            width: "97%",
            height: "50px",
            borderRadius: "30px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#2E2E2E",
            color: "#FFFFFF",
            fontSize: "18px",
            paddingLeft: "20px",
            paddingRight: "20px",
            fontFamily: "Poppins, sans-serif",
            outline: "none",
          }}
        />

        {/* Expiry Date */}
        <input
          type="date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          style={{
            width: "97%",
            height: "50px",
            borderRadius: "30px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#2E2E2E",
            color: "#FFFFFF",
            fontSize: "18px",
            paddingLeft: "20px",
            paddingRight: "20px",
            fontFamily: "Poppins, sans-serif",
            outline: "none",
          }}
        />

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: "120px",
              height: "50px",
              borderRadius: "15px",
              background: "#414141",
              color: "#FFFFFF",
              fontFamily: "Poppins, sans-serif",
              fontSize: "18px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            style={{
              width: "120px",
              height: "50px",
              borderRadius: "15px",
              background: "#2B6EF0",
              color: "#FFFFFF",
              fontFamily: "Poppins, sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
