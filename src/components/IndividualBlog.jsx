import React from "react";

export default function IndividualBlog({ title, image, content }) {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "10px auto",
        paddingBottom: "60px",
        fontFamily: "Poppins, sans-serif",
        color: "white",
      }}
    >
      <img
        src={image}
        alt={`Featured image for the blog post: ${title}`}
        loading="lazy"
        sizes="(max-width: 600px) 100vw, 1200px"
        style={{
          width: "100%",
          height: "350px",
          objectFit: "cover",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      />

      <h1
        style={{
          fontSize: "clamp(20px, 4vw, 36px)",
          textAlign: "center",
          fontWeight: 600,
          marginBottom: "25px",
          lineHeight: "1.4",
          color: "#e6e6e6",
        }}
      >
        {title}
      </h1>

      <div
        style={{
          fontSize: "clamp(15px,2vw,20px)",
          lineHeight: "1.9",
          opacity: "0.95",
          padding: "0px 15px",
          textAlign: "justify",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {content}
      </div>
    </div>
  );
}