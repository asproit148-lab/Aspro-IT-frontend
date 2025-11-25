import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import AddCourse from "../admin/AddCourse";
import { getAllCourses, deleteCourse } from "../../api/course";

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data.courses || []);
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Edit
  const handleEditCourse = (course) => {  
    setEditCourse(course);
    setShowPopup(true);
  };

  // Delete from backend
  const handleDeleteCourse = async (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      await deleteCourse(courseId);
      fetchCourses();
    } catch (err) {
      console.error("Delete error:", err);
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
          paddingBottom: "4px",
          paddingLeft: "30px",
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
            key={course._id}
            style={{
              width: "340px",
              minHeight: "350px",
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
              src={course.imageUrl}
              alt={course.Course_title}
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
                  {course.Course_title}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    marginBottom: "5px",
                  }}
                >
                  ₹{course.Course_cost}
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
                {course.Course_type} Course
              </p>

              {/* Status (default active since backend doesn't send it) */}
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
                    background: "#129551",
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
                    Active
                  </span>
                </div>

                <div
                  style={{
                    width: "80px",
                    height: "28px",
                    borderRadius: "10px",
                    background:
                      course.Course_type === "Online" ? "#951212" : "#375B91",
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
                    {course.Course_type}
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
                  onClick={() => handleDeleteCourse(course._id)}
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
        ))}
      </div>

      {/* Popup */}
      {showPopup && (
        <AddCourse
  onClose={() => {
    setShowPopup(false);
    setEditCourse(null);
    fetchCourses();
  }}
  existingCourse={editCourse}
/>
      )}
    </div>
  );
}
