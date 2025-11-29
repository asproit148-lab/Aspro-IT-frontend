import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const desktopBreakpoint = 992; 

export default function CourseModule({ skills, modules, faqs }) {
    const [openModule, setOpenModule] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < desktopBreakpoint);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const basePadding = isMobile ? "4vw" : "6vw";
    const headerFontSize = isMobile ? "28px" : "36px";

    return (
        <div
            style={{
                width: "100%",
                backgroundColor: "#000",
                color: "#fff",
                minHeight: "100vh",
                fontFamily: "Poppins, sans-serif",
            }}
        >
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    paddingLeft: isMobile ? "20px" : "80px", 
                    gap: "72px",
                    height: "0px", 
                    backgroundColor: "#101010",
                    borderBottom: "2px solid",
                    borderImage: "linear-gradient(90deg, #CD41DA 0%, #9B9EE3 100%) 1",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                    fontSize: "20px",
                    color: "#FFFFFF",
                }}
            >
            </div>

            {/* Skills Section */}
            <div style={{ padding: `${isMobile ? "30px" : "60px"} ${basePadding}` }}> 
                <h2
                    style={{
                        fontSize: headerFontSize, 
                        fontWeight: 600,
                        marginTop: 0,
                        marginBottom: "24px",
                        color: "#FFFFFF",
                    }}
                >
                    Skills you’ll gain
                </h2>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: isMobile ? "12px" : "24px", 
                        maxWidth: isMobile ? "100%" : "595px", 
                    }}
                >
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid transparent",
                                background:
                                    "linear-gradient(#000, #000) padding-box, linear-gradient(180deg, #CB46DB 0%, #8A38F5 100%) border-box",
                                borderRadius: "36px",
                                padding: "6px 20px",
                            }}
                        >
                            <span style={{ fontSize: "14px", fontWeight: 400 }}>{skill}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modules Section */}
            <div
                style={{
                    padding: `${isMobile ? "20px" : "30px"} ${basePadding}`, 
                    minWidth: isMobile ? "auto" : "1000px", 
                    width: "100%",
                    boxSizing: "border-box",
                    margin: "0 auto",
                }}
            >
                <h2
                    style={{
                        fontSize: headerFontSize, 
                        fontWeight: 600,
                        color: "#FFFFFF",
                        marginBottom: 0,
                        marginTop: 0,
                    }}
                >
                    Course Syllabus
                </h2>
                <p
                    style={{
                        fontSize: "16px",
                        marginTop: "8px",
                        marginBottom: "12px",
                        color: "rgba(255,255,255,0.8)",
                    }}
                >
                    Prepare for a new career in the high-growth field of Python programming.
                </p>

                {modules.map((module, index) => (
                    <div
                        key={index}
                        style={{
                            borderBottom: "1px solid transparent",
                            borderImage: "linear-gradient(90deg, #CB46DB, #8A38F5) 1",
                            padding: "6px 0",
                        }}
                    >
                        <div
                            onClick={() => setOpenModule(openModule === index ? null : index)}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer",
                                transition: "0.3s",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: isMobile ? "20px" : "24px", 
                                    fontWeight: 700,
                                    color: "#FFFFFF",
                                }}
                            >
                                {module.module_name}
                            </h3>

                            <div
                                style={{
                                    width: isMobile ? "30px" : "36px", 
                                    height: isMobile ? "30px" : "36px", 
                                    borderRadius: "50%",
                                    background: "linear-gradient(180deg, #CB46DB 0%, #8A38F5 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 0 10px rgba(138, 56, 245, 0.5)",
                                }}
                            >
                                {openModule === index ? (
                                    <ChevronUp size={isMobile ? 18 : 20} color="#fff" />
                                ) : (
                                    <ChevronDown size={isMobile ? 18 : 20} color="#fff" />
                                )}
                            </div>
                        </div>

                        {openModule === index && (
                            <ul
                                style={{
                                    marginTop: "8px",
                                    marginLeft: isMobile ? "8px" : "16px", 
                                    paddingLeft: "8px",
                                    listStyleType: "disc",
                                }}
                            >
                                {(Array.isArray(module.module_description)
                                    ? module.module_description
                                    : module.module_description.split(" • ")
                                ).map((topic, tIndex) => (
                                    <li
                                        key={tIndex}
                                        style={{
                                            marginBottom: "4px",
                                            fontSize: "18px",
                                            color: "rgba(255,255,255,0.85)",
                                        }}
                                    >
                                        {topic}
                                    </li>
                                ))}

                            </ul>
                        )}
                    </div>
                ))}
            </div>

            {/* Reviews */}
            <div
                style={{
                    marginTop: "60px",
                    padding: `0 ${basePadding}`, 
                }}
            >
                {/* Heading */}
                <h2
                    style={{
                        fontWeight: 600,
                        fontSize: headerFontSize, 
                        lineHeight: "100%",
                        marginBottom: "30px",
                    }}
                >
                    Hear from Our Students
                </h2>

                {/* Review Boxes */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: isMobile ? "center" : "left", 
                        gap: isMobile ? "20px" : "40px", 
                        flexWrap: "wrap",
                    }}
                >
                    {/* Review 1 */}
                    <div
                        style={{
                            width: isMobile ? "100%" : "300px", 
                            maxWidth: "350px", 
                            minHeight: "240px",
                            background: "#101010",
                            borderRadius: "24px",
                            border: "3px solid transparent",
                            background:
                                "linear-gradient(#000, #000) padding-box, linear-gradient(180deg, #CB46DB 0%, #8A38F5 100%) border-box",
                            borderImageSlice: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "10px",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: isMobile ? "20px" : "50px", 
                                marginTop: "12px",
                                marginBottom: "0",
                                // Ensure full width usage on mobile
                                width: isMobile ? "100%" : "auto", 
                                justifyContent: isMobile ? "space-around" : "flex-start",
                                padding: isMobile ? "0 10px" : "0",
                            }}
                        >
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="Sneha Arora"
                                style={{
                                    width: "75px",
                                    height: "75px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                            <div style={{ textAlign: "left" }}>
                                <h3 style={{ fontWeight: 400, fontSize: "20px", margin: "0" }}>
                                    Sneha Arora
                                </h3>
                                <p style={{ fontWeight: 300, fontSize: "14px", margin: "4px 0 0" }}>
                                    Pune
                                </p>
                                <p style={{ fontWeight: 400, fontSize: "18px", color: "#FFD700", marginTop: "10px" }}>
                                    3.5 ⭐
                                </p>
                            </div>
                        </div>

                        <p
                            style={{
                                width: isMobile ? "95%" : "285px", 
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "1.4", 
                                color: "#FFFFFF",
                                opacity: 0.9,
                                textAlign: "center",
                                padding: "10px 0",
                            }}
                        >
                            "The Cybersecurity course at AsproIT gave me confidence to switch
                            careers into tech. The hands-on projects and supportive mentors made
                            all the difference."
                        </p>
                    </div>

                    {/* Review 2 */}
                    <div
                        style={{
                            width: isMobile ? "100%" : "300px", 
                            maxWidth: "350px", // Added max width for mobile constraint
                            minHeight: "240px",
                            background: "#101010",
                            borderRadius: "24px",
                            border: "3px solid transparent",
                            background:
                                "linear-gradient(#000, #000) padding-box, linear-gradient(180deg, #CB46DB 0%, #8A38F5 100%) border-box",
                            borderImageSlice: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "10px",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: isMobile ? "20px" : "50px", 
                                marginTop: "12px",
                                marginBottom: "0",
                                width: isMobile ? "100%" : "auto", 
                                justifyContent: isMobile ? "space-around" : "flex-start",
                                padding: isMobile ? "0 10px" : "0",
                            }}
                        >
                            <img
                                src="https://randomuser.me/api/portraits/men/46.jpg"
                                alt="Rahul Mehta"
                                style={{
                                    width: "75px",
                                    height: "75px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                            <div style={{ textAlign: "left" }}>
                                <h3 style={{ fontWeight: 400, fontSize: "20px", margin: "0" }}>
                                    Rahul Mehta
                                </h3>
                                <p style={{ fontWeight: 300, fontSize: "14px", margin: "4px 0 0" }}>
                                    Dubai
                                </p>
                                <p style={{ fontWeight: 400, fontSize: "18px", color: "#FFD700", margin: "10px" }}>
                                    4.5 ⭐
                                </p>
                            </div>
                        </div>
                        <p
                            style={{
                                width: isMobile ? "95%" : "285px", 
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "1.4", 
                                color: "#FFFFFF",
                                opacity: 0.9,
                                textAlign: "center",
                                padding: "10px 0",
                            }}
                        >
                            "The Python and AI course was amazing! The instructors simplified
                            complex topics, and I landed my first internship soon after completing
                            it."
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQs Section */}
            <div style={{ padding: `${isMobile ? "30px" : "50px"} ${basePadding}` }}> 
                <h2
                    style={{
                        fontSize: headerFontSize, 
                        fontWeight: 600,
                        letterSpacing: "2%",
                        color: "#FFFFFF",
                        marginBottom: "18px",
                        marginTop: 0,
                    }}
                >
                    Frequently asked questions
                </h2>

                <div
                    style={{
                        border: "1px solid #424242",
                        borderRadius: "36px",
                        paddingLeft: isMobile ? "10px" : "20px", 
                        paddingRight: isMobile ? "10px" : "20px", 
                        maxWidth: isMobile ? "100%" : "1000px", 
                    }}
                >
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <div
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    gap: "10px",
                                    padding: "18px 0",
                                }}
                            >
                                {openFaq === index ? <ChevronUp size={isMobile ? 20 : 24} /> : <ChevronDown size={isMobile ? 20 : 24} />}
                                <h4
                                    style={{
                                        fontSize: isMobile ? "16px" : "20px", 
                                        fontWeight: 600,
                                        margin: 0,
                                        color: "#FFFFFF",
                                    }}
                                >
                                    {faq.question}
                                </h4>
                            </div>

                            {openFaq === index && (
                                <p
                                    style={{
                                        margin: isMobile ? "4px 0 10px 24px" : "4px 0 10px 34px", 
                                        fontSize: "16px",
                                        color: "#d1d1d1",
                                    }}
                                >
                                    {faq.answer}
                                </p>
                            )}

                            {index !== faqs.length - 1 && (
                                <div
                                    style={{
                                        height: "1px",
                                        backgroundColor: "#424242",
                                        width: "100%",
                                    }}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}