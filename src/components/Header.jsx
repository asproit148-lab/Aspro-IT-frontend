// src/components/Header.jsx
import { useState, useEffect, useCallback } from "react";
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
  BookOpen,
  Info,
  Phone,
  ChevronDown,
  ChevronUp,
  Menu, // Hamburger
  X, // Close icon
  Download,
} from "lucide-react";

// --- Constants ---
const desktopBreakpoint = 1024; // Standard breakpoint for showing/hiding Hamburger
const textColor = "#3D96E0";

// --- Custom Hook to check screen size (for a cleaner approach) ---
const useIsMobile = (breakpoint) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};


// --- Component Start ---
export default function Header() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isMobile = useIsMobile(desktopBreakpoint);

  // Popups & dropdowns
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [courses, setCourses] = useState([]);

  // Fetch courses on mount
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

  // Close mobile menu and dropdowns when navigating or performing an action
  const handleLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsDownloadOpen(false);
    setIsCoursesOpen(false);
    setIsAboutOpen(false);
    setShowUserDropdown(false);
  }, []);

  // Handler for sign-out
  const handleSignOut = () => {
    signOut();
    handleLinkClick(); // Close all menus after sign out
  };

  // Handler for login button
  const handleLoginClick = () => {
    setShowLoginPopup(true);
    setIsMobileMenuOpen(false);
  };
  
  // Custom Link/Button style function for reusability
  const getNavItemStyle = (isMobile, isActive = false) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
    fontFamily: "Poppins, sans-serif",
    fontSize: isMobile ? "18px" : "20px",
    fontWeight: isMobile ? 500 : 400,
    color: isMobile ? (isActive ? textColor : "white") : textColor,
    cursor: "pointer",
    padding: isMobile ? "10px 15px" : "6px 0",
    transition: "0.3s",
    width: isMobile ? "100%" : "auto",
    justifyContent: isMobile ? "flex-start" : "flex-start",
    backgroundColor: "transparent",
    borderRadius: "0",
  });

  // Custom Dropdown Menu Container Style
  const getDropdownStyle = (isMobile) => ({
    position: isMobile ? "static" : "absolute",
    top: isMobile ? "0" : "40px",
    left: isMobile ? "0" : "0",
    background: isMobile ? "transparent" : "#212121",
    borderRadius: isMobile ? "0" : "8px",
    boxShadow: isMobile ? "none" : "0px 1px 20px rgba(61,150,224,0.5)",
    display: "flex",
    flexDirection: "column",
    minWidth: isMobile ? "100%" : "160px",
    zIndex: 999,
    padding: isMobile ? "0" : "0",
    marginTop: isMobile ? "5px" : "0",
  });

  // Custom Dropdown Item Style
  const getDropdownItemStyle = (isMobile, index, arrLength) => {
    // Determine border radius based on position in the dropdown array
    let borderRadius = "0";
    if (!isMobile) {
      if (index === 0) borderRadius = "8px 8px 0 0";
      else if (index === arrLength - 1) borderRadius = "0 0 8px 8px";
    }

    return {
      width: isMobile ? "calc(100% - 30px)" : "auto",
      height: "auto",
      padding: isMobile ? "8px 15px 8px 30px" : "5px 10px",
      background: isMobile ? "transparent" : "#343434",
      color: isMobile ? "#ccc" : "white",
      fontFamily: "Poppins, sans-serif",
      fontSize: "16px",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      cursor: "pointer",
      transition: "0.3s",
      borderRadius: borderRadius,
      "&:hover": {
        background: isMobile ? "#222" : "gray",
      },
    };
  };

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
          height: isMobile ? "70px" : "105px", // Mobile header height adjustment
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 20px" : "0 40px",
          flexWrap: "nowrap",
        }}
      >
        {/* Logo */}
        <div style={{ width: isMobile ? "120px" : "180px", height: "auto", objectFit: "contain" }}>
          <Link to="/" onClick={handleLinkClick}>
            <img
              src={logo}
              alt="logo"
              style={{
                width: isMobile ? "120px" : "221px",
                height: isMobile ? "auto" : "63px",
                objectFit: "contain",
              }}
            />
          </Link>
        </div>

        {/* Desktop Nav (Hidden on Mobile) */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              flexWrap: "nowrap",
            }}
          >
            {/* Home */}
            <Link to="/" style={getNavItemStyle(false, location.pathname === "/")}>
              <Home size={20} /> Home
            </Link>

            {/* Download Dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setIsDownloadOpen(true)}
              onMouseLeave={() => setIsDownloadOpen(false)}
            >
              <div style={getNavItemStyle(false)}>
                Download{" "}
                {isDownloadOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {isDownloadOpen && (
                <div style={getDropdownStyle(false)}>
                  {[
                    { name: "Resources", link: "/resources" },
                    { name: "Certificates", link: "/certificates" },
                  ].map((item, index, arr) => (
                    <Link
                      key={index}
                      to={item.link}
                      onClick={handleLinkClick}
                      style={{
                        ...getDropdownItemStyle(false, index, arr.length),
                        width: "138px", // Desktop specific width
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "gray")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#343434")}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Courses Dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setIsCoursesOpen(true)}
              onMouseLeave={() => setIsCoursesOpen(false)}
            >
              <div style={getNavItemStyle(false)}>
                <BookOpen size={20} /> Courses{" "}
                {isCoursesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {isCoursesOpen && (
                <div style={getDropdownStyle(false)}>
                  {courses
                    .filter((course) => course.Course_title)
                    .map((course, index, arr) => (
                      <Link
                        key={course._id}
                        to={`/courses/${course._id}`}
                        onClick={handleLinkClick}
                        style={{
                          ...getDropdownItemStyle(false, index, arr.length),
                          width: "227px", // Desktop specific width
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
              <div style={getNavItemStyle(false)}>
                <Info size={20} />About{" "}
                {isAboutOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {isAboutOpen && (
                <div style={getDropdownStyle(false)}>
                  {[
                    { name: "Blogs", link: "/blogs" },
                    { name: "Services", link: "/our-services" },
                  ].map((item, index, arr) => (
                    <Link
                      key={index}
                      to={item.link}
                      onClick={handleLinkClick}
                      style={{
                        ...getDropdownItemStyle(false, index, arr.length),
                        width: "138px", // Desktop specific width
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "gray")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#343434")}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact */}
            <Link to="/contact" style={getNavItemStyle(false, location.pathname === "/contact")}>
              <Phone size={20} /> Contact
            </Link>
          </div>
        )}

        {/* Desktop Login / User Icon (Hidden on Mobile) */}
        {!isMobile && (
          <div>
            {user ? (
              <div
                onClick={() => setShowUserDropdown(!showUserDropdown)}
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
                {showUserDropdown && (
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
                      onClick={handleSignOut}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#343434")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
                onClick={handleLoginClick}
                onMouseEnter={(e) => (e.target.style.border = "3px solid #00A8FF")}
                onMouseLeave={(e) => (e.target.style.border = "3px solid #FFFFFF")}
              >
                Log in
              </button>
            )}
          </div>
        )}

        {/* Mobile Hamburger Menu Icon (Shown on Mobile) */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center" }}>
             {/* Mobile User Icon */}
             {user && (
                <div
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "2px solid #FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        marginRight: "15px",
                        position: "relative",
                    }}
                    title="Profile"
                >
                    <User size={20} color="white" />
                    {showUserDropdown && (
                        <div
                            style={{
                                position: "absolute",
                                top: "50px",
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
                                    padding: "10px 14px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    border: "none",
                                    background: "transparent",
                                    color: "white",
                                    fontSize: "14px",
                                    fontFamily: "Poppins, sans-serif",
                                    cursor: "pointer",
                                }}
                                onClick={handleSignOut}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#343434")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                                <LogOut size={14} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "5px",
              }}
            >
              {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        )}

        {/* Mobile Menu Content (Conditionally rendered) */}
        {isMobile && isMobileMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: "70px", // Below the mobile header height
              left: 0,
              width: "100%",
              height: "calc(100vh - 70px)",
              backgroundColor: "#111111",
              zIndex: 90,
              display: "flex",
              flexDirection: "column",
              padding: "20px 0",
              overflowY: "auto",
              boxShadow: "0px 4px 25px 0px #00508A",
            }}
          >
            {/* Home */}
            <Link
              to="/"
              onClick={handleLinkClick}
              style={getNavItemStyle(true, location.pathname === "/")}
            >
              <Home size={20} /> Home
            </Link>

            {/* Download Dropdown (Mobile) */}
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setIsDownloadOpen(!isDownloadOpen)}
                style={getNavItemStyle(true, location.pathname.startsWith("/resources") || location.pathname.startsWith("/certificates"))}
              >
                <Download size={20} /> Download{" "}
                {isDownloadOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {isDownloadOpen && (
                <div style={getDropdownStyle(true)}>
                  {[
                    { name: "Resources", link: "/resources" },
                    { name: "Certificates", link: "/certificates" },
                  ].map((item, index, arr) => (
                    <Link
                      key={index}
                      to={item.link}
                      onClick={handleLinkClick}
                      style={getDropdownItemStyle(true, index, arr.length)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Courses Dropdown (Mobile) */}
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                style={getNavItemStyle(true, location.pathname.startsWith("/courses/"))}
              >
                <BookOpen size={20} /> Courses{" "}
                {isCoursesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {isCoursesOpen && (
                <div style={getDropdownStyle(true)}>
                  {courses
                    .filter((course) => course.Course_title)
                    .map((course, index, arr) => (
                      <Link
                        key={course._id}
                        to={`/courses/${course._id}`}
                        onClick={handleLinkClick}
                        style={getDropdownItemStyle(true, index, arr.length)}
                      >
                        {course.Course_title}
                      </Link>
                    ))}
                </div>
              )}
            </div>

            {/* About Dropdown (Mobile) */}
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                style={getNavItemStyle(true, location.pathname.startsWith("/about-us") || location.pathname.startsWith("/blogs") || location.pathname.startsWith("/our-services"))}
              >
                <Info size={20} /> About{" "}
                {isAboutOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {isAboutOpen && (
                <div style={getDropdownStyle(true)}>
                  {[
                    { name: "Blogs", link: "/blogs" },
                    { name: "Services", link: "/our-services" },
                  ].map((item, index, arr) => (
                    <Link
                      key={index}
                      to={item.link}
                      onClick={handleLinkClick}
                      style={getDropdownItemStyle(true, index, arr.length)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              onClick={handleLinkClick}
              style={getNavItemStyle(true, location.pathname === "/contact")}
            >
              <Phone size={20} /> Contact
            </Link>

            {/* Mobile Login Button */}
            {!user && (
              <button
                style={{
                  width: "20%",
                  padding: "10px 24px",
                  margin: "20px 20px 0 20px",
                  borderRadius: "36px",
                  border: "3px solid #00A8FF",
                  background: "transparent",
                  color: "#00A8FF",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onClick={handleLoginClick}
                onMouseEnter={(e) => (e.target.style.background = "rgba(0, 168, 255, 0.1)")}
                onMouseLeave={(e) => (e.target.style.background = "transparent")}
              >
                Log in
              </button>
            )}
          </div>
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
      {isSignupOpen && <SignupPopup onClose={() => setIsSignupOpen(false)} />}
    </header>
  );
}