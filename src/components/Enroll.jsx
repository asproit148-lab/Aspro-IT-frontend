import React from "react";
import { Award, Clock, Video, Download } from "lucide-react";

export default function Enroll() {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        paddingTop: "20px",
        paddingLeft: "60px",
        paddingRight: "60px",
        paddingBottom: "60px",
      }}
    >
      {/* Heading */}
      <h1
        style={{
          fontWeight: 600,
          fontSize: "32px",
          lineHeight: "100%",
          marginBottom: "25px",
        }}
      >
        Enrollment Details
      </h1>

      {/* Main Flex Container */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        {/* FORM CONTAINER */}
        <div
          style={{
            width: "800px",
            height: "552px",
            borderRadius: "16px",
            background:
              "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
            boxShadow: "0px 4px 16px 0px #FFFFFF40",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
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
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label
                style={{ fontWeight: 500, fontSize: "20px", lineHeight: "100%" }}
              >
                Name<span style={{ color: "#FF4D4D" }}> *</span>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label
                style={{ fontWeight: 500, fontSize: "20px", lineHeight: "100%" }}
              >
                E-mail<span style={{ color: "#FF4D4D" }}> *</span>
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

          {/* Row 2 - Address */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <label style={{ fontWeight: 500, fontSize: "20px" }}>
                Address<span style={{ color: "#FF4D4D" }}> *</span>
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

          {/* Row 3 - State & Zip */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>
                State<span style={{ color: "#FF4D4D" }}> *</span>
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

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>
                Zip Code<span style={{ color: "#FF4D4D" }}> *</span>
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

          {/* Row 4 - Course, Mode, Timing */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "23px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>
                Course Name<span style={{ color: "#FF4D4D" }}> *</span>
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

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>
                Mode of Training<span style={{ color: "#FF4D4D" }}> *</span>
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

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>
                Timing<span style={{ color: "#FF4D4D" }}> *</span>
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

          {/* Row 5 - Batch & Phone */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>
                Batch Type<span style={{ color: "#FF4D4D" }}> *</span>
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

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>
                Phone Number<span style={{ color: "#FF4D4D" }}> *</span>
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
        </div>

        {/* PRICE DETAILS CONTAINER */}
        <div
          style={{
            width: "400px",
            height: "555px",
            borderRadius: "16px",
            background:
              "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
            boxShadow: "0px 4px 16px 0px #FFFFFF40",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Prices */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "20px",
              marginBottom: "5px",
              marginTop: "40px",
            }}
          >
            <div style={{ fontSize: "48px", fontWeight: 700, color: "#FFFFFF" }}>
              ₹2499
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "line-through",
              }}
            >
              ₹3500
            </div>
            <div
              style={{
                marginLeft: "auto",
                width: "81px",
                height: "32px",
                borderRadius: "25px",
                color: "#0DA745",
                background: "#0DA74540",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              29% OFF
            </div>
          </div>

          {/* Sale text */}
          <p
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#FF6969",
              marginBottom: "30px",
            }}
          >
            Sale ends in 24 hours!
          </p>

          {/* Button */}
          <button
              style={{
                width: "375px",
                height: "54px",
                borderRadius: "8px",
                border: "1px solid #FFFFFF",
                background: "transparent",
                color: "#FFFFFF",
                fontSize: "28px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0px 4px 16px 0px #FFFFFF40";
                e.currentTarget.style.background = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Proceed to Payment
          </button>

          {/* Divider */}
          <div
            style={{
              width: "377px",
              borderTop: "1px solid white",
              opacity: "0.4",
              marginTop: "40px",
              marginBottom: "30px",
            }}
          ></div>

          {/* This Course Includes */}
          <p
            style={{
              fontSize: "14px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            This course includes:
          </p>

          {/* List Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
                { icon: <Award size={25} color="#0DA745" />, text: "Certification of completion" },
                { icon: <Clock size={25} color="#0DA745" />, text: "Full time access" },
                { icon: <Video size={25} color="#0DA745" />, text: "On-demand videos" },
                { icon: <Download size={25} color="#0DA745" />, text: "Downloadable resources" },
            ].map((item, index) => (
                <div
                 key={index}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                {item.icon}
                <span style={{ fontSize: "12px" }}>{item.text}</span>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
}
