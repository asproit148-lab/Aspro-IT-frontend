import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { courses } from "../components/courses/CourseData";
import { sendEnquiry } from "../api/email";

export default function Qualities() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [mode, setMode] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

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

  return (
    <section
      style={{
        width: "1268px",
        margin: "80px auto 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "60px",
        color: "white",
        fontFamily: "Poppins, sans-serif",
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "1268px",
          gap: "60px",
        }}
      >
        {/* Left Content */}
        <div
          style={{
            width: "622px",
            height: "440px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "64px",
            fontWeight: 600,
            lineHeight: "125%",
          }}
        >
          Ready to Transform Your Career with AsproIT?
        </div>

        {/* Right Form */}
        <div
          style={{
            width: "622px",
            height: "440px",
            borderRadius: "36px",
            background: "#6325B8",
            boxShadow: `
              0px 4px 8px 0px #00000040 inset,
              0px -4px 8px 0px #00000040 inset,
              -4px 0px 8px 0px #00000040 inset,
              4px 0px 8px 0px #00000040 inset
            `,
            padding: "5px 30px 0",
            marginBottom: "50px",
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "32px",
              fontWeight: 600,
              marginBottom: "10px",
              marginLeft: "28px",
            }}
          >
            Enroll Now & Kickstart Your Career
          </h3>

          {/* Inputs */}
          <div style={{ display: "flex", gap: "18px" }}>
            <input
              type="text"
              placeholder="Name:"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "257px",
                height: "45px",
                borderRadius: "18px",
                padding: "0 15px",
                border: "none",
                outline: "none",
              }}
            />

            <input
              type="email"
              placeholder="Email:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "263px",
                height: "45px",
                borderRadius: "18px",
                padding: "0 15px",
                border: "none",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <input
              type="tel"
              placeholder="Mobile No:"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{
                width: "257px",
                height: "45px",
                borderRadius: "18px",
                padding: "0 15px",
                border: "none",
                outline: "none",
              }}
            />

            {/* Course Dropdown */}
            <div style={{ position: "relative", width: "263px" }}>
              <div
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                style={{
                  width: "263px",
                  height: "45px",
                  borderRadius: "18px",
                  padding: "0 15px",
                  border: "2px solid",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
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
          <label style={{ fontWeight: 500, fontSize: "16px" }}>Mode of Training</label>

          <div style={{ display: "flex", gap: "20px" }}>
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
