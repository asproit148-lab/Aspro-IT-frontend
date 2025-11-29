import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import service4 from "../assets/service4.jpg";
import service5 from "../assets/service5.jpg";

const desktopBreakpoint = 992; 

export default function OurServices() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sectionPadding = {
    paddingLeft: isMobile ? "20px" : "86px",
    paddingRight: isMobile ? "20px" : "86px",
  };
  
  const contentSectionStyle = {
    marginTop: isMobile ? "60px" : "100px",
    marginBottom: isMobile ? "40px" : "100px",
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    alignItems: "center",
    gap: isMobile ? "30px" : "56px",
    ...sectionPadding,
  };
  
  const textStyle = {
    fontSize: isMobile ? "16px" : "20px", 
    lineHeight: isMobile ? "1.6" : "1.6", 
    color: "white",
    padding: isMobile ? "0" : "24px",
    textAlign: isMobile ? "left" : "center", // Align left on mobile
  };

  const headingStyle = {
    fontSize: isMobile ? "28px" : "48px", 
    fontWeight: "bold",
    background: "linear-gradient(to bottom, #0745E4, #9700AE)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    display: "block",
    textAlign: "center",
  };

  const subHeadingStyle = {
    fontSize: isMobile ? "24px" : "32px", 
    fontWeight: "600",
    marginLeft: isMobile ? "0" : "12px",
    color: "white",
    display: "block",
    textAlign: "center",
  };
  
  const sectionTitleStyle = {
    fontSize: isMobile ? "28px" : "36px", 
    fontWeight: "600",
    marginBottom: "16px",
    textAlign: isMobile ? "left" : "center",
  };
  
  const imageStyle = {
    width: "100%", 
    height: isMobile ? "250px" : "350px", 
    objectFit: "cover",
    borderRadius: "12px",
    margin: "0",
    order: isMobile ? 1 : 'unset',
  };


  return (
    <div style={{ 
      width: "100%", 
      maxWidth: "100%", 
      backgroundColor: "#0A0A0A", 
      color: "white", 
      fontFamily: "Poppins",
      overflowX: "hidden", 
      boxSizing: 'border-box', 
    }}>

      {/* Hero Image */}
      <div style={{ position: "relative", width: "100%", height: isMobile ? "300px" : "620px" }}>
        <img
          src={service1}
          alt="service hero"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: isMobile ? "100px" : "60px",
            backgroundColor: "#0000009E",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 10px", 
            boxSizing: 'border-box',
          }}
        >
            <span style={headingStyle}>
              Learn IT
            </span>
            <span style={subHeadingStyle}>
              with AsproIT Learning!
            </span>
        </div>
      </div>

      {/* Intro Section */}
      <div
        style={contentSectionStyle}
      >
        <p style={textStyle}>
          Welcome to our institute — where we turn ambition into achievement.
          <br /><br />
          We specialize in **IT Support**, **Software Development**, and **IT Services**
          training designed to help learners build real-world skills and launch
          successful tech careers. Whether you’re a beginner eager to step into
          IT or a professional looking to upskill, our structured training and
          placement-focused approach will guide you every step of the way.
          <br /><br />
          Our mission is simple — to equip you with **hands-on skills**, industry
          insights, and career confidence to excel in today’s competitive tech
          world.
        </p>

        <img
          src={service2}
          alt="service2"
          style={{
            ...imageStyle,
            order: isMobile ? 2 : 'unset', 
          }}
        />
      </div>

      <hr style={{ borderTop: '1px solid #333', margin: isMobile ? '40px 20px' : '80px 86px' }} />

      {/* Section 1: IT & Support - Responsive */}
      <div
        style={contentSectionStyle}
      >
        <img
          src={service3}
          alt="service3"
          style={imageStyle}
        />

        <div style={{ order: isMobile ? 2 : 'unset', textAlign: isMobile ? "left" : "center" }}>
          <h2 style={sectionTitleStyle}>
            IT and Support
          </h2>
          <p style={textStyle}>
            Our **IT & Support** team ensures a smooth and uninterrupted learning
            experience for all our users. From technical assistance to platform
            maintenance, we make sure our e-learning environment runs
            efficiently.
            <br /><br />
            Whether you need help accessing your courses, setting up accounts, or
            resolving software issues, our support experts are always available
            to guide you. We focus on providing quick solutions and a reliable
            learning platform so you can focus on your studies without any
            interruptions.
          </p>
        </div>
      </div>

      <hr style={{ borderTop: '1px solid #333', margin: isMobile ? '40px 20px' : '80px 86px' }} />

      {/* Section 2: Development - Responsive */}
      <div
        style={contentSectionStyle}
      >
        <div style={{ order: isMobile ? 2 : 'unset', textAlign: isMobile ? "left" : "center" }}>
          <h2 style={sectionTitleStyle}>Development</h2>
          <p style={textStyle}>
            We continuously innovate to make online learning engaging and effective. 
            Our **development** team designs and builds interactive e-learning modules, 
            web applications, and tools that enhance both teaching and learning experiences.
            <br /><br />
            Using modern technologies and user-friendly designs, we create solutions 
            that are easy to navigate, responsive, and accessible to learners everywhere. 
            Our goal is to provide a digital learning environment that is both powerful and enjoyable.
          </p>
        </div>

        <img
          src={service4}
          alt="service4"
          style={imageStyle}
        />
      </div>

      <hr style={{ borderTop: '1px solid #333', margin: isMobile ? '40px 20px' : '80px 86px' }} />

      {/* Section 3: Training - Responsive */}
      <div
        style={contentSectionStyle}
      >
        <img
          src={service5}
          alt="service5"
          style={imageStyle}
        />

        <div style={{ order: isMobile ? 2 : 'unset', textAlign: isMobile ? "left" : "center" }}>
          <h2 style={sectionTitleStyle}>Training</h2>
          <p style={textStyle}>
            Our **training programs** are designed to equip learners with in-demand 
            IT and software skills through practical, hands-on learning. Each 
            course is led by **industry professionals** who bring real-world knowledge into the classroom.
            <br /><br />
            We focus on skill-based training in areas such as programming, 
            web development, software testing, and project management. 
            With flexible learning options, personalized mentoring, and 
            placement assistance, we help learners confidently take the next step in their careers.
          </p>
        </div>
      </div>
      
    </div>
  );
}