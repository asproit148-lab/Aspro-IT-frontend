// src/components/LiveLearning.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllCourses } from "../api/course";

export default function LiveLearning() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const slugify = (title) => title.trim().toLowerCase().replace(/\s+/g, "-");
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await getAllCourses();
        setCourseList(response.courses);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    }
    loadCourses();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedCourses = showAll
  ? courseList
  : isMobile
  ? courseList.slice(0, 3)   
  : courseList.slice(0, 6);  


  return (
    <section
      id="live-learning"
      style={{
        width: isMobile ? "90%" : "100%", 
        position: "relative",
        top: isMobile ? "70px" : "105px", 
        background: "#1B1B1B",
        boxShadow:
          "0px 8px 12px 0px #52525280 inset, 0px -8px 12px 0px #52525240 inset",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        padding: "60px 20px 40px 20px",
        transition: "all 0.4s ease",
        gap: "30px",
      }}
    >
      {/* Background Overlay */}
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
          margin: 0,
          textAlign: "center",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "42px",
          lineHeight: "1.2",
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
          margin: 0,
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "1.5",
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
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "40px",
          width: "100%",
          maxWidth: "1280px",
          justifyItems: "center",
          position: "relative",
          zIndex: 2,
          transition: "all 0.4s ease",
        }}
      >
        {displayedCourses.map((course, index) => (
          <div
  key={index}
  onClick={() => navigate(`/courses/${course._id}`)}
  style={{
    width: "100%",
    maxWidth: isMobile ? "100%" : "407px",
    borderRadius: "24px",
    background:
      "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
    boxShadow:
      "-4px -4px 16px 0px #FFFFFF0D inset, 4px 4px 16px 0px #FFFFFF0D inset",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "all 0.4s ease-out",
  }}
>
            <img
              src={course.imageUrl}
              alt={course.title}
              style={{
                width: "100%",
                height: "285px",
                objectFit: "cover",
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
              }}
            />

            <div
              style={{
                padding: isMobile ? "16px 16px 20px" : "20px 24px",
                flex: "1",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "24px",
                  color: "#FFFFFF",
                  margin: "10px 0 8px",
                  textAlign: "left",
                }}
              >
                {course.Course_title}
              </h3>

              {/* Chips */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    borderRadius: "8px",
                    padding: "4px 8px",
                    fontSize: "16px",
                    color: "#FFF",
                    background: "#FFFFFF40",
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Bilingual
                </div>
                <div
                  style={{
                    borderRadius: "8px",
                    padding: "4px 8px",
                    fontSize: "16px",
                    color: "#FFF",
                    background:
                      course.Course_type === "Online" ? "#951212" : "#375B91",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {course.Course_type}
                </div>
              </div>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "#FFFFFF",
                  marginBottom: "8px",
                  marginTop: "15px",
                }}
              >
                Grab your discount
              </p>

              {/* Price + discount row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  flexWrap: isMobile ? "nowrap" : "wrap",
                }}
              >
                <div style={{ display: "flex", gap: "12px" }}>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    ₹{course.Final_cost}
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{course.Course_cost}
                  </div>
                </div>

                <div
                  style={{
                    minWidth: "80px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#FFF",
                    textAlign: "center",
                  }}
                >
                  {course.Discount}% OFF
                </div>
              </div>

              {/* Buttons row */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: isMobile ? "nowrap" : "wrap",
                  justifyContent: isMobile ? "space-between" : "flex-start",
                }}
              >
                <button
                  style={{
                    minWidth: isMobile ? "48%" : "160px",
                    height: "44px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.25)",
                    color: "#FFFFFF",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
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
                  onClick={() => navigate(`/courses/${course._id}`)}
                >
                  View Details
                </button>

                <Link
                  to="/courses/enrollment"
                  state={{
                    course: course.Course_title,
                    courseId: course._id,
                    price: course.Final_cost,
                    originalPrice: course.Course_cost,
                    discount: course.Discount,
                  }}
                  style={{ width: isMobile ? "48%" : "auto" }}
                >
                  <button
                    style={{
                      width: "100%",
                      minWidth: isMobile ? "100%" : "160px",
                      height: "44px",
                      borderRadius: "8px",
                      background: "#FFFFFFBF",
                      color: "#000000",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.background = "#FFFFFF")}
                    onMouseLeave={(e) =>
                      (e.target.style.background = "#FFFFFFBF")
                    }
                  >
                    Buy Now
                  </button>
                </Link>
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
          border: "none",
          background: "rgba(255,255,255,0.25)",
          fontFamily: "Poppins, sans-serif",
          fontSize: "16px",
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
