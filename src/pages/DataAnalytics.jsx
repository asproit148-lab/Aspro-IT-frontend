import React from "react";
import CourseHeader from "../components/courses/CourseHeader";
import CourseInfo from "../components/courses/CourseInfo";

export default function DataAnalytics() {
  const courseData = {
    title: "Data Analytics",
    subtitle: "Mastery Bootcamp",
    chips: ["Data Visualization", "Predictive Modeling", "Automation", "Business Intelligence", "SQL & Python"],
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
