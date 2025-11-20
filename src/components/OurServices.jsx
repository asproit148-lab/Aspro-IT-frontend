import React from "react";
import { motion } from "framer-motion";
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import service4 from "../assets/service4.jpg";
import service5 from "../assets/service5.jpg";

export default function OurServices() {
  return (
    <div className="w-full bg-[#0A0A0A] text-white font-poppins">

      {/* Hero Image */}
<div className="relative w-full h-[620px]">
  <img
    src={service1}
    alt="service hero"
    className="w-full h-full object-cover"
  />

  {/* Bottom Overlay Black Bar */}
  <div className="absolute bottom-0 left-0 w-full h-[60px] bg-[#0000009E] flex items-center justify-center">

    <span className="text-[38px] font-bold bg-gradient-to-b from-[#0745E4] to-[#9700AE] bg-clip-text text-transparent ">
      Learn IT
    </span>

    <span className="text-[32px] text-white font-semibold ml-3">
      with AsproIT Learning!"
    </span>

  </div>
</div>


      {/* Intro Section */}
      <div className="mt-[100px] px-[86px] grid grid-cols-2 gap-10">
        <p className="text-[20px] leading-[100%] font-inter text-black p-6 rounded-xl text-center">
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
          className="w-[495px] h-[350px] object-cover rounded-lg ml-auto mt-[10px]"
        />
      </div>

      {/* Section 1: IT & Support */}
      <div className="mt-[100px] px-[86px] grid grid-cols-2 gap-14 items-center">
        <img
          src={service3}
          alt="service3"
          className="w-[495px] h-[350px] object-cover rounded-xl"
        />

        <div className="text-center">
          <h2 className="text-[24px] font-semibold mb-4">IT and Support</h2>
          <p className="text-[20px] font-normal leading-[100%]">
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
      <div className="mt-[100px] px-[86px] grid grid-cols-2 gap-14 items-center">
        <div className="text-center">
          <h2 className="text-[24px] font-semibold mb-4">Development</h2>
          <p className="text-[20px] font-normal leading-[100%]">
            We continuously innovate to make online learning engaging and
            effective. Our development team designs and builds interactive
            e-learning modules, web applications, and tools that enhance both
            teaching and learning experiences.
            <br /><br />
            Using modern technologies and user-friendly designs, we create
            solutions that are easy to navigate, responsive, and accessible to
            learners everywhere. Our goal is to provide a digital learning
            environment that is both powerful and enjoyable.
          </p>
        </div>

        <img
          src={service4}
          alt="service4"
          className="w-[491px] h-[327px] object-cover rounded-xl ml-auto"
        />
      </div>

      {/* Section 3: Training */}
      <div className="mt-[100px] px-[86px] grid grid-cols-2 gap-14 items-center mb-[100px]">
        <img
          src={service5}
          alt="service5"
          className="w-[491px] h-[327px] object-cover rounded-xl"
        />

        <div className="text-center">
          <h2 className="text-[24px] font-semibold mb-4">Training</h2>
          <p className="text-[20px] font-normal leading-[100%]">
            Our training programs are designed to equip learners with in-demand
            IT and software skills through practical, hands-on learning. Each
            course is led by industry professionals who bring real-world
            knowledge into the classroom.
            <br /><br />
            We focus on skill-based training in areas such as programming, web
            development, software testing, and project management. With flexible
            learning options, personalized mentoring, and placement assistance,
            we help learners confidently take the next step in their careers.
          </p>
        </div>
      </div>
    </div>
  );
}
