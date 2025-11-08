import React from "react";
import CourseHeader from "../components/courses/CourseHeader";
import CourseInfo from "../components/courses/CourseInfo";

export default function DevOps() {
  const courseData = {
    title: "DevOps",
    subtitle: "Mastery Bootcamp",
    chips: ["CI/CD Pipelines", "Docker & Kubernetes", "Automation", "Infrastructure as Code", "Monitoring & Security"],
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
