import React, { useState, useEffect } from "react";
import logo from '../../assets/logo.png';
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    LogOut,
    BadgeIndianRupee,
    LayoutDashboard,
    Megaphone,
    BookOpen,
    Tag,
    NotebookPen,
    FileText,
    Briefcase,
    SquareUserRound,
    Menu, // Import Menu icon
} from "lucide-react";

const mobileBreakpoint = 992; 

export default function AdminHeader() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [hovered, setHovered] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    // State to control the mobile side navigation drawer visibility
    const [showMobileNav, setShowMobileNav] = useState(false); 

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < mobileBreakpoint;
            setIsMobile(mobile);
            // Close mobile nav if resized to desktop
            if (!mobile && showMobileNav) {
                setShowMobileNav(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [showMobileNav]);

    // Close mobile nav when navigating
    useEffect(() => {
        if (showMobileNav && isMobile) {
            setShowMobileNav(false);
        }
    }, [location.pathname, isMobile]);

    const navItems = [
        { label: "Dashboard", icon: <LayoutDashboard size={25} />, path: "/admin/dashboard" },
        { label: "Campaigns", icon: <Megaphone size={25} />, path: "/admin/campaigns" },
        { label: "Course Listings", icon: <BookOpen size={25} />, path: "/admin/course-management" },
        { label: "Coupons Management", icon: <Tag size={25} />, path: "/admin/coupon-management" },
        { label: "Blogs Management", icon: <NotebookPen size={25} />, path: "/admin/blog-management" },
        { label: "Payment Verification", icon: <BadgeIndianRupee size={25} />, path: "/admin/payment-verification"},
        { label: "Resources", icon: <FileText size={25} />, path: "/admin/resource-management"},
        { label: "Jobs and Internships", icon: <Briefcase size={25} />, path: "/admin/job-management"},
    ];

    const handleNavItemClick = (path) => {
        navigate(path);
        if (isMobile) {
            setShowMobileNav(false);
        }
    };

    return (
        <>
            {/* Top Header */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    // ⬅️ CRUCIAL: Desktop height 105px, Mobile height 60px
                    height: isMobile ? "60px" : "105px",
                    backgroundColor: "#000000",
                    zIndex: 1000,
                    boxShadow: "0px 4px 25px 0px #00508A",
                    // ⬅️ CRUCIAL: Use flex only on mobile for alignment, else rely on absolute positioning
                    display: isMobile ? 'flex' : 'block', 
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: isMobile ? '0 20px' : '0', 
                    boxSizing: 'border-box',
                }}
            >
                {/* Mobile Menu Icon (Hamburger) */}
                {isMobile && (
                    <Menu 
                        size={30} 
                        color="white" 
                        onClick={() => setShowMobileNav(!showMobileNav)} 
                        style={{ cursor: 'pointer', order: 1 }} 
                    />
                )}
                
                {/* Logo Section */}
                <div
                    style={{
                        // ⬅️ CRUCIAL: Use fixed absolute positioning for desktop
                        position: isMobile ? 'static' : 'absolute',
                        top: isMobile ? "10px" : "21px",
                        left: isMobile ? "0" : "105px", 
                        // Allow flexbox to center/position on mobile
                        margin: isMobile ? '0' : '0', 
                        order: isMobile ? 2 : 'unset',
                        
                        // If mobile, let flexbox handle vertical alignment within the 60px header
                        display: isMobile ? 'flex' : 'block',
                        alignItems: 'center',
                    }}
                >
                    {/* Link to dashboard/home is the correct practice here */}
                    <Link to="/admin/dashboard">
                        <img
                            src={logo}
                            alt="logo"
                            style={{
                                // ⬅️ CRUCIAL: Reduced logo size on mobile
                                width: isMobile ? "120px" : "221px",
                                height: isMobile ? "35px" : "63px",
                                objectFit: "contain",
                            }}
                        />
                    </Link>
                </div>

                {/* Right Section */}
                <div
                    style={{
                        // ⬅️ CRUCIAL: Use fixed absolute positioning for desktop
                        position: isMobile ? 'static' : 'absolute',
                        top: isMobile ? "10px" : "30px",
                        // ⬅️ CRUCIAL: Desktop right is 0, Mobile uses flex alignment
                        right: isMobile ? "0" : "0", 
                        display: "flex",
                        alignItems: "center",
                        gap: isMobile ? "15px" : "36px", 
                        order: isMobile ? 3 : 'unset',
                        // Added right padding on desktop to maintain space from the edge
                        paddingRight: isMobile ? '0' : '20px', 
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: isMobile ? "5px" : "8px",
                            position: "relative",
                            cursor: "pointer",
                        }}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <SquareUserRound size={isMobile ? 30 : 40} color="white" />
                        <span
                            style={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 300,
                                fontSize: isMobile ? "16px" : "24px",
                                color: "#FFFFFF",
                            }}
                        >
                            Admin
                        </span>

                        {/* Dropdown */}
                        {showDropdown && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: isMobile ? "40px" : "50px",
                                    // Dropdown should align to the right edge of the Admin container
                                    right: isMobile ? 0 : 0, 
                                    background: "#1E1E1E",
                                    borderRadius: "8px",
                                    boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                                    overflow: "hidden",
                                    width: "100px",
                                    zIndex: 999,
                                }}
                            >
                                <button
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "15px",
                                        background: "none",
                                        border: "none",
                                        color: "white",
                                        fontSize: "16px",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        width: "100%",
                                        boxSizing: 'border-box'
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent header click from closing dropdown immediately
                                        signOut();
                                        setShowDropdown(false);
                                    }}
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Left Sidebar (Desktop Fixed / Mobile Side Drawer) */}
            <div
                style={{
                    position: "fixed",
                    // ⬅️ CRUCIAL: Starts below the header
                    top: isMobile ? "60px" : "105px", 
                    
                    // ⬅️ CRUCIAL: Mobile slide-in/out logic for drawer, static 0 for desktop
                    left: 0, 
                    transform: isMobile 
                        ? `translateX(${showMobileNav ? 0 : -200}px)` 
                        : 'translateX(0)',
                    transition: 'transform 0.3s ease, width 0.3s ease',
                    
                    // ⬅️ CRUCIAL: Desktop width 100px, Mobile width 200px
                    width: isMobile ? "200px" : "100px",
                    height: isMobile ? "calc(100vh - 60px)" : "calc(100vh - 105px)",
                    
                    backgroundColor: "#000000",
                    // Desktop aligns center, Mobile aligns flex-start
                    alignItems: isMobile ? "flex-start" : "center", 
                    
                    display: 'flex', 
                    flexDirection: "column",
                    paddingTop: "40px",
                    paddingBottom: "60px",
                    gap: "8px",
                    borderRight: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0px 0px 15px rgba(61, 150, 224, 0.4)",
                    zIndex: 990, 
                    overflowY: "auto",
                    boxSizing: 'border-box',
                    scrollbarWidth: "thin",
                    scrollbarColor: "#25A2E1 rgba(255,255,255,0.1)",
                }}
            >
                {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <div
                            key={index}
                            onClick={() => handleNavItemClick(item.path)}
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                display: "flex",
                                flexDirection: isMobile ? "row" : "column", // Row for mobile drawer, column for desktop
                                alignItems: "center",
                                marginBottom: "30px",
                                cursor: "pointer",
                                color: isActive || hovered === index ? "#25A2E1" : "#FFFFFF",
                                transition: "all 0.3s ease",
                                width: '100%',
                                // Padding/margin for mobile drawer item alignment
                                padding: isMobile ? '10px 15px' : '0', 
                                boxSizing: 'border-box',
                                justifyContent: isMobile ? 'flex-start' : 'center',
                            }}
                        >
                            {/* Icon */}
                            {React.cloneElement(item.icon, {
                                size: isMobile ? 20 : 25,
                                color: isActive || hovered === index ? "#25A2E1" : "#FFFFFF",
                            })}

                            {/* Text Label */}
                            <p
                                style={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 400,
                                    // ⬅️ CRUCIAL: Larger font in drawer (14px), small under icon (10px)
                                    fontSize: isMobile ? "14px" : "10px", 
                                    textAlign: isMobile ? "left" : "center",
                                    marginBottom: 0,
                                    letterSpacing: "0.3px",
                                    
                                    // Alignment logic
                                    marginTop: isMobile ? '0' : '5px', // Below icon on desktop
                                    marginLeft: isMobile ? '10px' : '0', // Next to icon in drawer
                                }}
                            >
                                {item.label}
                            </p>
                        </div>
                    );
                })}
            </div>
            
            {/* Mobile Overlay when drawer is open */}
            {isMobile && showMobileNav && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 980,
                    }}
                    onClick={() => setShowMobileNav(false)}
                />
            )}
        </>
    );
}