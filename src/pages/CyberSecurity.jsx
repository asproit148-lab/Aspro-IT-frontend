import React from "react";
import CourseHeader from "../components/courses/CourseHeader";
import CourseInfo from "../components/courses/CourseInfo";

export default function CyberSecurity() {
  const courseData = {
    title: "Cyber Security",
    subtitle: "Mastery Bootcamp",
    chips: ["Threat Detection", "Incident Response", "SIEM", "Risk Management", "Ethical Hacking"],
    price: 2499,
    originalPrice: 3500,
    discount: "29% OFF",
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <CourseHeader />
      <CourseInfo course={courseData} />
    </div>
  );
}
