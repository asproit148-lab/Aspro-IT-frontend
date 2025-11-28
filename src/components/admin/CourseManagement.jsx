import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
// Assuming this path is correct
import AddCourse from "../admin/AddCourse"; 
import { getAllCourses, deleteCourse } from "../../api/course";

// Define breakpoints
const largeBreakpoint = 1200; // For 3 columns to 2 columns
const tabletBreakpoint = 768; // For 2 columns to 1 column

export default function CourseManagement() {
    const [courses, setCourses] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editCourse, setEditCourse] = useState(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const isMobile = screenWidth < tabletBreakpoint;
    const isTablet = screenWidth < largeBreakpoint; // True for both mobile and tablet

    // Effect to track screen size for responsiveness
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await getAllCourses();
            // Note: Data structure mapping as per your original card usage
            setCourses(data.courses.map(c => ({
                ...c,
                _id: c._id,
                imageUrl: c.imageUrl,
                Course_title: c.Course_title,
                Course_cost: c.Course_cost,
                Course_type: c.Course_type,
            })) || []);
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
            fetchCourses(); // Re-fetch to update the list
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // Determine number of columns based on screen size
    let columns = 3;
    if (screenWidth < largeBreakpoint && screenWidth >= tabletBreakpoint) {
        columns = 2;
    } else if (screenWidth < tabletBreakpoint) {
        columns = 1;
    }

    return (
        <div
            style={{
                // ⬅️ CRUCIAL: Desktop left offset is 100px, Mobile is 0
                marginLeft: isMobile ? "0" : "30px",
                background: "black",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                // ⬅️ CRUCIAL: Adjust padding top based on header height
                paddingTop: isMobile ? "80px" : "140px",
                // ⬅️ CRUCIAL: General horizontal padding
                paddingLeft: isMobile ? "20px" : "120px",
                paddingRight: isMobile ? "20px" : "20px",
                paddingBottom: "100px",
                minHeight: "100vh",
                boxSizing: 'border-box',
                width: isMobile ? '100%' : 'calc(100% - 100px)',
            }}
        >
            {/* Heading */}
            <div style={{ padding: isMobile ? '0' : '0 0 0 24px' }}>
                <h1
                    style={{
                        fontWeight: 600,
                        // ⬅️ ADJUSTED: Smaller font size on mobile
                        fontSize: isMobile ? "28px" : "36px",
                        lineHeight: "100%",
                        color: "#FFFFFF",
                        // ⬅️ CRUCIAL: Remove fixed left margin on mobile
                        marginLeft: isMobile ? "0" : "0",
                        marginTop: 0,
                    }}
                >
                    Course Management
                </h1>
                <p
                    style={{
                        fontWeight: 400,
                        fontSize: isMobile ? "14px" : "16px",
                        lineHeight: "100%",
                        color: "#FFFFFF",
                        opacity: 0.9,
                        marginTop: isMobile ? "8px" : "12px",
                        // ⬅️ CRUCIAL: Remove fixed left margin on mobile
                        marginLeft: isMobile ? "0" : "0",
                    }}
                >
                    Create and manage your courses and offerings
                </p>
            </div>

            {/* Top Bar */}
            <div
                style={{
                    // ⬅️ CRUCIAL: Full width on mobile, 90% on desktop, adjust margins
                    width: isMobile ? "100%" : "100%",
                    height: isMobile ? "60px" : "72px",
                    marginTop: isMobile ? "30px" : "40px",
                    // ⬅️ CRUCIAL: Remove fixed left margin on mobile
                    marginLeft: isMobile ? "0" : "20px",
                    borderRadius: "10px",
                    background: "linear-gradient(90.19deg, #323232 0%, #0F0F0F 59.13%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: isMobile ? "0 15px" : "0 30px 4px 30px", // Adjusted padding for mobile
                    boxSizing: 'border-box',
                }}
            >
                <div>
                    <p style={{
                        fontSize: isMobile ? "16px" : "20px",
                        fontWeight: 400,
                        marginBottom: "2px",
                        lineHeight: isMobile ? '1' : 'auto'
                    }}>
                        Total Courses
                    </p>
                    <p
                        style={{
                            fontSize: isMobile ? "20px" : "24px",
                            fontWeight: 500,
                            marginTop: isMobile ? "2px" : "0",
                            marginBottom: isMobile ? "0" : "10px",
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
                        fontSize: isMobile ? "14px" : "16px",
                        borderRadius: "10px",
                        border: "none",
                        padding: isMobile ? "8px 10px" : "10px 14px", // Smaller padding on mobile
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                    }}
                >
                    <Plus size={isMobile ? 16 : 18} />
                    {isMobile ? "Add" : "Add Course"}
                </button>
            </div>

            {/* Course Cards */}
            <div
                style={{
                    width: isMobile ? "100%" : "90%",
                    display: "grid",
                    // ⬅️ CRUCIAL: Dynamic columns based on screen width
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: isMobile ? "20px" : "30px",
                    // ⬅️ CRUCIAL: Remove fixed left margin on mobile
                    marginLeft: isMobile ? "0" : "50px",
                    marginTop: isMobile ? "30px" : "50px",
                    marginBottom: "100px",
                    boxSizing: 'border-box',
                }}
            >
                {courses.map((course, index) => (
                    <div
                        key={course._id}
                        style={{
                            width: "100%", // ⬅️ Full width of the grid column
                            minHeight: isMobile ? "300px" : "350px", // Adjusted height for mobile
                            background: "#343434",
                            borderRadius: "20px",
                            padding: isMobile ? "15px" : "20px", // Reduced padding on mobile
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                            boxSizing: 'border-box',
                        }}
                    >
                        <img
                            src={course.imageUrl}
                            alt={course.Course_title}
                            style={{
                                width: "100%",
                                height: isMobile ? "140px" : "179px", // Reduced image height on mobile
                                borderRadius: "16px",
                                objectFit: "cover",
                            }}
                        />

                        <div style={{ flexGrow: 1, paddingTop: isMobile ? '8px' : '12px' }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: isMobile ? "16px" : "18px",
                                        fontWeight: 500,
                                        marginBottom: "5px",
                                        marginTop: 0,
                                    }}
                                >
                                    {course.Course_title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: isMobile ? "14px" : "16px",
                                        fontWeight: 500,
                                        color: "#FFFFFF",
                                        marginBottom: "5px",
                                        marginTop: 0,
                                    }}
                                >
                                    ₹{course.Course_cost}
                                </p>
                            </div>

                            <p
                                style={{
                                    fontSize: isMobile ? "12px" : "14px",
                                    color: "#CCCCCC",
                                    marginTop: "0px",
                                    marginBottom: "10px", // Reduced margin on mobile
                                }}
                            >
                                {course.Course_type} Course
                            </p>

                            {/* Status and Type Tags */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: isMobile ? "10px" : "15px", // Reduced margin on mobile
                                }}
                            >
                                {/* Active Status */}
                                <div
                                    style={{
                                        width: isMobile ? "50px" : "60px",
                                        height: isMobile ? "24px" : "28px",
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
                                            fontSize: isMobile ? "12px" : "14px",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        Active
                                    </span>
                                </div>

                                {/* Course Type Tag */}
                                <div
                                    style={{
                                        width: isMobile ? "70px" : "80px",
                                        height: isMobile ? "24px" : "28px",
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
                                            fontSize: isMobile ? "12px" : "14px",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {course.Course_type}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                width: "100%",
                                height: "1px",
                                background: "rgba(255,255,255,0.1)",
                                marginBottom: isMobile ? "10px" : "12px",
                            }}
                        ></div>

                        {/* Actions */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            {/* Edit Button */}
                            <button
                                onClick={() => handleEditCourse(course)}
                                style={{
                                    width: isMobile ? "75px" : "80px",
                                    height: isMobile ? "30px" : "34px",
                                    borderRadius: "10px",
                                    background: "#525252",
                                    color: "#E3E3E3",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "7px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: isMobile ? "12px" : "14px",
                                }}
                            >
                                <Edit3 size={isMobile ? 16 : 20} />
                                Edit
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDeleteCourse(course._id)}
                                style={{
                                    width: isMobile ? "75px" : "80px",
                                    height: isMobile ? "30px" : "34px",
                                    borderRadius: "10px",
                                    background: "#525252",
                                    color: "#E3E3E3",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "7px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: isMobile ? "12px" : "14px",
                                }}
                            >
                                <Trash2 size={isMobile ? 16 : 18} />
                                Delete
                            </button>
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
                        fetchCourses(); // Refetch to show changes immediately
                    }}
                    existingCourse={editCourse}
                />
            )}
        </div>
    );
}