import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import AddCourse from "../admin/AddCourse"; 
import { getAllCourses, deleteCourse } from "../../api/course";

// Define breakpoints
const largeBreakpoint = 1200; 
const tabletBreakpoint = 768; 

// Base styles for the component's main container
const mainContainerStyle = (isMobile) => ({
    background: "black",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    paddingTop: isMobile ? "80px" : "140px",
    paddingLeft: isMobile ? "20px" : "120px", // Pushed content from the left on desktop
    paddingRight: isMobile ? "20px" : "40px",
    paddingBottom: "100px",
    minHeight: "100vh",
    boxSizing: 'border-box',
    width: '100%', // Take full width
});

// Styles for the section heading/description
const headingSectionStyle = (isMobile) => ({
    padding: isMobile ? '0' : '0 0 0 4px', // Slight adjustment for alignment
});

// Styles for the Course Title
const courseTitleStyle = (isMobile) => ({
    fontSize: isMobile ? "16px" : "18px",
    fontWeight: 500,
    marginBottom: "5px",
    marginTop: 0,
    // Add truncation if necessary for long titles
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 'calc(100% - 70px)' // Reserve space for cost
});

// Styles for the action buttons (Edit/Delete)
const actionButtonStyle = (isMobile) => ({
    width: isMobile ? "75px" : "85px",
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
    transition: 'background 0.2s ease',
});


