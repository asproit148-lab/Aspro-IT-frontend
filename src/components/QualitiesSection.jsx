import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
// ⚠️ Note: I am keeping the original imports as requested to make no change in logic, 
// even though 'courses' should be dynamically fetched for better practice.
import { courses } from "../components/courses/CourseData"; 
import { sendEnquiry } from "../api/email";

const desktopBreakpoint = 992; 

export default function Qualities() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Existing state variables
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // --- Effect Hook for Responsiveness ---
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // --- Submit Handler (Logic Unchanged) ---
  const handleSubmit = async () => {
    // Empty field validation
    if (!name || !email || !mobile || !selectedCourse || !mode) {
      alert("Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Mobile must be exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    try {
      const data = {
        name,
        email,
        phone_no: mobile,
        course_name: selectedCourse,
        Mode_of_training: mode,
      };

      const res = await sendEnquiry(data);

      if (res.status === 200) {
        alert("Enquiry sent successfully!");
        setName("");
        setEmail("");
        setMobile("");
        setSelectedCourse("");
        setMode("");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };
  
  // --- Responsive Style Definitions ---

  const sectionStyle = {
    width: isMobile ? "80%" : "100%", 
    margin: isMobile ? "20px auto 0" : "40px auto 0", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: isMobile ? "30px" : "60px", 
    color: "white",
    fontFamily: "Poppins, sans-serif",
    padding: isMobile ? "0 20px" : "0", 
  };

  const contentWrapperStyle = {
    display: "flex",
    // Stack horizontally on desktop, vertically on mobile
    flexDirection: isMobile ? "column" : "row",
    justifyContent: isMobile ? "center" : "space-between",
    alignItems: isMobile ? "center" : "flex-start",
    width: isMobile ? "100%" : "1200px",
    maxWidth: "100%",
    gap: isMobile ? "30px" : "40px",
  };

  // Left Content (Heading)
  const leftContentStyle = {
    width: isMobile ? "100%" : "622px",
    height: isMobile ? "auto" : "440px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    // Smaller font size on mobile
    fontSize: isMobile ? "36px" : "64px",
    fontWeight: 600,
    lineHeight: "125%",
    marginBottom: isMobile ? "20px" : "0", 
  };

  // Right Form Container
  const rightFormStyle = {
    width: isMobile ? "100%" : "622px",
    // Constrain max width for centering on typical mobile screens
    maxWidth: isMobile ? "350px" : "622px", 
    height: isMobile ? "auto" : "440px",
    borderRadius: "36px",
    background: "#6325B8",
    boxShadow: `
      0px 4px 8px 0px #00000040 inset,
      0px -4px 8px 0px #00000040 inset,
      -4px 0px 8px 0px #00000040 inset,
      4px 0px 8px 0px #00000040 inset
    `,
    // Adjusted padding for mobile
    padding: isMobile ? "30px" : "5px 30px 0",
    marginBottom: isMobile ? "0" : "50px",
    marginTop: isMobile ? "0" : "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };
  
  // Form Heading
  const formHeadingStyle = {
    // Smaller font size on mobile
    fontSize: isMobile ? "24px" : "32px",
    fontWeight: 600,
    marginBottom: "10px",
    // Center alignment on mobile
    marginLeft: isMobile ? "0" : "28px", 
    textAlign: isMobile ? "center" : "left", 
  };

  // Input Row Container
  const inputRowStyle = {
    display: "flex",
    // Stack inputs vertically on mobile
    flexDirection: isMobile ? "column" : "row", 
    gap: isMobile ? "20px" : "18px",
    alignItems: "center",
    justifyContent: "center",
  };

  // Individual Input/Dropdown Style Base
  const inputBaseStyle = {
    height: "45px",
    borderRadius: "18px",
    padding: "0 15px",
    border: "none",
    outline: "none",
    // Use 100% width on mobile inputs
    width: isMobile ? "100%" : "auto", 
    flexGrow: isMobile ? 1 : 0,
  };
  
  // Specific Input Widths (will be overridden to 100% on mobile by inputBaseStyle)
  const nameInputStyle = { ...inputBaseStyle, width: isMobile ? "100%" : "257px" };
  const emailInputStyle = { ...inputBaseStyle, width: isMobile ? "100%" : "263px" };
  const mobileInputStyle = { ...inputBaseStyle, width: isMobile ? "100%" : "257px" };
  const courseDropdownStyle = { position: "relative", width: isMobile ? "100%" : "263px" };
  
  const courseDropdownToggleStyle = {
    width: "100%", // Ensures full width within its container
    height: "45px",
    borderRadius: "18px",
    padding: "0 15px",
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    fontSize: "14px",
  };


  return (
    <section style={sectionStyle}>
      <div style={contentWrapperStyle}>
        
        {/* Left Content (Heading) */}
        <div style={leftContentStyle}>
          Ready to Transform Your Career with AsproIT?
        </div>

        {/* Right Form */}
        <div style={rightFormStyle}>
          <h3 style={formHeadingStyle}>
            Enroll Now & Kickstart Your Career
          </h3>

          {/* Inputs - Row 1 */}
          <div style={inputRowStyle}>
            <input
              type="text"
              placeholder="Name:"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={nameInputStyle}
            />

            <input
              type="email"
              placeholder="Email:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={emailInputStyle}
            />
          </div>

          {/* Inputs - Row 2 */}
          <div style={inputRowStyle}>
            <input
              type="tel"
              placeholder="Mobile No:"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={mobileInputStyle}
            />

            {/* Course Dropdown */}
            <div style={courseDropdownStyle}>
              <div
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                style={courseDropdownToggleStyle}
              >
                {selectedCourse || "Select a course"}
                {isCoursesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              {isCoursesOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    width: "100%",
                    background: "#343434",
                    borderRadius: "8px",
                    zIndex: 100,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Using the imported 'courses' array (logic not changed) */}
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedCourse(course.title);
                        setIsCoursesOpen(false);
                      }}
                      style={{
                        padding: "10px 15px",
                        cursor: "pointer",
                        color: "white",
                        fontSize: "14px",
                        borderBottom:
                          index !== courses.length - 1 ? "1px solid #555" : "none",
                      }}
                    >
                      {course.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mode Selection */}
          <label 
            style={{ 
              fontWeight: 500, 
              fontSize: "16px",
              // Center the label text on mobile
              textAlign: isMobile ? "center" : "left", 
              marginTop: isMobile ? "10px" : "0", 
            }}
          >
            Mode of Training
          </label>

          <div 
            style={{ 
              display: "flex", 
              gap: "20px",
              // Center radio buttons horizontally on mobile
              justifyContent: "center", 
            }}
          >
            <label style={{ display: "flex", gap: "5px", fontSize: "18px" }}>
              <input
                type="radio"
                name="mode"
                value="Online"
                checked={mode === "Online"}
                onChange={(e) => setMode(e.target.value)}
              />
              Online
            </label>

            <label style={{ display: "flex", gap: "5px", fontSize: "18px" }}>
              <input
                type="radio"
                name="mode"
                value="Offline"
                checked={mode === "Offline"}
                onChange={(e) => setMode(e.target.value)}
              />
              Offline
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: "238px",
              height: "60px",
              borderRadius: "36px",
              border: "3px solid #FFFFFF",
              background: "transparent",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
              alignSelf: "center",
              transition: "all 0.3s ease", 
            }}
            onMouseEnter={(e) => {
              e.target.style.width = "250px";
              e.target.style.height = "68px";
              e.target.style.fontSize = "18px";
              e.target.style.padding = "22px 40px";
              e.target.style.border = "3px solid #A86AFF";
              e.target.style.boxShadow = "0px 0px 20px 0px #494949";
            }}
            onMouseLeave={(e) => {
              e.target.style.width = "238px";
              e.target.style.height = "60px";
              e.target.style.fontSize = "16px";
              e.target.style.padding = "18px 36px";
              e.target.style.border = "3px solid #FFFFFF";
              e.target.style.boxShadow = "none";
            }}
          >
            Join Free Trial Class
          </button>
        </div>
      </div>
    </section>
  );
}