import React, { useState } from "react";
import { Plus, Edit3, TagIcon, Trash2 } from "lucide-react";
import AddCourse from "../admin/AddCourse";
import course1 from "../../assets/course1.png";
import course2 from "../../assets/course2.png";

export default function CourseManagement() {
  const [courses, setCourses] = useState([
    { image: course1, title: "Generative AI", cost: "2999", discount: "0", status: "active", type: "Live" },
    { image: course2, title: "Data Analytics", cost: "2499", discount: "10", status: "active", type: "Recorded" },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  // Add or Update Course
  const handleSaveCourse = (newCourse) => {
    if (editCourse) {
      // Update existing
      setCourses((prev) =>
        prev.map((course) =>
          course.title === editCourse.title ? { ...course, ...newCourse } : course
        )
      );
    } else {
      // Add new
      setCourses((prev) => [
        ...prev,
        {
          ...newCourse,
          image: newCourse.image || course1,
          status: "active",
        },
      ]);
    }

    setEditCourse(null);
    setShowPopup(false);
  };

  // Edit Course
  const handleEditCourse = (course) => {
    setEditCourse(course);
    setShowPopup(true);
  };

  // Delete Course
  const handleDeleteCourse = (title) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      setCourses((prev) => prev.filter((c) => c.title !== title));
    }
  };

  return (
    <div
      style={{
        left: "100px",
        background: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        paddingTop: "140px",
        paddingLeft: "120px",
        minHeight: "100vh",
      }}
    >
      {/* Heading */}
      <div>
        <h1
          style={{
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "100%",
            color: "#FFFFFF",
            marginLeft: "24px",
          }}
        >
          Course Management
        </h1>
        <p
          style={{
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "10%",
            color: "#FFFFFF",
            opacity: 0.9,
            marginTop: "4px",
            marginLeft: "24px",
          }}
        >
          Create and manage your courses and offerings
        </p>
      </div>

      {/* Top Bar */}
      <div
        style={{
          width: "1160px",
          height: "72px",
          marginTop: "40px",
          marginLeft: "20px",
          borderRadius: "10px",
          background: "linear-gradient(90.19deg, #323232 0%, #0F0F0F 59.13%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 32px",
        }}
      >
        <div>
          <p style={{ fontSize: "20px", fontWeight: 400, marginBottom: "2px" }}>
            Total Courses
          </p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 500,
              marginTop: "0",
              marginBottom: "10px",
            }}
          >
            {courses.length}
          </p>
        </div>

        <button
          onClick={() => {
            setEditCourse(null);
            setShowPopup(true);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#525252",
            color: "#FFFFFF",
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            padding: "10px 14px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          <Plus size={18} />
          Add Course
        </button>
      </div>

      {/* Course Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          marginLeft: "50px",
          marginTop: "50px",
          marginBottom: "100px",
          width: "fit-content",
        }}
      >
        {courses.map((course, index) => (
          <div
            key={index}
            style={{
              width: "340px",
              height: "350px",
              background: "#343434",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src={course.image}
              alt={course.title}
              style={{
                width: "345px",
                height: "179px",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    marginBottom: "5px",
                  }}
                >
                  {course.title}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    marginBottom: "5px",
                  }}
                >
                  ₹{course.cost}
                </p>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#CCCCCC",
                  marginTop: "0px",
                  marginBottom: "12px",
                }}
              >
                {course.type} Course
              </p>

              {/* Status & Type */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "28px",
                    borderRadius: "10px",
                    background:
                      course.status === "active" ? "#129551" : "#373D48",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#FFFFFF",
                    }}
                  >
                    {course.status === "active" ? "Active" : "Ended"}
                  </span>
                </div>

                <div
                  style={{
                    width: "80px",
                    height: "28px",
                    borderRadius: "10px",
                    background:
                      course.type === "Live" ? "#951212" : "#375B91",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#FFFFFF",
                    }}
                  >
                    {course.type}
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "rgba(255,255,255,0.1)",
                  marginBottom: "12px",
                }}
              ></div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleEditCourse(course)}
                    style={{
                      width: "80px",
                      height: "34px",
                      borderRadius: "10px",
                      background: "#525252",
                      color: "#E3E3E3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "7px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Edit3 size={20} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteCourse(course.title)}
                    style={{
                      width: "80px",
                      height: "34px",
                      borderRadius: "10px",
                      background: "#525252",
                      color: "#E3E3E3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "7px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {showPopup && (
        <AddCourse
          onClose={() => {
            setShowPopup(false);
            setEditCourse(null);
          }}
          onSave={handleSaveCourse}
          existingCourse={editCourse}
        />
      )}
    </div>
  );
}
