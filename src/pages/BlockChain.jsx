import React from "react";
import CourseHeader from "../components/courses/CourseHeader";
import CourseInfo from "../components/courses/CourseInfo";

export default function BlockChain() {
  const courseData = {
    title: "Blockchain",
    subtitle: "Mastery Bootcamp",
    chips: ["Smart Contracts", "Ethereum", "Consensus Mechanisms", "DeFi & NFTs", "Security"],
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
