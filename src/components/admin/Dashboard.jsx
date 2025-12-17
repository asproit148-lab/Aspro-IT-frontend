import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, Megaphone, Users } from "lucide-react";
import { totalCourse, totalEnrollments } from "../../api/course";
import { totalBanners } from "../../api/campaign";

// Define the mobile breakpoint
const mobileBreakpoint = 992;

// --- Extracted Style Constants for Readability ---

const headerContainerStyle = (isMobile) => ({
  padding: isMobile ? '0' : '0 0 0 4px',
});

const statsContainerStyle = (isMobile) => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
  marginTop: isMobile ? "40px" : "60px",
  gap: isMobile ? "20px" : "30px",
  boxSizing: 'border-box',
  padding: isMobile ? '0' : '0 4px',
});

const statCardWrapperStyle = (isMobile) => ({
  position: "relative",
  width: isMobile ? "100%" : `calc((100% - 60px) / 3)`,
  minWidth: isMobile ? 'auto' : '200px',
  height: isMobile ? "100px" : "124px",
  borderRadius: "20px",
  padding: "2px",
  background: "linear-gradient(180deg, #CB46DB 0%, #000000 25.96%, #000000 78.85%, #8A38F5 100%)",
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
      const [data, enrollmentData, bannersData] = await Promise.all([
        totalCourse(),
        totalEnrollments(),
        totalBanners(),
      ]);

      setTotalCourses(data.total || 0);
      setEnrollment(enrollmentData.total || 0);
      setBanners(bannersData?.data?.total || 0);
    } catch (err) {
      console.error("Error fetching dashboard details:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

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
        width: isMobile ? '100%' : 'calc(100% - 140px)',
        marginLeft: isMobile ? "0" : "30px",
        background: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        paddingTop: isMobile ? "80px" : "130px",
        paddingLeft: isMobile ? "20px" : "120px",
        paddingRight: "20px",
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