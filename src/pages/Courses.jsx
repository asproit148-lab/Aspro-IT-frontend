// src/pages/Courses.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllCourses } from "../api/course";
import Header from '../components/Header';
import Footer from '../components/Footer';

const slugify = (title) =>
  title.trim().toLowerCase().replace(/\s+/g, "-");

const debounce = (fn, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

const CourseCard = ({ course, isMobile, handleBuyNow, handleViewDetails }) => (
  <Link
    key={course._id}

    to={`/courses/${slugify(course.Course_title)}`} state={{ id: course._id }}
    onClick={(e) => handleViewDetails(e, course)} // Use the generic details handler
    style={{
      flexShrink: isMobile ? 0 : 1,
      width: isMobile ? "100%" : "100%",
      height: "470px",
      maxWidth: isMobile ? "100%" : "300px", // Adjusted max width for 4-in-a-row
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
      textDecoration: "none",
      scrollSnapAlign: isMobile ? "start" : "unset",
      transform: "scale(1)",
    }}
    onMouseEnter={(e) => {
      if (!isMobile) {
        e.currentTarget.style.transform = "scale(1.02)";
      }
    }}
    onMouseLeave={(e) => {
      if (!isMobile) {
        e.currentTarget.style.transform = "scale(1)";
      }
    }}
  >
    <img
      src={course.imageUrl}
      alt={`Course thumbnail for: ${course.Course_title}`}
      loading="lazy"
      style={{
        width: "100%",
        height: "225px",
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
          fontSize: "20px", // Slightly reduced font size for 4-in-a-row fit
          color: "#FFFFFF",
          margin: "0 0 4px",
          textAlign: "left",
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={course.Course_title}
      >
        {course.Course_title}
      </h3>

      {/* Chips */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            borderRadius: "8px",
            padding: "4px 8px",
            fontSize: "14px",
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
            fontSize: "14px",
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
          fontSize: "18px",
          color: "#FFFFFF",
          marginBottom: "4px",
          marginTop: "8px",
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
          marginBottom: "8px",
          flexWrap: isMobile ? "nowrap" : "wrap",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            ₹{course.Final_cost}
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "line-through",
            }}
          >
            ₹{course.Course_cost}
          </div>
        </div>

        <div
          style={{
            minWidth: "70px",
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
          gap: "10px",
          marginTop: "auto", // Pushes buttons to the bottom
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={(e) => handleViewDetails(e, course)}
          style={{
            flexGrow: 1,
            width: "48%",
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
        >
          View Details
        </button>

        <button
          onClick={(e) => handleBuyNow(e, course)}
          style={{
            flexGrow: 1,
            width: "48%",
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
      </div>
    </div>
  </Link>
);


// Main Courses Page Component
export default function Courses() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [courseList, setCourseList] = useState([]);

  // --- Utility Functions ---
  const handleBuyNow = useCallback((e, course) => {
    e.preventDefault();
    e.stopPropagation();

    navigate("/courses/enrollment", {
      state: {
        course: course.Course_title,
        courseId: course._id,
        price: course.Final_cost,
        originalPrice: course.Course_cost,
        discount: course.Discount,
      },
    });
  }, [navigate]);

 const handleViewDetails = useCallback((e, course) => {
  e.preventDefault();
  e.stopPropagation();

  navigate(`/courses/${slugify(course.Course_title)}`, {
    state: { id: course._id }
  });
}, [navigate]);

  // --- Effects ---

  // API Fetch
  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await getAllCourses();
        setCourseList(response.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setCourseList([]);
      }
    }
    loadCourses();
  }, []);

  // Responsive Check
  useEffect(() => {
    const checkIsMobile = () => {
      // Define mobile based on a breakpoint (e.g., 768px for md in tailwind/bootstrap)
      setIsMobile(window.innerWidth < 768); 
    };
    const debouncedHandleResize = debounce(checkIsMobile, 150);

    checkIsMobile(); // Initial check
    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return (
    <div style={{ background: "#1B1B1B", minHeight: "100vh", position: "relative" }}>
      <Header />

      <section
        id="all-courses-page"
        style={{
          padding: isMobile ? "90px 20px 60px" : "120px 40px 80px", // Adjust padding for header
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          maxWidth: "1600px", // Allow wider layout
          margin: "0 auto",
        }}
      >
        {/* Page Title */}
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: isMobile ? "36px" : "40px",
            color: "#FFFFFF",
            textAlign: "center",
            marginTop: "10px",
            margin: 0,
          }}
        >
          Explore All Available Courses
        </h1>

        {/* Course Grid */}
        <div
          style={{
            display: "grid",
            gap: "20px",
            width: "100%",
            maxWidth: "1300px",
            justifyContent: isMobile ? "center" : "space-around",
            gridTemplateColumns: isMobile
              ? "repeat(auto-fill, minmax(280px, 1fr))" // 2 cards per row on mobile (roughly)
              : "repeat(4, minmax(300px, 1fr))", // 4 cards per row on web
          }}
        >
          {courseList.length > 0 ? (
            courseList.map((course) => (
              <CourseCard 
                key={course._id}
                course={course}
                isMobile={isMobile}
                handleBuyNow={handleBuyNow}
                handleViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <p style={{ color: '#FFF', gridColumn: '1 / -1', textAlign: 'center' }}>No courses available at the moment.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}