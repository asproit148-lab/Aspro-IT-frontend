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
        position: "relative",
        width: "100%",
        height: "105px",
        backgroundColor: "black",
        top: 0,
        left: 0,
        zIndex: 50,
        boxShadow: "0px 4px 25px 0px #00508A",
      }}
    >
      <div
        style={{
    maxWidth: "1400px",
    margin: "0 auto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
  }}
      >
        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: "21px",
            left: "60px",
          }}
        >
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
            position: "absolute",
            top: "35px",
            display: "flex",
            gap: "40px",
            left: "400px",
          }}
        >
          {/* Home */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
              height: "36px",
              gap: "5px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 300,
              fontSize: "24px",
              lineHeight: "100%",
              textDecoration: "none",
              color: textColor,
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
    justifyContent: "center",
    width: "auto",
    height: "36px",
    gap: "5px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: "24px",
    lineHeight: "100%",
    textDecoration: "none",
    color: textColor,
    cursor: "pointer",
  }}
>
  Download{" "}
  {isDownloadOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
</div>


            {isDownloadOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "36px",
                  left: "0",
                  width: "auto",
                  background: "#343434",
                  borderRadius: "8px",
                  boxShadow: "0px 1px 20px 0px rgba(61, 150, 224, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 100,
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
                justifyContent: "center",
                width: "auto",
                height: "36px",
                gap: "5px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 300,
                fontSize: "24px",
                lineHeight: "100%",
                textDecoration: "none",
                color: textColor,
                cursor: "pointer",
              }}
            >
              <BookOpen size={20} /> Courses{" "}
              {isCoursesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {isCoursesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "36px",
                  left: "0",
                  width: "auto",
                  background: "#343434",
                  borderRadius: "8px",
                  boxShadow: "0px 1px 20px 0px rgba(61, 150, 224, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 100,
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
                justifyContent: "center",
                width: "auto",
                height: "36px",
                gap: "5px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 300,
                fontSize: "24px",
                lineHeight: "100%",
                textDecoration: "none",
                color: textColor,
                cursor: "pointer",
              }}
            >
              <Info size={20} />About{" "}
              {isAboutOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </Link>

            {isAboutOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "36px",
                  left: "0",
                  width: "auto",
                  background: "#343434",
                  borderRadius: "8px",
                  boxShadow: "0px 1px 20px 0px rgba(61, 150, 224, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 100,
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
              justifyContent: "center",
              width: "auto",
              height: "36px",
              gap: "5px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 300,
              fontSize: "24px",
              lineHeight: "100%",
              textDecoration: "none",
              color: textColor,
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
              position: "absolute",
              top: "30px",
              left: "1250px",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "3px solid #FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "0.3s",
            }}
            title="Profile"
          >
            <User size={24} color="white" />
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "56px",
                  left: "0",
                  background: "#1E1E1E",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                  overflow: "hidden",
                  width: "100px",
                  zIndex: 999,
                }}
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "15px",
                    background: "none",
                    border: "none",
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer",
                    textAlign: "center",
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
              position: "absolute",
              top: "29px",
              left: "1250px",
              width: "108px",
              height: "48px",
              borderRadius: "36px",
              border: "3px solid #FFFFFF",
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              background: "transparent",
              color: "white",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "0.3s",
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