export default function CourseManagement() {
    const [courses, setCourses] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editCourse, setEditCourse] = useState(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const isMobile = screenWidth < tabletBreakpoint;
    // const isTablet = screenWidth < largeBreakpoint; // Not strictly needed for logic but kept for clarity

    // Determine number of columns based on screen size
    let columns = 3;
    if (screenWidth < largeBreakpoint && screenWidth >= tabletBreakpoint) {
        columns = 2;
    } else if (screenWidth < tabletBreakpoint) {
        columns = 1;
    }

    // Effect to track screen size for responsiveness
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchCourses = useCallback(async () => {
        try {
            const data = await getAllCourses();
            // Ensure data.courses is an array before mapping
            setCourses(data?.courses?.map(c => ({
                ...c,
                _id: c._id,
                imageUrl: c.imageUrl,
                Course_title: c.Course_title,
                Course_cost: c.Course_cost,
                Course_type: c.Course_type,
            })) || []);
        } catch (err) {
            console.error("Error loading courses:", err);
            // Optionally, show a user-facing error message
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // Edit Handler
    const handleEditCourse = (course) => {
        setEditCourse(course);
        setShowPopup(true);
    };

    // Delete Handler
    const handleDeleteCourse = async (courseId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course? This action cannot be undone."
        );
        if (!confirmDelete) return;

        try {
            await deleteCourse(courseId);
            // Optionally show a success notification here
            fetchCourses(); // Re-fetch to update the list
        } catch (err) {
            console.error("Delete error:", err);
            // Optionally, show a user-facing error message
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setEditCourse(null);
        fetchCourses(); // Refetch to show changes immediately
    }


    return (
        <div 
        style={{
                // Adjusted width to be based on the screen size, considering the sidebar area
                width: isMobile ? '100%' : 'calc(100% - 140px)', 
                marginLeft: isMobile ? "0" : "30px",
                background: "black",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                paddingTop: isMobile ? "80px" : "130px",
                paddingLeft: isMobile ? "20px" : "120px",
                paddingRight: isMobile ? "20px" : "20px",
                minHeight: "100vh",
                marginBottom: "50px",
                boxSizing: 'border-box',
                // Removed the fixed width from original for better centering/flexibility
            }}
            >
            {/* Heading */}
            <div style={headingSectionStyle(isMobile)}>
                <h1
                    style={{
                        fontWeight: 600,
                        fontSize: isMobile ? "28px" : "36px",
                        color: "#FFFFFF",
                        marginBottom: 0,
                        marginTop: 0,
                    }}
                >
                    Course Management
                </h1>
                <p
                    style={{
                        fontWeight: 400,
                        fontSize: isMobile ? "14px" : "16px",
                        color: "#FFFFFF",
                        opacity: 0.9,
                        marginTop: isMobile ? "8px" : "4px",
                    }}
                >
                    Create and manage your courses and offerings
                </p>
            </div>

            {/* Top Bar */}
            <div
                style={{
                    width: "100%", // Use 100% of parent container
                    maxWidth: isMobile ? '100%' : '1300px', // Set a max-width for cleaner look on desktop
                    height: isMobile ? "60px" : "72px",
                    marginTop: isMobile ? "30px" : "40px",
                    marginLeft: isMobile ? "0" : "20px",
                    borderRadius: "10px",
                    background: "linear-gradient(90.19deg, #323232 0%, #0F0F0F 59.13%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: isMobile ? "0 15px" : "0 30px 4px 30px",
                    boxSizing: 'border-box',
                }}
            >
                <div>
                    <p style={{
                        fontSize: isMobile ? "16px" : "20px",
                        fontWeight: 400,
                        marginBottom: "2px",
                        lineHeight: '1.2' // Improved line height
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
                        padding: isMobile ? "8px 12px" : "10px 16px", 
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        // Hover effect for better UX
                        ':hover': { background: '#666666' } 
                    }}
                >
                    <Plus size={isMobile ? 16 : 18} />
                    {isMobile ? "Add" : "Add Course"}
                </button>
            </div>

            {/* Course Cards */}
            <div
                style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: isMobile ? "20px" : "30px",
                    marginTop: isMobile ? "30px" : "50px",
                    boxSizing: 'border-box',
                    padding: isMobile ? '0' : '0 20px', // Center content slightly better
                }}
            >
                {courses.map((course) => (
                    <div
                        key={course._id}
                        style={{
                            width: "100%", 
                            minHeight: isMobile ? "300px" : "350px",
                            background: "#343434",
                            borderRadius: "20px",
                            padding: isMobile ? "15px" : "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                            boxSizing: 'border-box',
                        }}
                    >
                        {/* Image */}
                        <img
                            src={course.imageUrl}
                            alt={course.Course_title}
                            style={{
                                width: "100%",
                                height: isMobile ? "140px" : "179px", 
                                borderRadius: "16px",
                                objectFit: "cover",
                            }}
                        />

                        <div style={{ flexGrow: 1, paddingTop: isMobile ? '8px' : '12px' }}>
                            {/* Title & Cost */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: isMobile ? '5px' : '8px',
                                }}
                            >
                                <h3 style={courseTitleStyle(isMobile)}>
                                    {course.Course_title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: isMobile ? "14px" : "16px",
                                        fontWeight: 500,
                                        color: "#FFFFFF",
                                        marginTop: 0,
                                        marginBottom: 0,
                                        flexShrink: 0, // Prevent cost from shrinking
                                        textAlign: 'right'
                                    }}
                                >
                                    ₹{course.Course_cost}
                                </p>
                            </div>

                            {/* Type Description (Optional - used for more detail) */}
                            <p
                                style={{
                                    fontSize: isMobile ? "12px" : "14px",
                                    color: "#CCCCCC",
                                    marginTop: "0px",
                                    marginBottom: "10px", 
                                    opacity: 0.8
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
                                    marginBottom: isMobile ? "10px" : "15px",
                                }}
                            >
                                {/* Active Status Tag */}
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
                                        background: course.Course_type === "Online" ? "#951212" : "#375B91",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <span
                                        style={{
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

                        {/* Separator */}
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
                                style={actionButtonStyle(isMobile)}
                            >
                                <Edit3 size={isMobile ? 16 : 18} />
                                Edit
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDeleteCourse(course._id)}
                                style={actionButtonStyle(isMobile)}
                            >
                                <Trash2 size={isMobile ? 16 : 18} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {courses.length === 0 && (
                     <p style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.7, marginTop: '30px', fontSize: '18px' }}>
                        No courses found. Click "Add Course" to create one.
                    </p>
                )}
            </div>

            {/* Popup */}
            {showPopup && (
                <AddCourse
                    onClose={handlePopupClose}
                    existingCourse={editCourse}
                />
            )}
        </div>
    );
}