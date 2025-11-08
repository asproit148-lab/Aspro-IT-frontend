import React from "react";
import CourseHeader from "../components/courses/CourseHeader";
import CourseInfo from "../components/courses/CourseInfo";

export default function GenAI() {
  const courseData = {
    title: "Generative AI ",
    subtitle: "Mastery Bootcamp",
    chips: ["Prompt Engineering", "Multi-Agent Systems", "LangChain", "Automation Workflows", "Cloud Deployment"],
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
