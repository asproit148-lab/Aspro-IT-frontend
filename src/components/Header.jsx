import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginPopup from "../components/LoginPopup";
import {
  Home,
  BookOpen,
  Info,
  Phone,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Header() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const location = useLocation();
  const isHomePage =
    location.pathname === "/" || location.pathname === "/home";
  const textColor = isHomePage ? "#3D96E0" : "white";

  return (
    <header
      style={{
        position: "relative",
        width: "1440px",
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
          display: "flex",
          alignItems: "center",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: "21px",
            left: "86px",
          }}
        >
          <Link to="/">
            <img
              src="/src/assets/logo.png"
              alt="AsproIT Logo"
              style={{
                width: "221px",
                height: "63px",
                objectFit: "contain",
              }}
            />
          </Link>
        </div>

        {/* Search */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "358px",
            width: "250px",
            height: "25px",
            borderRadius: "36px",
            borderWidth: "3px",
            borderStyle: "solid",
            borderColor: "white",
            boxShadow: "0px 4px 10px 0px rgba(61, 150, 224, 0.5)",
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "white",
              outline: "none",
              fontSize: "16px",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Search color="white" size={18} />
        </div>

        {/* Nav */}
        <div
          style={{
            position: "absolute",
            top: "35px",
            display: "flex",
            gap: "15px",
            left: "677px",
          }}
        >
          {/* Home */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "103px",
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
                width: "147px",
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
                  width: "227px",
                  background: "#343434",
                  borderRadius: "8px",
                  boxShadow: "0px 1px 20px 0px rgba(61, 150, 224, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 100,
                }}
              >
                {[
                  { name: "Cyber Security", link: "/courses/cyber-security" },
                  { name: "Generative AI", link: "/courses/gen-ai" },
                  { name: "Data Analytics", link: "/courses/data-analytics" },
                  { name: "Blockchain Technology", link: "/courses/blockchain" },
                  { name: "Cloud Computing", link: "/courses/cloud-computing" },
                  { name: "DevOps", link: "/courses/devops" },
                  { name: "Full Stack Development", link: "/courses/fullstack-development" },
                  { name: "Python Programming", link: "/courses/python-programming" },
                ].map((course, index) => (
                  <Link
                    key={index}
                    to={course.link}
                    style={{
                      width: "227px",
                      height: "36px",
                      padding: "6px 18px",
                      borderRadius:
                        index === 0
                          ? "8px 8px 0 0"
                          : index === 7
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
                    {course.name}
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
            <div
              onClick={() => {
                setIsAboutOpen(!isAboutOpen);
                setIsCoursesOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "120px",
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
              <Info size={20} /> About{" "}
              {isAboutOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {isAboutOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "36px",
                  left: "0",
                  width: "138px",
                  background: "#343434",
                  borderRadius: "8px",
                  boxShadow: "0px 1px 20px 0px rgba(61, 150, 224, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 100,
                }}
              >
                {[
                  { name: "Blogs", link: "/blogs" },
                  { name: "Services", link: "/our-services" },
                  { name: "Insights", link: "/about-us" },
                ].map((item, index) => (
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
                          : index === 3
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
                ))}
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
              width: "128px",
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

        {/* Login Button */}
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
      </div>
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
    </header>
  );
}
