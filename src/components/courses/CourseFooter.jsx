import React, { useState, useEffect } from "react";
import Footer from "../Footer"; 
import { ChevronDown } from "lucide-react";

const mobileBreakpoint = 768;

export default function CourseFooter() {
    const [openIndex, setOpenIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const faqs = [
        {
            question: "What courses does AsproIT offer?",
            answer:
                "AsproIT offers a wide range of tech courses including Web Development, Python, Data Science, Cyber Security, and AI/ML programs.",
        },
        {
            question: "Are the courses beginner-friendly?",
            answer:
                "Yes! Our courses are designed for all skill levels — from absolute beginners to advanced learners.",
        },
        {
            question: "Do you provide certifications?",
            answer:
            "Yes, upon successful completion of a course, you’ll receive an industry-recognized certificate from AsproIT.",
        },
        {
            question: "Are the sessions live or recorded?",
            answer:
            "We provide both live sessions with expert mentors and access to recorded lessons for flexible learning.",
        },
        {
            question: "How can I enroll in a course?",
            answer:
            "You can enroll directly through our website by choosing your desired course and completing the payment process.",
        },
    ];

    return (
        <div style={{ backgroundColor: "#101010" }}>
            <Footer /> 

            {/* Line separator */}
            <div
                style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#FFFFFF40",
                    marginTop: "0",
                    marginBottom: isMobile ? "15px" : "20px", 
                }}
            ></div>

            {/* FAQ Section */}
            <div
                style={{
                    width: isMobile ? "90%" : "80%", 
                    marginLeft: isMobile ? "5%" : "80px", 
                    marginRight: isMobile ? "5%" : "auto", 
                    marginBottom: isMobile ? "30px" : "20px",
                    boxSizing: "border-box", 
                }}
            >
                <h2
                    style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: isMobile ? "28px" : "36px", 
                        color: "#FFFFFF",
                        marginBottom: "15px",
                        textAlign: "left",
                    }}
                >
                    Frequently Asked Questions
                </h2>

                <div>
                    {faqs.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: "10px",
                                cursor: "pointer",
                                padding: isMobile ? "5px 0" : "0", 
                            }}
                            onClick={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
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
                                        fontWeight: 500,
                                        fontSize: isMobile ? "18px" : "20px", 
                                        color: "#FFFFFF",
                                        lineHeight: isMobile ? "140%" : "100%", 
                                        margin: isMobile ? "5px 0" : "0",
                                    }}
                                >
                                    {item.question}
                                </p>
                                <ChevronDown
                                    size={isMobile ? 20 : 22} 
                                    color="#FFFFFF"
                                    style={{
                                        transform:
                                            openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s ease",
                                    }}
                                />
                            </div>

                            {openIndex === index && (
                                <p
                                    style={{
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        color: "#B0B0B0",
                                        marginTop: "10px",
                                        marginLeft: isMobile ? "0px" : "10px", 
                                        lineHeight: "140%", 
                                        textAlign: "left",
                                    }}
                                >
                                    {item.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}