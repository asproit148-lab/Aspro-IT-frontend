import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function CourseInfo({ course }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "720px",
        backgroundColor: "#000",
        fontFamily: "Poppins",
        color: "white",
        position: "relative",
        padding: "40px 60px 80px",
        boxSizing: "border-box",
      }}
    >
      {/* Centered Container */}
      <div
        style={{
          width: "1280px",
          margin: "0 auto",
          display: "flex",
          gap: "36px",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT CARD */}
        <div
          style={{
            width: "622px",
            height: "530px",
            borderRadius: "36px",
            padding: "24px",
            boxSizing: "border-box",
            background:
              "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
            boxShadow: "0px 4px 16px 0px #FFFFFF40",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#B272DEBF",
              fontSize: "20px",
              marginBottom: "14px",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
  <           span style={{ fontWeight: 700, opacity: 0.9 }}>Home</span>
            </Link>
            <span style={{ opacity: 0.6 }}>{">"}</span>
            <span style={{ fontWeight: 400 }}>{course.title}</span>
          </div>

          {/* Title */}
          <div style={{ width: "540px", marginTop: "6px", marginBottom: "18px" }}>
            <h1
              style={{
                margin: 0,
                fontSize: "48px",
                fontWeight: 700,
                lineHeight: "1.2",
                color: "#FFFFFF",
              }}
            >
              {course.title}
              <br />
              {course.subtitle}
            </h1>
          </div>

          {/* Chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "18px",
              width: "460px",
            }}
          >
            {course.chips.map((c) => (
              <div
                key={c}
                style={{
                  borderRadius: "4px",
                  padding: "8px 10px",
                  background: "rgba(255,255,255,0.15)",
                  color: "#FFFFFF",
                  fontSize: "12px",
                }}
              >
                {c}
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Pricing*/}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "20px",
              marginBottom: "14px",
            }}
          >
            <div style={{ fontSize: "48px", fontWeight: 600 }}>Price</div>
            <div style={{ fontSize: "32px", fontWeight: 600, color: "#0DA745" }}>
              ₹{course.price}
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "line-through",
              }}
            >
              ₹{course.originalPrice}
            </div>
            <div
              style={{
                marginLeft: "auto",
                width: "81px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              {course.discount}
            </div>
          </div>

          {/* Button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/courses/enrollment" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "545px",
                height: "66px",
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
              Enroll Now
            </button>
            </Link>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div
          style={{
            width: "622px",
            height: "530px",
            borderRadius: "36px",
            padding: "28px",
            boxSizing: "border-box",
            background:
              "radial-gradient(149.8% 402.76% at 29.27% 24.1%, #101010 11.88%, #595959 100%)",
            boxShadow: "0px 4px 16px 0px #FFFFFF40",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* COURSE DETAILS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              rowGap: "24px",
              columnGap: "40px",
            }}
          >
            <div style={{ width: "100%", height: "78px" }}>
              <div style={{ fontSize: "28px", fontWeight: 400, color: "#fff" }}>
                7 Course Series
              </div>
              <div
                style={{
                  marginTop: "4px",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "12px",
                  lineHeight: 1.5,
                }}
              >
                Achieve a certification that validates your knowledge and abilities
              </div>
            </div>

            <div style={{ width: "100%", height: "78px" }}>
              <div style={{ fontSize: "28px", fontWeight: 400 }}>
                Beginner Level
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                  marginTop: "4px",
                }}
              >
                No prerequisite knowledge required
              </div>
            </div>

            <div
              style={{
                width: "100%",
                height: "42px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ fontSize: "28px", fontWeight: 400 }}>Rating 4.2</div>
              <Star size={24} color="#FFD24D" />
            </div>

            <div
              style={{
                width: "100%",
                height: "42px",
              }}
            >
              <div style={{ fontSize: "28px", fontWeight: 400 }}>
                Flexible Schedule
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                  marginTop: "4px",
                }}
              >
                No fix schedule learn at your own pace
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "28px",
            }}
          >
            {[
              { color: "#0DA745", label: "Hybrid Course" },
              { color: "#5194FF", label: "Projects" },
              { color: "#FAAD4F", label: "Live Classes" },
            ].map((circle) => (
              <div
                key={circle.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: circle.color,
                    boxShadow: `0px 1px 12px 0px ${circle.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div style={{ fontSize: "16px" }}>{circle.label}</div>
              </div>
            ))}
          </div>

          {/* Bottom info pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "28px",
            }}
          >
            {[
              { k: "Language: ", v: "Bilingual" },
              { k: "Certificate: ", v: "Yes" },
              { k: "Schedule: ", v: "Mon - Sat (7:30)" },
              { k: "Learning Hours: ", v: "200+ Hours" },
            ].map((item) => (
              <div
                key={item.k}
                style={{
                  width: "275px",
                  height: "48px",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  boxSizing: "border-box",
                  gap: "6px",
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: 600 }}>
                  {item.k}
                </div>
                <div style={{ fontSize: "16px", color: "#FAAD4F" }}>
                  {item.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
