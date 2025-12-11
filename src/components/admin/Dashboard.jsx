import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, Megaphone, Users } from "lucide-react";
import { totalCourse, totalEnrollments } from "../../api/course"; 
import { totalBanners } from "../../api/campaign";

// Define the mobile breakpoint
const mobileBreakpoint = 992; 

// --- Extracted Style Constants for Readability ---

const containerBaseStyle = (isMobile) => ({
    background: "black",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    padding: isMobile ? "80px 20px 20px 20px" : `140px 40px 20px 120px`, // Simplified and consolidated padding
    minHeight: "100vh", 
    boxSizing: 'border-box',
    width: '100%',
});

const headerContainerStyle = (isMobile) => ({
    padding: isMobile ? '0' : '0 0 0 4px', // Reduced desktop left padding slightly
});

const statsContainerStyle = (isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : "row", 
    justifyContent: "flex-start", 
    alignItems: "flex-start", 
    width: isMobile ? "100%" : "100%", 
    marginTop: isMobile ? "40px" : "60px", 
    gap: isMobile ? "20px" : "30px", 
    boxSizing: 'border-box',
    padding: isMobile ? '0' : '0 4px', // Aligns with header padding
});

const statCardWrapperStyle = (isMobile) => ({
    position: "relative",
    // Use flex-basis for consistent sizing in the row layout
    width: isMobile ? "100%" : `calc((100% - 60px) / 3)`, // 3 cards, 2 gaps of 30px = 60px total gap
    minWidth: isMobile ? 'auto' : '200px', // Prevent too small on smaller screens
    height: isMobile ? "100px" : "124px", 
    borderRadius: "20px",
    padding: "2px",
    background:
        // Adjusted gradient to be defined once
        "linear-gradient(180deg, #CB46DB 0%, #000000 25.96%, #000000 78.85%, #8A38F5 100%)",
    boxSizing: 'border-box',
});

const statCardInnerStyle = (isMobile) => ({
    width: "100%",
    height: "100%",
    borderRadius: "18px",
    background: "#000000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: isMobile ? "15px 20px" : "20px 28px", 
    boxSizing: "border-box",
    backgroundClip: "padding-box",
    overflow: "hidden",
});

// --- Component Start ---

export default function Dashboard() {
    const [totalCourses, setTotalCourses] = useState(0);
    const [enrollment, setEnrollment] = useState(0);
    const [banners, setBanners] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Effect to track screen size for responsiveness
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Optimized Data Fetching: Using Promise.all for concurrency
    const fetchDetails = useCallback(async () => {
        setIsLoading(true);
        try {
            // Fetch all three pieces of data concurrently for faster loading
            const [data, enrollmentData, bannersData] = await Promise.all([
                totalCourse(),
                totalEnrollments(),
                totalBanners(),
            ]);

            setTotalCourses(data.total || 0);
            setEnrollment(enrollmentData.total || 0);
            // Added check for existence and structure on bannersData
            setBanners(bannersData?.data?.total || 0); 
            
        } catch (err) {
            console.error("Error fetching dashboard details:", err);
            // Optionally, set state to display an error message
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial data load effect
    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]); // Dependency on useCallback

    // Data structure for rendering stats
    const stats = [
        {
            label: "Active Courses",
            value: isLoading ? "..." : totalCourses,
            icon: <BookOpen color="#FFFFFF" />,
        },
        {
            label: "Active Campaigns",
            value: isLoading ? "..." : banners,
            icon: <Megaphone color="#FFFFFF" />,
        },
        {
            label: "Total Enrollment",
            value: isLoading ? "..." : enrollment,
            icon: <Users color="#FFFFFF" />,
        },
    ];

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
            }}
        >
            {/* Heading */}
            <div style={headerContainerStyle(isMobile)}> 
                <h1
                    style={{
                        fontWeight: 600,
                        fontSize: isMobile ? "28px" : "36px",
                        color: "#FFFFFF",
                        marginBottom: 0,
                        marginTop: 0,
                    }}
                >
                    Dashboard Overview
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
                    Welcome to AsproIT Admin Control Hub. Get a quick summary of your platform's metrics.
                </p>
            </div>

            {/* Stats Boxes Container */}
            <div style={statsContainerStyle(isMobile)}>
                {stats.map((item, index) => (
                    <div
                        key={index}
                        style={statCardWrapperStyle(isMobile)}
                    >
                        <div style={statCardInnerStyle(isMobile)}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: isMobile ? "14px" : "16px",
                                        fontWeight: 400,
                                        color: "#FFFFFF",
                                        margin: 0,
                                        opacity: 0.8,
                                    }}
                                >
                                    {item.label}
                                </p>
                                {/* Clone element to dynamically adjust size based on mobile state */}
                                {React.cloneElement(item.icon, { size: isMobile ? 20 : 22 })} 
                            </div>

                            <p
                                style={{
                                    fontSize: isMobile ? "28px" : "32px", 
                                    fontWeight: 600,
                                    color: "#FFFFFF",
                                    margin: 0,
                                }}
                            >
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>            
        </div>
    );
}