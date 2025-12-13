import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import hybrid from '../../assets/hybrid.png';
import project from '../../assets/project.png';
import liveclass from '../../assets/liveclass.png';

const desktopBreakpoint = 992; 

export default function CourseInfo({ course }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < desktopBreakpoint);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const sectionStyle = {
        width: isMobile ? "95%" : "100%",
        minHeight: isMobile ? "auto" : "600px", 
        backgroundColor: "#000",
        fontFamily: "Poppins",
        color: "white",
        position: "relative",
        padding: isMobile ? "20px 0 40px 0" : "40px 40px 80px 20px", 
        boxSizing: "border-box",
    };

    // Centered Container
    const contentWrapperStyle = {
        width: "100%",
        padding: isMobile ? "0 15px" : "0 20px", 
        margin: "0 auto",
        display: "flex",
        flexDirection: isMobile ? "column" : "row", 
        gap: isMobile ? "30px" : "40px",
        alignItems: isMobile ? "center" : "flex-start", 
        maxWidth: "1200px", 
        position: "relative",
        zIndex: 2,
    };

    // LEFT CARD
    const leftCardStyle = {
        width: isMobile ? "100%" : "50%", 
        minHeight: isMobile ? "auto" : "570px", 
        borderRadius: "36px",
        padding: isMobile ? "20px" : "24px", 
        boxSizing: "border-box",
        background:
            "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
        boxShadow: "0px 4px 16px 0px #FFFFFF40",
        display: "flex",
        flexDirection: "column",
    };

    // RIGHT CARD
    const rightCardStyle = {
        width: isMobile ? "100%" : "50%", 
        minHeight: isMobile ? "auto" : "570px", 
        borderRadius: "36px",
        padding: isMobile ? "20px" : "28px", 
        boxSizing: "border-box",
        background:
            "radial-gradient(149.8% 402.76% at 29.27% 24.1%, #101010 11.88%, #595959 100%)",
        boxShadow: "0px 4px 16px 0px #FFFFFF40",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    };


    return (
        <div style={sectionStyle}>
            {/* Centered Container */}
            <div style={contentWrapperStyle}>
                
                {/* LEFT CARD */}
                <div style={leftCardStyle}>
                    
                    {/* Breadcrumbs */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#B272DEBF",
                            fontSize: isMobile ? "16px" : "20px", //  ADJUSTED FONT SIZE
                            marginBottom: isMobile ? "10px" : "14px", //  ADJUSTED MARGIN
                        }}
                    >
                        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                            <span style={{ fontWeight: 700, opacity: 0.9 }}>Home</span>
                        </Link>
                        <span style={{ opacity: 0.6 }}>{">"}</span>
                        <span style={{ fontWeight: 400 }}>{course.title}</span>
                    </div>

                    {/* Title */}
                    <div style={{ width: isMobile ? "100%" : "540px", marginTop: "6px", marginBottom: "18px" }}> 
                        <h1
                            style={{
                                margin: 0,
                                fontSize: isMobile ? "32px" : "48px", //  ADJUSTED FONT SIZE
                                fontWeight: 700,
                                lineHeight: "1.2", // Tightened line height on mobile
                                color: "#FFFFFF",
                            }}
                        >
                            {course.title}
                            <br />
                            {course.subtitle}
                        </h1>
                    </div>

                    {/* Chips */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginBottom: "18px",
                            width: isMobile ? "100%" : "460px", //  ADJUSTED WIDTH
                        }}
                    >
                        {[
                            "Hands-On Projects",
                            "Certification Included",
                            "Expert Mentorship",
                            "Real-World Projects",
                            "Career Support",
                        ].map((chip, index) => (
                            <div
                                key={index}
                                style={{
                                    borderRadius: "4px",
                                    padding: "8px 10px",
                                    background: "rgba(255,255,255,0.15)",
                                    color: "#FFFFFF",
                                    fontSize: "12px",
                                }}
                            >
                                {chip}
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: 1 }} />

                    {/* Pricing*/}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: isMobile ? "10px" : "20px", // ADJUSTED GAP
                            marginBottom: "14px",
                            flexWrap: "wrap", // Allow wrapping on small screens
                        }}
                    >
                        <div style={{ fontSize: isMobile ? "30px" : "48px", fontWeight: 600 }}>Price</div>
                        <div style={{ fontSize: isMobile ? "24px" : "32px", fontWeight: 600, color: "#0DA745" }}>
                            ₹{course.price}
                        </div>
                        <div
                            style={{
                                fontSize: isMobile ? "16px" : "20px", //  ADJUSTED FONT SIZE
                                color: "rgba(255,255,255,0.5)",
                                textDecoration: "line-through",
                            }}
                        >
                            ₹{course.originalPrice}
                        </div>
                        <div
                            style={{
                                // Pushed to the right on desktop, kept in flow on mobile
                                marginLeft: isMobile ? "0" : "auto", 
                                width: isMobile ? "64px" : "81px", 
                                height: "32px",
                                borderRadius: "8px",
                                background: "rgba(255,255,255,0.25)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: isMobile ? "12px" : "16px", 
                                fontWeight: 500,
                            }}
                        >
                            {course.discount}% OFF
                        </div>
                    </div>

                    {/* Button */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Link
                            to="/courses/enrollment"
                            state={{
                                course: course.title,
                                courseId: course._id,
                                price: course.price, 
                                originalPrice: course.originalPrice, 
                                discount: course.discount 
                            }}
                        >
                            <button
                                style={{
                                    minWidth: isMobile ? "100%" : "520px", //  ADJUSTED: 100% width on mobile
                                    width: isMobile ? "320px" : "auto", // Added full width fallback
                                    height: isMobile ? "50px" : "66px", //  ADJUSTED HEIGHT
                                    borderRadius: "8px",
                                    border: "1px solid #FFFFFF",
                                    background: "transparent",
                                    color: "#FFFFFF",
                                    fontSize: isMobile ? "20px" : "28px", // ADJUSTED FONT SIZE
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    // Adjusted hover styles to be less drastic on mobile
                                    if (!isMobile) {
                                        e.currentTarget.style.boxShadow = "0px 4px 16px 0px #FFFFFF40";
                                        e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                                        e.currentTarget.style.minWidth = "530px";
                                        e.currentTarget.style.height = "70px";
                                        e.currentTarget.style.fontSize = "30px";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.boxShadow = "none";
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.minWidth = "520px";
                                        e.currentTarget.style.height = "66px";
                                        e.currentTarget.style.fontSize = "28px";
                                    }
                                }}
                            >
                                Enroll Now
                            </button>
                        </Link>
                    </div>
                </div>

                {/* RIGHT CARD */}
                <div style={rightCardStyle}>
                    
                    {/* COURSE DETAILS Grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
                            rowGap: isMobile ? "16px" : "24px", 
                            columnGap: isMobile ? "20px" : "40px", 
                        }}
                    >
                        <div style={{ width: "100%", height: "auto" }}>
                            <div style={{ fontSize: isMobile ? "20px" : "28px", fontWeight: 400, color: "#fff" }}>
                                7 Course Series
                            </div>
                            <div
                                style={{
                                    marginTop: "4px",
                                    color: "rgba(255,255,255,0.6)",
                                    fontSize: "12px",
                                    lineHeight: 1.5,
                                }}
                            >
                                Achieve a certification that validates your knowledge and abilities
                            </div>
                        </div>

                        <div style={{ width: "100%", height: "auto" }}>
                            <div style={{ fontSize: isMobile ? "20px" : "28px", fontWeight: 400 }}>
                                Beginner Level
                            </div>
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "rgba(255,255,255,0.6)",
                                    marginTop: "4px",
                                }}
                            >
                                No prerequisite knowledge required
                            </div>
                        </div>

                        <div
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <div style={{ fontSize: isMobile ? "20px" : "28px", fontWeight: 400 }}>Rating 4.2</div>
                            <Star size={isMobile ? 20 : 24} color="#FFD24D" />
                        </div>

                        <div
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                        >
                            <div style={{ fontSize: isMobile ? "20px" : "28px", fontWeight: 400 }}>
                                Flexible Schedule
                            </div>
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "rgba(255,255,255,0.6)",
                                    marginTop: "4px",
                                }}
                            >
                                No fix schedule learn at your own pace
                            </div>
                        </div>
                    </div>

                    {/* Features Circles */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            marginTop: isMobile ? "20px" : "28px", //  ADJUSTED MARGIN
                            gap: isMobile ? "20px" : "0",
                        }}
                    >
                        {[
                            { img: hybrid, color: "#0DA745", label: "Hybrid Course" },
                            { img: project, color: "#5194FF", label: "Projects" },
                            { img: liveclass, color: "#FAAD4F", label: "Live Classes" },
                        ].map((circle) => (
                            <div
                                key={circle.label}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "8px",
                                    width: isMobile ? '30%' : 'auto', 
                                }}
                            >
                                <div
                                    style={{
                                        width: isMobile ? "60px" : "70px", //  ADJUSTED SIZE
                                        height: isMobile ? "60px" : "70px", //  ADJUSTED SIZE
                                        borderRadius: "50%",
                                        background: circle.color,
                                        boxShadow: `0px 1px 12px 0px ${circle.color}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        src={circle.img}
                                        alt={circle.label}
                                        style={{
                                            width: isMobile ? "30px" : "40px", //  ADJUSTED ICON SIZE
                                            height: isMobile ? "30px" : "40px", //  ADJUSTED ICON SIZE
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                                <div style={{ fontSize: isMobile ? "14px" : "16px" }}>{circle.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom info pills */}
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: isMobile ? "10px" : "16px", //  ADJUSTED GAP
                            marginTop: isMobile ? "20px" : "28px",
                        }}
                    >
                        {[
                            { k: "Language: ", v: "Bilingual" }, 
                            { k: "Schedule: ", v: "Mon - Sat (7:30)" },
                            { k: "Learning Hours: ", v: "200+ Hours" },
                            { k: "Certificate: ", v: "Yes" },
                        ].map((item) => (
                            <div
                                key={item.k}
                                style={{
                                    width: isMobile ? "100%" : "48%", 
                                    height: "48px",
                                    borderRadius: "8px",
                                    padding: "12px 16px",
                                    background: "rgba(255,255,255,0.25)",
                                    display: "flex",
                                    alignItems: "center",
                                    boxSizing: "border-box",
                                    gap: "6px",
                                }}
                            >
                                <div style={{ fontSize: "16px", fontWeight: 600 }}>
                                    {item.k}
                                </div>
                                <div style={{ fontSize: "16px", color: "#FAAD4F" }}>
                                    {item.v}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}