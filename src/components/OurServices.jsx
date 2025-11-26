import React from "react";
import { motion } from "framer-motion";
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import service4 from "../assets/service4.jpg";
import service5 from "../assets/service5.jpg";

export default function OurServices() {
  return (
    <div style={{ width: "100%", backgroundColor: "#0A0A0A", color: "white", fontFamily: "Poppins" }}>

      {/* Hero Image */}
      <div style={{ position: "relative", width: "100%", height: "620px" }}>
        <img
          src={service1}
          alt="service hero"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Bottom Overlay Black Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "60px",
            backgroundColor: "#0000009E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "38px",
              fontWeight: "bold",
              background: "linear-gradient(to bottom, #0745E4, #9700AE)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Learn IT
          </span>

          <span style={{ fontSize: "32px", fontWeight: "600", marginLeft: "12px", color: "white" }}>
            with AsproIT Learning!
          </span>
        </div>
      </div>

      {/* Intro Section */}
      <div
        style={{
          marginTop: "100px",
          paddingLeft: "86px",
          paddingRight: "86px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            lineHeight: "100%",
            color: "white",
            padding: "24px",
            textAlign: "center",
          }}
        >
          Welcome to our institute — where we turn ambition into achievement.
          <br /><br />
          We specialize in IT Support, Software Development, and IT Services
          training designed to help learners build real-world skills and launch
          successful tech careers. Whether you’re a beginner eager to step into
          IT or a professional looking to upskill, our structured training and
          placement-focused approach will guide you every step of the way.
          <br /><br />
          Our mission is simple — to equip you with hands-on skills, industry
          insights, and career confidence to excel in today’s competitive tech
          world.
        </p>

        <img
          src={service2}
          alt="service2"
          style={{
            width: "495px",
            height: "350px",
            objectFit: "cover",
            borderRadius: "12px",
            marginLeft: "auto",
            marginTop: "10px",
          }}
        />
      </div>

      {/* Section 1: IT & Support */}
      <div
        style={{
          marginTop: "100px",
          paddingLeft: "86px",
          paddingRight: "86px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "56px",
        }}
      >
        <img
          src={service3}
          alt="service3"
          style={{
            width: "495px",
            height: "350px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>
            IT and Support
          </h2>
          <p style={{ fontSize: "20px", lineHeight: "100%" }}>
            Our IT & Support team ensures a smooth and uninterrupted learning
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

      {/* Section 2: Development */}
      <div
        style={{
          marginTop: "100px",
          paddingLeft: "86px",
          paddingRight: "86px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "56px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>Development</h2>
          <p style={{ fontSize: "20px", lineHeight: "100%" }}>
           We continuously innovate to make online learning engaging and effective. 
           Our development team designs and builds interactive e-learning modules, 
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
          style={{
            width: "491px",
            height: "327px",
            objectFit: "cover",
            borderRadius: "12px",
            marginLeft: "auto",
          }}
        />
      </div>

      {/* Section 3: Training */}
      <div
        style={{
          marginTop: "100px",
          marginBottom: "100px",
          paddingLeft: "86px",
          paddingRight: "86px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "56px",
        }}
      >
        <img
          src={service5}
          alt="service5"
          style={{
            width: "491px",
            height: "327px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>Training</h2>
          <p style={{ fontSize: "20px", lineHeight: "100%" }}>
            Our training programs are designed to equip learners with in-demand 
            IT and software skills through practical, hands-on learning. Each 
            course is led by industry professionals who bring real-world knowledge into the classroom.
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
