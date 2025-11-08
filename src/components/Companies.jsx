import React from "react";
import walmart from "../assets/walmart.png";
import infosys from "../assets/infosys.png";
import samsung from "../assets/samsung.png";
import tcs from "../assets/tcs.png";
import wipro from "../assets/wipro.png";
import hcl from "../assets/hcl.png";
import amazon from "../assets/amazon.png";
import atlassian from "../assets/atlassian.png";

export default function Companies() {
  return (
    <section
      style={{
        width: "1440px",
        height: "700px",
        background:
          "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
        boxShadow:
          "-4px -4px 16px 0px #FFFFFF0D inset, 4px 4px 16px 0px #FFFFFF0D inset",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle Glow Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(circle at 5% 5%, rgba(180,180,180,0.9) 0px, rgba(180,180,180,0.55) 80px, rgba(180,180,180,0.25) 250px, transparent 320px)",
          filter: "blur(60px)",
        }}
      />

      {/* Heading */}
      <h2
        style={{
          width: "1250px",
          height: "72px",
          marginTop: "30px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "60px",
          lineHeight: "130%",
          textAlign: "center",
          color: "#FFFFFF",
          zIndex: 1,
        }}
      >
        We Provide{" "}
        <span
          style={{
            color: "#FAAD4F",
            fontSize: "64px",
            fontWeight: 700,
          }}
        >
          Guidance{" "}
        </span>
        To Get Placed in Top Companies
      </h2>

      {/* Company Logos */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          marginTop: "80px",
          zIndex: 1,
        }}
      >
        {/* Row 1 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "100px",
          }}
        >
          {[walmart, infosys, samsung].map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt="company logo"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
                filter: "brightness(0.9)",
              }}
            />
          ))}
        </div>

        {/* Row 2 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "100px",
          }}
        >
          {[tcs, wipro, hcl, amazon, atlassian].map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt="company logo"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
                filter: "brightness(0.9)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Explore Courses Button */}
      <button
        style={{
          marginTop: "40px",
          width: "487px",
          height: "62px",
          borderRadius: "16px",
          background: "#FFFFFF40",
          color: "#FFFFFF",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "24px",
          border: "none",
          cursor: "pointer",
          zIndex: 1,
          transition: "all 0.3s ease",
        }}
      >
        Explore Courses
      </button>
    </section>
  );
}
