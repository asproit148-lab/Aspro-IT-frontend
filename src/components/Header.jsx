// src/components/Header.jsx
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import LoginPopup from "../components/LoginPopup";
import SignupPopup from "../components/SignupPopup";
import { getAllCourses } from "../api/course";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  User,
  LogOut,
  Download,
  BookOpen,
  Info,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Header() {
  const { user, signOut } = useAuth();

  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const textColor = "#3D96E0";

  // Popups & dropdowns
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        if (res.success) {
          setCourses(res.courses);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <header
      style={{
  width: "100%",
  backgroundColor: "black",
  position: "sticky",
  top: 0,
  zIndex: 100,
  boxShadow: "0px 4px 25px 0px #00508A",
}}
    >
      <div
        style={{
  maxWidth: "1400px",
  margin: "0 auto",
  height: "105px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 40px",
  flexWrap: "nowrap",
}}
      >
        {/* Logo */}
        <div style={{
  width: "180px",
  height: "auto",
  objectFit: "contain",
}}>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              style={{
                width: "221px",
                height: "63px",
                objectFit: "contain",
              }}
            />
          </Link>
        </div>

        {/* Nav */}
        <div
  style={{
  display: "flex",
  alignItems: "center",
  gap: "30px",
  flexWrap: "nowrap",
}}
>
          {/* Home */}
          <Link
            to="/"
            style={{
  display: "flex",
  alignItems: "center",
  gap: "6px",
  textDecoration: "none",
  fontFamily: "Poppins, sans-serif",
  fontSize: "20px",
  fontWeight: 400,
  color: textColor,
  cursor: "pointer",
  padding: "6px 0",
  transition: "0.3s",
}}
          >
            <Home size={20} /> Home
          </Link>

          {/* Download Dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setIsDownloadOpen(true)}
            onMouseLeave={() => setIsDownloadOpen(false)}
          >
            <div
  style={{
  display: "flex",
  alignItems: "center",
  gap: "6px",
  textDecoration: "none",
  fontFamily: "Poppins, sans-serif",
  fontSize: "20px",
  fontWeight: 400,
  color: textColor,
  cursor: "pointer",
  padding: "6px 0",
  transition: "0.3s",
}}
>
  Download{" "}
  {isDownloadOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
</div>


            {isDownloadOpen && (
              <div
                style={{
  position: "absolute",
  top: "40px",
  left: 0,
  background: "#212121",
  borderRadius: "8px",
  boxShadow: "0px 1px 20px rgba(61,150,224,0.5)",
  display: "flex",
  flexDirection: "column",
  minWidth: "160px",
  zIndex: 999,
}}

              >
                {[{ name: "Resources", link: "/resources" }, { name: "Certificates", link: "/certificates" }].map(
                  (item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      style={{
                        width: "138px",
                        height: "28px",
                        padding: "5px 10px",
                        borderRadius:
                          index === 0
                            ? "8px 8px 0 0"
                            : index === 1
                            ? "0 0 8px 8px"
                            : "0",
                        background: "#343434",
                        color: "white",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        cursor: "pointer",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "gray")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#343434")
                      }
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          {/* Courses Dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setIsCoursesOpen(true)}
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <div
              onClick={() => {
                setIsCoursesOpen(!isCoursesOpen);
                setIsAboutOpen(false);
              }}
              style={{
  display: "flex",
  alignItems: "center",
  gap: "6px",
  textDecoration: "none",
  fontFamily: "Poppins, sans-serif",
  fontSize: "20px",
  fontWeight: 400,
  color: textColor,
  cursor: "pointer",
  padding: "6px 0",
  transition: "0.3s",
}}
            >
              <BookOpen size={20} /> Courses{" "}
              {isCoursesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {isCoursesOpen && (
              <div
                style={{
  position: "absolute",
  top: "40px",
  left: 0,
  background: "#212121",
  borderRadius: "8px",
  boxShadow: "0px 1px 20px rgba(61,150,224,0.5)",
  display: "flex",
  flexDirection: "column",
  minWidth: "160px",
  zIndex: 999,
}}

              >
                {courses
  .filter(course => course.Course_title) // optional: skip courses without title
  .map((course, index) => (
    <Link
      key={course._id}
      to={`/courses/${course._id}`}
      style={{
        width: "227px",
        height: "36px",
        padding: "6px 18px",
        borderRadius:
          index === 0
            ? "8px 8px 0 0"
            : index === courses.length - 1
            ? "0 0 8px 8px"
            : "0",
        background: "#343434",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        cursor: "pointer",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "gray")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#343434")}
    >
      {course.Course_title}
    </Link>
  ))}

              </div>
            )}
          </div>

          {/* About Dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <Link
              to="/about-us"
              style={{
  display: "flex",
  alignItems: "center",
  gap: "6px",
  textDecoration: "none",
  fontFamily: "Poppins, sans-serif",
  fontSize: "20px",
  fontWeight: 400,
  color: textColor,
  cursor: "pointer",
  padding: "6px 0",
  transition: "0.3s",
}}
            >
              <Info size={20} />About{" "}
              {isAboutOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </Link>

            {isAboutOpen && (
              <div
                style={{
  position: "absolute",
  top: "40px",
  left: 0,
  background: "#212121",
  borderRadius: "8px",
  boxShadow: "0px 1px 20px rgba(61,150,224,0.5)",
  display: "flex",
  flexDirection: "column",
  minWidth: "160px",
  zIndex: 999,
}}

              >
                {[{ name: "Blogs", link: "/blogs" }, { name: "Services", link: "/our-services" }].map(
                  (item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      style={{
                        width: "138px",
                        height: "28px",
                        padding: "5px 10px",
                        borderRadius:
                          index === 0 ? "8px 8px 0 0" : index === 1 ? "0 0 8px 8px" : "0",
                        background: "#343434",
                        color: "white",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        cursor: "pointer",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "gray")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#343434")
                      }
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          {/* Contact */}
          <Link
            to="/contact"
            style={{
  display: "flex",
  alignItems: "center",
  gap: "6px",
  textDecoration: "none",
  fontFamily: "Poppins, sans-serif",
  fontSize: "20px",
  fontWeight: 400,
  color: textColor,
  cursor: "pointer",
  padding: "6px 0",
  transition: "0.3s",
}}
          >
            <Phone size={20} /> Contact
          </Link>
        </div>

        {/* Login / User Icon */}
        {user ? (
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  border: "3px solid #FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backgroundColor: "transparent",
  position: "relative",
  transition: "0.3s",
}}

            title="Profile"
          >
            <User size={24} color="white" />
            {showDropdown && (
              <div
                style={{
  position: "absolute",
  top: "60px",
  right: 0,
  background: "#1E1E1E",
  borderRadius: "8px",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
  minWidth: "120px",
  overflow: "hidden",
  zIndex: 999,
}}

              >
                <button
                  style={{
  width: "100%",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: "none",
  background: "transparent",
  color: "white",
  fontSize: "16px",
  fontFamily: "Poppins, sans-serif",
  cursor: "pointer",
  transition: "0.3s",
}}
                  onClick={() => {
                    signOut();
                    setShowDropdown(false);
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            style={{
  padding: "10px 24px",
  borderRadius: "36px",
  border: "3px solid #FFFFFF",
  background: "transparent",
  color: "white",
  fontFamily: "Poppins, sans-serif",
  fontSize: "18px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "0.3s",
  whiteSpace: "nowrap",
}}
            onClick={() => setShowLoginPopup(true)}
            onMouseEnter={(e) => (e.target.style.border = "3px solid #00A8FF")}
            onMouseLeave={(e) => (e.target.style.border = "3px solid #FFFFFF")}
          >
            Log in
          </button>
        )}
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onSignup={() => {
            setShowLoginPopup(false);
            setIsSignupOpen(true);
          }}
        />
      )}

      {/* Signup Popup */}
      {isSignupOpen && (
        <SignupPopup
          onClose={() => setIsSignupOpen(false)}
        />
      )}
    </header>
  );
}
