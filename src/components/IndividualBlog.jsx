// src/components/IndividualBlog.jsx
import React from "react";

export default function IndividualBlog({ title, image, subheading, content }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        paddingTop: "20px",
        paddingBottom: "2px",
      }}
    >
      {/* Blog Title */}
      <h1
        style={{
          width: "730px",
          height: "54px",
          textAlign: "center",
          fontWeight: 600,
          fontSize: "36px",
          lineHeight: "100%",
          color: "white",
          marginBottom: "20px",
        }}
      >
        {title}
      </h1>

      {/* Blog Image */}
      <img
        src={image}
        alt={title}
        style={{
          width: "1052px",
          height: "406px",
          borderRadius: "36px",
          objectFit: "cover",
          marginBottom: "20px",
          marginTop: "30px",
        }}
      />
      {/* Blog Subheading */}
      {subheading && (
        <h2
          style={{
            width: "100%",
            maxWidth: "1268px",
            fontSize: "24px",
            fontWeight: 600,
            color: "white",
            textAlign: "left",
            marginBottom: "20px",
          }}
        >
          {subheading}
        </h2>
      )}

      {/* Blog Content */}
      <div
        style={{
          width: "1268px",
          color: "#ccc",
          fontSize: "18px",
          lineHeight: "150%",
          letterSpacing: "0.3px",
          textAlign: "justify",
          marginBottom: "20px",
        }}
      >
        {content}
      </div>
    </div>
  );
}
