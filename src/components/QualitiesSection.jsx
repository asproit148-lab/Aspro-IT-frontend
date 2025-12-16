// src/components/Qualities.jsx
import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getAllCourses } from "../api/course";
import { sendEnquiry } from "../api/email";

const desktopBreakpoint = "992px";

/* STYLED COMPONENTS */
const Section = styled.section`
  width: 100%;
  margin: 105px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  color: white;
  font-family: Poppins, sans-serif;

  @media(max-width:${desktopBreakpoint}) {
    width: 80%;
    margin-top: 70px;
    gap: 30px;
    padding: 0 20px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: auto;
  padding: 20px;
  justify-content: space-between;
  align-items: flex-start;
  width: 1200px;
  gap: 40px;

  @media(max-width:${desktopBreakpoint}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 30px;
  }
`;

const LeftText = styled.div`
  width: 622px;
  height: auto;
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 64px;
  font-weight: 600;
  margin-top: 60px;
  line-height: 125%;

  @media(max-width:${desktopBreakpoint}) {
    width: 100%;
    text-align: center;
    font-size: 36px;
    margin-bottom: 20px;
  }
`;

const FormCard = styled.div`
  width: 622px;
  max-width: 622px;
  height: auto;
  background: rgba(99, 37, 184, 0.85);
  border-radius: 36px;
  box-shadow: 0 0 18px #00000050 inset;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media(max-width:${desktopBreakpoint}) {
    width: 100%;
    max-width: 350px;
    height: auto;
    padding: 20px;
    margin-bottom: 0;
  }
`;

const FormTitle = styled.h3`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 2px;
  margin-left: 10px;
  text-align: left;

  @media(max-width:${desktopBreakpoint}) {
    text-align: center;
    margin-top: 0;
    margin-bottom: 0px;
    font-size: 20px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 18px;
  justify-content: center;

  @media(max-width:${desktopBreakpoint}) {
    flex-direction: column;
    gap: 20px;
    width: 90%;
  }
`;

const Input = styled.input`
  height: 45px;
  border-radius: 18px;
  padding: 0 15px;
  border: none;
  outline: none;
  font-size: 14px;
  width: ${({ full }) => (full ? "100%" : "257px")};

  @media(max-width:${desktopBreakpoint}) {
    width: 100%;
  }
`;

/* Dropdown */
const DropdownWrapper = styled.div`
  position: relative;
  width: 110%;

  @media(max-width:${desktopBreakpoint}) {
    width: 110%;
  }
`;

const DropdownButton = styled.div`
  height: 45px;
  border-radius: 18px;
  padding: 0 15px;
  border: 2px solid #A86AFF;
  background: rgba(160, 90, 255, 0.08);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: .3s;

  &:hover {
    box-shadow: 0 0 12px #A86AFF;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 52px;
  width: 100%;
  border-radius: 10px;
  background: rgba(32, 0, 64, 0.75);
  backdrop-filter: blur(10px);
  z-index: 30;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,0.15);

  &:last-child { border-bottom: none; }
  &:hover { background: rgba(166, 95, 255, 0.3); }
`;

const ModeRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const SubmitBtn = styled.button`
  width: 238px;
  height: 60px;
  border-radius: 36px;
  border: 3px solid #fff;
  background: transparent;
  color: white;
  font-size: 16px;
  font-weight: 500;
  align-self: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    width: 250px;
    height: 68px;
    font-size: 18px;
    border: 3px solid #A86AFF;
    box-shadow: 0 0 20px #494949;
  }
`;

export default function Qualities() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [mode, setMode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function close(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsCoursesOpen(false);
      }
    }
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 992);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    getAllCourses().then(res => setCourses(res?.courses || []))
      .catch(()=> setCourses([]));
  }, []);

  const [loading, setLoading] = useState(false);

const send = async () => {
  if (!name || !email || !mobile || !selectedCourse || !mode)
    return alert("Please fill all fields");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return alert("Invalid email format");

  if (!/^[0-9]{10}$/.test(mobile))
    return alert("Mobile number must be 10 digits");

  setLoading(true);

  try {
    const res = await sendEnquiry({
      name,
      email,
      phone_no: mobile,
      course_name: selectedCourse,
      Mode_of_training: mode,
    });

    console.log("📩 API Response:", res);

    if (res?.status === 200) {
      alert("🎉 Enquiry Sent Successfully!");
      setName("");
      setEmail("");
      setMobile("");
      setSelectedCourse("");
      setMode("");
    } else {
      alert("⚠ Server responded, but request failed");
    }

  } catch (error) {
    console.error("❌ ENQUIRY SEND ERROR:", error);
    alert("Something went wrong, please try again");
  }

  setLoading(false);
};

  return (
    <Section>
      <Wrapper>

        <LeftText>Ready to Transform Your Career with AsproIT?</LeftText>

        <FormCard>
          <FormTitle>Enroll Now & Kickstart Your Career</FormTitle>

          <Row>
            <Input placeholder="Name:" value={name} onChange={e=>setName(e.target.value)} />
            <Input placeholder="Email:" value={email} onChange={e=>setEmail(e.target.value)} />
          </Row>

          <Row>
            <Input full placeholder="Mobile No:" value={mobile} onChange={e=>setMobile(e.target.value)} />

            <DropdownWrapper ref={dropdownRef}>
              <DropdownButton onClick={()=>setIsCoursesOpen(!isCoursesOpen)}>
                {selectedCourse || "Select a course"} {isCoursesOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </DropdownButton>

              {isCoursesOpen && (
                <DropdownList>
                  {courses.map((c,i)=>(
                    <DropdownItem key={i} onClick={()=>{ setSelectedCourse(c.Course_title); setIsCoursesOpen(false); }}>
                      {c.Course_title}
                    </DropdownItem>
                  ))}
                </DropdownList>
              )}
            </DropdownWrapper>
          </Row>

          <label style={{textAlign:"center",fontSize: isMobile?"16px":"20px"}}>Mode of Training</label>
          <ModeRow>
            <label><input type="radio" name="mode" value="Online" checked={mode==="Online"} onChange={e=>setMode(e.target.value)} /> Online</label>
            <label><input type="radio" name="mode" value="Offline" checked={mode==="Offline"} onChange={e=>setMode(e.target.value)} /> Offline</label>
          </ModeRow>

          <SubmitBtn onClick={send} disabled={loading} style={{opacity:loading?0.7:1}}>
  {loading ? "Sending Enquiry..." : "Join Free Trial Class"}
</SubmitBtn>
        </FormCard>
      </Wrapper>
    </Section>
  );
}
