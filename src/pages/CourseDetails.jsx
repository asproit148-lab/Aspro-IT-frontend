import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseInfo from "../components/courses/CourseInfo";
import CourseHeader from "../components/courses/CourseHeader";
import CourseModule from "../components/courses/CourseModule";
import CourseFooter from "../components/courses/CourseFooter";
import { getCourseById } from "../api/course";

export default function CourseDetails() {
  const { courseSlug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await getCourseById(courseSlug);
        if (res.success) {
          const courseData = {
            _id: res.course._id,
            title: res.course.Course_title,
            subtitle: res.course.Course_description,
            price: res.course.Final_cost,
            originalPrice: res.course.Course_cost,
            discount: res.course.Discount,
            skills: res.course.Skills || [],
            modules: res.course.Modules || [],
            faqs: res.course.FAQs || [],
          };
          setCourse(courseData);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseSlug]);

  if (loading) {
    return (
      <div
        style={{
          color: "#fff",
          background: "#000",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h2>Loading course...</h2>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div
        style={{
          color: "#fff",
          background: "#000",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h2>{error || `Course not found for "${courseSlug}" 😢`}</h2>
      </div>
    );
  }

  return (
    <div>
      <CourseHeader />
      <CourseInfo course={course} />
      <CourseModule
        skills={course.skills}
        modules={course.modules}
        faqs={course.faqs}
      />
      <CourseFooter />
    </div>
  );
}
