import React,{useState,useEffect} from "react";
import { BookOpen, Megaphone, Users } from "lucide-react";
// Assuming these imports are correct based on the provided context
import { totalCourse,totalEnrollments } from "../../api/course"; 
import { totalBanners } from "../../api/campaign";

const mobileBreakpoint = 992; 

export default function Dashboard() {
    const [totalCourses, setTotalCourses] = useState(0);
    const [enrollment, setEnrollment] = useState(0);
    const [banners, setBanners] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Effect to track screen size for responsiveness
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchDetails = async () => {
        try {
            // Note: I'm keeping the original API calls as provided
            const data = await totalCourse();
            const enrollmentData = await totalEnrollments();
            const bannersData = await totalBanners();
            setEnrollment(enrollmentData.total || 0);
            setTotalCourses(data.total || 0);
            // Handling the nested property for bannersData as per the original code
            setBanners(bannersData.data.total || 0); 
        } catch (err) {
            console.error("Error fetching total courses:", err);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);
    
    const stats = [
        {
            label: "Active Courses",
            value: totalCourses,
            icon: <BookOpen size={22} color="#FFFFFF" />,
        },
        {
            label: "Active Campaigns",
            value: banners,
            icon: <Megaphone size={22} color="#FFFFFF" />,
        },
        {
            label: "Total Enrollment",
            value: enrollment,
            icon: <Users size={22} color="#FFFFFF" />,
        },
    ];

    return (
        <div
            style={{
                // ⬅️ CRUCIAL: Adjust left offset based on fixed sidebar presence
                marginLeft: isMobile ? "0" : "30px", 
                background: "black",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                // ⬅️ CRUCIAL: Adjust padding top based on header height (105px desktop / 60px mobile)
                paddingTop: isMobile ? "80px" : "140px", 
                // ⬅️ CRUCIAL: General horizontal padding for content on mobile
                padding: isMobile ? "80px 20px 20px 20px" : `140px 20px 20px ${isMobile ? '20px' : '120px'}`, 
                minHeight: "100vh", // Use 100vh to ensure it covers the screen
                boxSizing: 'border-box',
                width: isMobile ? '100%' : 'calc(100% - 100px)', // Full width on mobile, less sidebar width on desktop
            }}
        >
            {/* Heading */}
            <div style={{ padding: isMobile ? '0' : '0 0 0 24px' }}> {/* Adjust internal padding */}
                <h1
                    style={{
                        fontWeight: 600,
                        // ⬅️ ADJUSTED: Smaller font size on mobile
                        fontSize: isMobile ? "28px" : "36px", 
                        lineHeight: "100%",
                        color: "#FFFFFF",
                        // ⬅️ CRUCIAL: Remove fixed left margin on mobile, use container padding
                        marginLeft: isMobile ? "0" : "0", 
                        marginTop: 0,
                    }}
                >
                    Dashboard Overview
                </h1>
                <p
                    style={{
                        fontWeight: 400,
                        fontSize: isMobile ? "14px" : "16px",
                        lineHeight: "100%", // Adjusted line height for better spacing
                        color: "#FFFFFF",
                        opacity: 0.9,
                        marginTop: isMobile ? "8px" : "12px",
                        // ⬅️ CRUCIAL: Remove fixed left margin on mobile
                        marginLeft: isMobile ? "0" : "0", 
                    }}
                >
                    Welcome to AsproIT Admin Control Hub
                </p>
            </div>

            {/* Stats Boxes Container */}
            <div
                style={{
                    display: "flex",
                    // ⬅️ CRUCIAL: Stack vertically on mobile
                    flexDirection: isMobile ? "column" : "row", 
                    justifyContent: "flex-start", // Start alignment on both
                    alignItems: "flex-start", // Align items to the start
                    // ⬅️ CRUCIAL: Full width on mobile, limit width on desktop
                    width: isMobile ? "100%" : "90%", 
                    // ⬅️ CRUCIAL: Adjust margins based on screen size
                    marginTop: isMobile ? "40px" : "60px", 
                    marginLeft: isMobile ? "0" : "26px", // Keep original spacing structure for desktop
                    gap: isMobile ? "20px" : "30px", // Adjust gap for mobile stacking
                    boxSizing: 'border-box',
                }}
            >
                {stats.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            position: "relative",
                            // ⬅️ CRUCIAL: Full width on mobile, 30% width on desktop
                            width: isMobile ? "100%" : "30%", 
                            // ⬅️ ADJUSTED: Increased height slightly for better spacing on mobile
                            height: isMobile ? "100px" : "124px", 
                            borderRadius: "20px",
                            padding: "2px",
                            background:
                                "linear-gradient(180deg, #CB46DB 0%, #000000 25.96%, #000000 78.85%, #8A38F5 100%)",
                            boxSizing: 'border-box',
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "18px",
                                background: "#000000",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                // ⬅️ ADJUSTED: Reduced padding on mobile
                                padding: isMobile ? "15px 20px" : "20px 28px", 
                                boxSizing: "border-box",
                                backgroundClip: "padding-box",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "Poppins, sans-serif",
                                        fontSize: isMobile ? "14px" : "16px",
                                        fontWeight: 400,
                                        color: "#FFFFFF",
                                        margin: 0,
                                    }}
                                >
                                    {item.label}
                                </p>
                                {/* ⬅️ ADJUSTED: Reduced icon size on mobile */}
                                {React.cloneElement(item.icon, { size: isMobile ? 20 : 22 })}
                            </div>

                            <p
                                style={{
                                    fontFamily: "Poppins, sans-serif",
                                    // ⬅️ ADJUSTED: Reduced value font size on mobile
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
            {/* End of Stats Boxes */}
            
            {/* Add more dashboard content here */}
        </div>
    );
}