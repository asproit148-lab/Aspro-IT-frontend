import React, { useState, useEffect } from "react";
import { CircleCheckBig, CircleX } from "lucide-react";
import { getPendingPayments, approvePayment, rejectPayment } from "../../api/payment";

export default function PaymentVerification() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    try {
      const res = await getPendingPayments();
      setPending(res.payments || []);
    } catch (err) {
      console.log("Error fetching pending payments:", err);
    }
  };

  const handleApprove = async (paymentId) => {
    if (!window.confirm("Confirm to approve payment?")) return;

    try {
      await approvePayment(paymentId);
      loadPending();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve");
    }
  };

  const handleReject = async (paymentId) => {
    if (!window.confirm("Reject this student's payment?")) return;

    try {
      await rejectPayment(paymentId);
      loadPending();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject");
    }
  };

  return (
    <div
      style={{
        left: "100px",
        background: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        paddingTop: "140px",
        paddingLeft: "120px",
        minHeight: "100vh",
      }}
    >
      {/* Heading */}
      <div>
        <h1
          style={{
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "100%",
            color: "#FFFFFF",
            marginLeft: "24px",
          }}
        >
          Payment Verification
        </h1>
        <p
          style={{
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "10%",
            color: "#FFFFFF",
            opacity: 0.9,
            marginTop: "4px",
            marginLeft: "24px",
          }}
        >
          Review pending payments and approve or reject student submissions
        </p>
      </div>

      {/* Top Bar */}
      <div
        style={{
          width: "1160px",
          height: "72px",
          marginTop: "40px",
          marginLeft: "20px",
          borderRadius: "10px",
          background: "linear-gradient(90.19deg, #323232 0%, #0F0F0F 59.13%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "8px",
          paddingLeft: "30px",
        }}
      >
        <div>
          <p style={{ fontSize: "20px", marginBottom: "1px" }}>Pending Verifications</p>
          <p style={{ fontSize: "24px", fontWeight: 500, margin: 0 }}>
            {pending.length}
          </p>
        </div>
      </div>

      {/* Pending Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          marginLeft: "50px",
          marginTop: "50px",
          marginBottom: "100px",
        }}
      >
        {pending.map((item) => (
          <div
            key={item._id}
            style={{
              width: "340px",
              height: "350px",
              background: "#343434",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src={item.paymentScreenshot}
              alt="proof"
              style={{
                width: "100%",
                height: "179px",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />

            <div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  marginTop: "12px",
                  marginBottom: "8px",
                }}
              >
                {item.courseId?.Course_title}
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#C9C9C9",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Student: {item.userId?.name}
              </p>
            </div>

            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(255,255,255,0.1)",
                margin: "10px 0",
              }}
            ></div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={() => handleApprove(item._id)}
                style={{
                  width: "100px",
                  height: "34px",
                  borderRadius: "10px",
                  background: "#28A745",
                  color: "#E3E3E3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <CircleCheckBig size={20} />
                Approve
              </button>

              <button
                onClick={() => handleReject(item._id)}
                style={{
                  width: "100px",
                  height: "34px",
                  borderRadius: "10px",
                  background: "#DC3545",
                  color: "#E3E3E3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <CircleX size={20} />
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
