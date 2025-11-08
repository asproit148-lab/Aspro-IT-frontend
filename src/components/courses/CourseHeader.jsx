// src/components/CourseHeader.jsx
import React from "react";

export default function CourseHeader() {
  return (
    <header
      style={{
        width: "1440px",
        height: "90px",
        backgroundColor: "black",
        borderBottom: "1px solid",
        borderImageSource: "linear-gradient(90deg, #8A38F5 12.98%, #F29B9B 76.44%)",
        borderImageSlice: 1,
        display: "flex",
        alignItems: "center",
        paddingLeft: "87px",
        backdropFilter: "blur(1px)",
      }}
    >
      <h1
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: "32px",
          lineHeight: "100%",
          letterSpacing: "5%",
          color: "white",
        }}
      >
        Learn with{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #E515D7 44.71%, #99A2E4 100%)",
            fontWeight: 700,
            fontSize: "36px",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AsproIT
        </span>
      </h1>
    </header>
  );
}
