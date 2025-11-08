import React from "react";
import { CircleCheck, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccessfulEnroll() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "1052px",
        height: "1015px",
        marginTop: "50px",
        marginBottom: "60px",
        marginLeft: "140px",
        borderRadius: "8px",
        background:
          "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
        boxShadow:
          "-4px -4px 16px 0px #FFFFFF14, 4px 4px 16px 0px #FFFFFF29",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 32px",
      }}
    >
      {/* Green Tick */}
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "35px",
          background: "#D1FADA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "0",
        }}
      >
        <CircleCheck size={44} color="#28A745" />
      </div>

      {/* Heading */}
      <h1
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "48px",
          color: "#28A745",
          textAlign: "center",
          marginTop: "2px",   
          marginBottom: "0",
        }}
      >
        Congratulations! Your Enrollment is Confirmed.
      </h1>

      {/* Sub Heading */}
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          color: "#FFFFFF",
          textAlign: "center",
          marginBottom: "24px",
          width: "731px",
        }}
      >
        Your payment was successful. You will receive an email shortly with your
        course details and next steps. Welcome onboard!
      </p>

      {/* Line */}
      <div
        style={{
          width: "1050px",
          border: "1px solid #FFFFFF40",
          marginBottom: "12px",
        }}
      ></div>

      <h1
        style={{
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: "100%",
          marginBottom: "12px",
        }}
      >
        Enrollment Details
      </h1>

      {/* FORM CONTAINER */}
        {/* Row 1 - Name & Email */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
            gap: "24px",
          }}
        >
          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label style={{ fontWeight: 500, fontSize: "20px", lineHeight: "100%" }}>
              Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              style={{
                fontSize: "12px",
                width: "360px",
                paddingLeft: "20px",
                height: "40px",
                borderRadius: "8px",
                border: "0.5px solid #FFFFFF",
                background: "transparent",
                color: "white",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label style={{ fontWeight: 500, fontSize: "20px", lineHeight: "100%" }}>
              E-mail
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              style={{
                fontSize: "12px",
                width: "360px",
                height: "40px",
                paddingLeft: "20px",
                borderRadius: "8px",
                border: "0.5px solid #FFFFFF",
                background: "transparent",
                color: "white",
              }}
            />
          </div>
        </div>

        {/* Address */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          <label style={{ fontWeight: 500, fontSize: "20px" }}>
            Address
          </label>
          <input
            type="text"
            placeholder="Residential address"
            style={{
              fontSize: "12px",
              width: "775px",
              height: "40px",
              borderRadius: "8px",
              border: "0.5px solid #FFFFFF",
              background: "transparent",
              color: "white",
              paddingLeft: "20px",
            }}
          />
        </div>

        {/* State & Zip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            <label style={{ fontWeight: 500, fontSize: "20px" }}>
              State
            </label>
            <input
              type="text"
              placeholder="eg: Delhi"
              style={{
                fontSize: "12px",
                width: "360px",
                height: "40px",
                borderRadius: "8px",
                border: "0.5px solid #FFFFFF",
                background: "transparent",
                color: "white",
                paddingLeft: "20px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            <label style={{ fontWeight: 500, fontSize: "20px" }}>
              Zip Code
            </label>
            <input
              type="text"
              placeholder="eg: 112223"
              style={{
                fontSize: "12px",
                width: "360px",
                height: "40px",
                borderRadius: "8px",
                border: "0.5px solid #FFFFFF",
                background: "transparent",
                color: "white",
                paddingLeft: "20px",
              }}
            />
          </div>
        </div>

        {/* Course, Mode, Timing */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "23px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            <label style={{ fontWeight: 500, fontSize: "20px" }}>
              Course Name
            </label>
            <input
              type="text"
              placeholder="Data Analytics"
              style={{
                fontSize: "12px",
                width: "360px",
                height: "40px",
                borderRadius: "8px",
                border: "0.5px solid #FFFFFF",
                background: "transparent",
                color: "white",
                paddingLeft: "20px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            <label style={{ fontWeight: 500, fontSize: "20px" }}>
              Mode of Training
            </label>
            <input
              type="text"
              placeholder="Online / Offline"
              style={{
                fontSize: "12px",
                width: "160px",
                height: "40px",
                borderRadius: "8px",
                border: "0.5px solid #FFFFFF",
                background: "transparent",
                color: "white",
                paddingLeft: "20px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            <label style={{ fontWeight: 500, fontSize: "20px" }}>
              Timing
            </label>
            <input
              type="text"
              placeholder="7 PM - 9 PM IST"
              style={{
                fontSize: "12px",
                width: "160px",
                height: "40px",
                borderRadius: "8px",
                border: "0.5px solid #FFFFFF",
                background: "transparent",
                color: "white",
                paddingLeft: "20px",
              }}
            />
          </div>
        </div>
        <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>
                Batch Type
              </label>
              <input
                type="text"
                placeholder="1 on 1 / Grouped"
                style={{
                  fontSize: "12px",
                  width: "360px",
                  height: "40px",
                  borderRadius: "8px",
                  border: "0.5px solid #FFFFFF",
                  background: "transparent",
                  color: "white",
                  paddingLeft: "20px",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+91 909xxxxxxx"
                style={{
                  fontSize: "12px",
                  width: "360px",
                  height: "40px",
                  borderRadius: "8px",
                  border: "0.5px solid #FFFFFF",
                  background: "transparent",
                  color: "white",
                  paddingLeft: "20px",
                }}
              />
            </div>
          </div>

      {/* Line After Form */}
      <div
        style={{
          width: "1050px",
          border: "1px solid #FFFFFF40",
          marginTop: "40px",
          marginBottom: "32px",
        }}
      ></div>

      {/* Go to Dashboard Button */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "236px",
          height: "48px",
          borderRadius: "8px",
          background: "#0051BA",
          color: "white",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <LayoutDashboard size={20} color="#FFFFFF" /> Go to Dashboard
      </button>
    </div>
  );
}
