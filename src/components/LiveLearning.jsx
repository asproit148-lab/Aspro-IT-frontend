// src/components/LiveLearning.jsx
import { useState } from "react";
import course1 from "../assets/course1.png";
import course2 from "../assets/course2.png";
import course3 from "../assets/course3.png";
import course4 from "../assets/course4.png";
import course5 from "../assets/course5.png";
import course6 from "../assets/course6.png";
import course7 from "../assets/course7.png";
import course8 from "../assets/course8.png";

export default function LiveLearning() {
  const [showAll, setShowAll] = useState(false);

  const courses = [
    {
      img: course1,
      title: "Generative AI",
      price: 2999,
      originalPrice: 4999,
      discount: "40% OFF",
      tags: ["Bilingual", "Live Batch"],
    },
    {
      img: course2,
      title: "Data Analytics",
      price: 2499,
      originalPrice: 3999,
      discount: "35% OFF",
      tags: ["Bilingual", "Live Batch"],
    },
    {
      img: course3,
      title: "Blockchain Technology",
      price: 3299,
      originalPrice: 4999,
      discount: "30% OFF",
      tags: ["Bilingual", "Live Batch"],
    },
    {
      img: course4,
      title: "Cloud Computing",
      price: 4499,
      originalPrice: 6999,
      discount: "35% OFF",
      tags: ["Bilingual", "Live Batch"],
    },
    {
      img: course5,
      title: "DevOps",
      price: 4999,
      originalPrice: 7999,
      discount: "40% OFF",
      tags: ["Bilingual", "Live Batch"],
    },
    {
      img: course6,
      title: "Cyber Security",
      price: 3799,
      originalPrice: 5999,
      discount: "35% OFF",
      tags: ["Bilingual", "Live Batch"],
    },
    {
      img: course7,
      title: "Full Stack Development",
      price: 4299,
      originalPrice: 6999,
      discount: "38% OFF",
      tags: ["Bilingual", "Live Batch"],
    },
    {
      img: course8,
      title: "Python Programming",
      price: 3599,
      originalPrice: 5499,
      discount: "34% OFF",
      tags: ["Bilingual", "Live Batch"],
    },
  ];

  const displayedCourses = showAll ? courses : courses.slice(0, 6);

  return (
    <section
      style={{
        width: "1440px",
        position: "relative",
        background: "#1B1B1B",
        boxShadow:
          "0px 8px 12px 0px #52525280 inset, 0px -8px 12px 0px #52525240 inset",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        paddingBottom: "30px",
        transition: "all 0.4s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(circle at 5% 5%, rgba(230,113,240,0.9) 0px, rgba(230,113,240,0.55) 80px, rgba(230,113,240,0.25) 250px, transparent 320px), " +
            "radial-gradient(circle at 95% 95%, rgba(61,140,224,0.9) 0px, rgba(61,140,224,0.55) 80px, rgba(61,140,224,0.25) 250px, transparent 320px)",
          filter: "blur(50px)",
        }}
      />

      {/* Heading */}
      <h2
        style={{
          width: "1043px",
          height: "25px",
          marginTop: "60px",
          textAlign: "center",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "48px",
          lineHeight: "1",
          color: "#FFFFFF",
          position: "relative",
          zIndex: 2,
        }}
      >
        Accelerate Your Career with
        <span style={{ color: "#C539E6", fontWeight: 900 }}> Live </span>
        Learning
      </h2>

      {/* Subheading */}
      <p
        style={{
          width: "1043px",
          height: "10px",
          marginTop: "2px",
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "1",
          color: "#FFFFFF80",
          position: "relative",
          zIndex: 2,
        }}
      >
        Gain instant access to our live expert-led classes and join a vibrant
        community on WhatsApp. Our premium courses are your key to
        <br /> unlocking rapid career advancement. 🚀
      </p>

      {/* Course grid */}
      <div
        style={{
          width: "1268px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "48px 24px",
          marginTop: "80px",
          justifyItems: "center",
          position: "relative",
          zIndex: 2,
          transition: "all 0.4s ease",
        }}
      >
        {displayedCourses.map((course, index) => (
          <div
            key={index}
            style={{
              width: "407px",
              height: "580px",
              borderRadius: "24px",
              background:
                "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
              boxShadow:
                "-4px -4px 16px 0px #FFFFFF0D inset, 4px 4px 16px 0px #FFFFFF0D inset",
              overflow: "hidden",
              transition: "all 0.4s ease-out",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            <img
              src={course.img}
              alt={course.title}
              style={{
                width: "407px",
                height: "285px",
                objectFit: "cover",
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
              }}
            />

            <div style={{ padding: "20px 24px", flex: "1" }}>
              <h3
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "28px",
                  color: "#FFFFFF",
                  margin: "10px 0 8px",
                  textAlign: "left",
                }}
              >
                {course.title}
              </h3>

              {/* Chips */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                {course.tags.map((tag, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: "8px",
                      padding: "4px 8px",
                      fontSize: "16px",
                      color: "#FFF",
                      background:
                        tag === "Bilingual" ? "#FFFFFF40" : "#FF000080",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#FFFFFF",
                  marginBottom: "2px",
                  marginTop: "40px",
                }}
              >
                Grab your discount
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "30px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{ fontSize: "24px", fontWeight: 600, color: "#FFFFFF" }}
                >
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
                    fontWeight: 400,
                    color: "#FFF",
                  }}
                >
                  {course.discount}
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <button
                  style={{
                    width: "177px",
                    height: "44px",
                    borderRadius: "8px",
                    background: "#FFFFFF40",
                    color: "#FFFFFF",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#FFFFFF";
                    e.target.style.color = "#000000";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#FFFFFF40";
                    e.target.style.color = "#FFFFFF";
                  }}
                >
                  View Details
                </button>
                <button
                  style={{
                    width: "181px",
                    height: "44px",
                    borderRadius: "8px",
                    background: "#FFFFFFBF",
                    color: "#000000",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "#FFFFFFBF")
                  }
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setShowAll(!showAll)}
        style={{
          marginTop: "30px",
          width: "260px",
          height: "60px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.25)",
          fontFamily: "Poppins, sans-serif",
          fontSize: "18px",
          fontWeight: 600,
          color: "#FFFFFF",
          cursor: "pointer",
          transition: "all 0.3s ease",
          position: "relative",
          zIndex: 2,
        }}
      >
        {showAll ? "Show Less" : "Explore All Courses"}
      </button>
    </section>
  );
}
