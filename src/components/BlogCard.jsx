import React from "react";
import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.jpg";

export default function BlogCard() {
  return (
    <div style={{ backgroundColor: "black", color: "white", paddingBottom: "80px" }}>
      {/* Heading */}
      <h2
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "48px",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "50px",
          color: "white",
        }}
      >
        Blogs
      </h2>

      {/* Blog Cards Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "150px",
          flexWrap: "wrap",
        }}
      >
        {/* Blog 1 */}
        <div
          style={{
            width: "519px",
            textAlign: "left",
          }}
        >
          <img
            src={blog1}
            alt="Blog 1"
            style={{
              width: "514px",
              height: "336px",
              borderRadius: "36px",
              border: "1px solid #000000",
              objectFit: "cover",
            }}
          />
          <div style={{ marginTop: "24px" }}>
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "135%",
                marginBottom: "10px",
              }}
            >
              How do I practice Python after learning?
            </h3>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "150%",
                color: "white",
              }}
            >
              12/7/2023. 2 min
              <br /> read
            </p>
          </div>
        </div>

        {/* Blog 2 */}
        <div
          style={{
            width: "514px",
            textAlign: "left",
          }}
        >
          <img
            src={blog2}
            alt="Blog 2"
            style={{
              width: "514px",
              height: "342px",
              borderRadius: "36px",
              objectFit: "cover",
            }}
          />
          <div style={{ marginTop: "24px" }}>
            <h3
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "40px",
                lineHeight: "135%",
                marginBottom: "10px",
              }}
            >
              The Impact of Next Generation AI and ML on Our Daily Lives
            </h3>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "150%",
                color: "white",
              }}
            >
              11/29/2023. 2 min
              <br />  read
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
