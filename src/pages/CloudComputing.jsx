import React from "react";
import CourseHeader from "../components/courses/CourseHeader";
import CourseInfo from "../components/courses/CourseInfo";

export default function CloudComputing() {
  const courseData = {
    title: "Cloud Computing",
    subtitle: "Mastery Bootcamp",
    chips: ["AWS & Azure", "Docker & Kubernetes", "DevOps Integration", "DevOps Integration", "Automation & Scaling"],
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
