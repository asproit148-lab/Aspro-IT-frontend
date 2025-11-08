import React from "react";
import CourseHeader from "../components/courses/CourseHeader";
import CourseInfo from "../components/courses/CourseInfo";

export default function PythonProgramming() {
  const courseData = {
    title: "Python Programming",
    subtitle: "Mastery Bootcamp",
    chips: ["Data Structures & OOP", "Pandas & NumPy", "Automation & Scripting", "Visualization (Matplotlib)", "Real-World Projects"],
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
