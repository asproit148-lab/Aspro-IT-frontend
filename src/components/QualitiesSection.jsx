import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getAllCourses } from "../api/course";
import { sendEnquiry } from "../api/email";

const desktopBreakpoint = 992;

export default function Qualities() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [mode, setMode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const dropdownRef = useRef(null);   // <--- REF ADDED

  // 🔥 CLOSE DROPDOWN WHEN CLICKED OUTSIDE
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsCoursesOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < desktopBreakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        setCourses(res?.courses || []);
      } catch (err) {
        console.error("Error loading courses:", err);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !mobile || !selectedCourse || !mode) {
      alert("Please fill all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Mobile number must be 10 digits");
      return;
    }

    try {
      const res = await sendEnquiry({
        name,
        email,
        phone_no: mobile,
        course_name: selectedCourse,
        Mode_of_training: mode,
      });

      if (res.status === 200) {
        alert("Enquiry sent successfully!");
        setName(""); setEmail(""); setMobile(""); setSelectedCourse(""); setMode("");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const sectionStyle = {
    width: isMobile ? "80%" : "100%",
    margin: isMobile ? "70px auto 0" : "105px auto 0",
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
    flexDirection: isMobile ? "column" : "row",
    justifyContent: isMobile ? "center" : "space-between",
    alignItems: isMobile ? "center" : "flex-start",
    width: isMobile ? "100%" : "1200px",
    gap: isMobile ? "30px" : "40px",
  };
  const leftContentStyle = {
    width: isMobile ? "100%" : "622px",
    height: isMobile ? "auto" : "440px",
    display: "flex", alignItems: "center", justifyContent: "center",
    textAlign: "center", fontSize: isMobile ? "36px" : "64px",
    fontWeight: 600, lineHeight: "125%", marginBottom: isMobile ? "20px" : "0",
  };
  const rightFormStyle = {
    width: isMobile ? "100%" : "622px", maxWidth: isMobile ? "350px" : "622px",
    height: isMobile ? "auto" : "440px",
    borderRadius: "36px", background: "#6325B8",
    boxShadow: "0px 4px 8px 0px #00000040 inset,0px -4px 8px 0px #00000040 inset,-4px 0px 8px 0px #00000040 inset,4px 0px 8px 0px #00000040 inset",
    padding: isMobile ? "30px" : "5px 30px 0",
    marginBottom: isMobile ? "0" : "50px", marginTop: isMobile ? "0" : "30px",
    display: "flex", flexDirection: "column", gap: "20px",
  };
  const formHeadingStyle = {
    fontSize: isMobile ? "24px" : "32px", fontWeight: 600, marginBottom: "10px",
    marginLeft: isMobile ? "0" : "28px", textAlign: isMobile ? "center" : "left"
  };
  const inputRowStyle = {
    display: "flex", flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "20px" : "18px", alignItems: "center", justifyContent: "center"
  };
  const inputBase = {
    height: "45px", borderRadius: "18px", padding: "0 15px",
    border: "none", outline: "none", width: isMobile ? "100%" : "auto"
  };
  const nameInp = { ...inputBase, width: isMobile ? "100%" : "257px" };
  const emailInp = { ...inputBase, width: isMobile ? "100%" : "263px" };
  const mobileInp = { ...inputBase, width: isMobile ? "100%" : "257px", marginRight:"0" };

  return (
    <section style={sectionStyle}>
      <div style={contentWrapperStyle}>
        
        {/* ---------- LEFT TEXT ---------- */}
        <div style={leftContentStyle}>
          Ready to Transform Your Career with AsproIT?
        </div>

        {/* ---------- FORM ---------- */}
        <div style={rightFormStyle}>

          <h3 style={formHeadingStyle}>Enroll Now & Kickstart Your Career</h3>

          <div style={inputRowStyle}>
            <input style={nameInp} placeholder="Name:" value={name} onChange={e=>setName(e.target.value)} />
            <input style={emailInp} placeholder="Email:" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>

          <div style={inputRowStyle}>
            <input style={mobileInp} placeholder="Mobile No:" value={mobile} onChange={e=>setMobile(e.target.value)} />

            {/* -------- DROPDOWN -------- */}
            <div style={{position:"relative",width:isMobile?"70%":"260px", marginRight: "30px"}} ref={dropdownRef}>
              <div
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                style={{
                  width:"100%",height:"45px",borderRadius:"18px",padding:"0 15px",
                  border:"2px solid",display:"flex",alignItems:"center",
                  justifyContent:"space-between",cursor:"pointer",fontSize:"14px"
                }}
              >
                {selectedCourse || "Select a course"}
                {isCoursesOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </div>

              {isCoursesOpen && (
                <div style={{
                  position:"absolute",top:"50px",background:"#343434",
                  width:"100%",borderRadius:"8px",zIndex:40,display:"flex",flexDirection:"column"
                }}>
                  {courses.map((course,i)=>(
                    <div key={i}
                      onClick={()=>{
                        setSelectedCourse(course.Course_title);
                        setIsCoursesOpen(false);
                      }}
                      style={{
                        padding:"10px 15px",fontSize:"14px",cursor:"pointer",color:"white",
                        borderBottom:i!==courses.length-1?"1px solid #555":"none"
                      }}
                    >
                      {course.Course_title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* -------- MODE RADIO -------- */}
          <label style={{fontSize:isMobile?"16px":"20px",textAlign:"center",marginTop:"10px"}}>Mode of Training</label>
          <div style={{display:"flex",gap:"20px",justifyContent:"center"}}>
            <label style={{display:"flex",gap:"5px",fontSize:"18px"}}>
              <input type="radio" name="mode" value="Online" checked={mode==="Online"} onChange={e=>setMode(e.target.value)} /> Online
            </label>
            <label style={{display:"flex",gap:"5px",fontSize:"18px"}}>
              <input type="radio" name="mode" value="Offline" checked={mode==="Offline"} onChange={e=>setMode(e.target.value)} /> Offline
            </label>
          </div>

          {/* -------- BUTTON -------- */}
          <button
            onClick={handleSubmit}
            style={{
              width:"238px",height:"60px",borderRadius:"36px",border:"3px solid #FFFFFF",
              background:"transparent",color:"#fff",fontSize:"16px",fontWeight:500,cursor:"pointer",
              alignSelf:"center",transition:"0.3s"
            }}
            onMouseEnter={e=>{e.target.style.width="250px";e.target.style.height="68px";e.target.style.fontSize="18px";e.target.style.border="3px solid #A86AFF";e.target.style.boxShadow="0 0 20px #494949";}}
            onMouseLeave={e=>{e.target.style.width="238px";e.target.style.height="60px";e.target.style.fontSize="16px";e.target.style.border="3px solid #fff";e.target.style.boxShadow="none";}}
          >
            Join Free Trial Class
          </button>
        </div>
      </div>
    </section>
  );
}
