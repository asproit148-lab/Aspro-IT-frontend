import React, { useState, useEffect, useRef } from "react";
import logo from '../../assets/logo.png';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    LogOut, BadgeIndianRupee, LayoutDashboard, Megaphone, BookOpen, Tag, 
    NotebookPen, FileText, Briefcase, SquareUserRound, Menu, X, Key
} from "lucide-react"; 

import ChangePasswordPopup from '../admin/ChangePassword.jsx'; 

const mobileBreakpoint = 992; 
const sidebarWidthDesktop = 120;
const sidebarWidthMobile = 260;

const baseColors = {
    primary: "#25A2E1",
    black: "#000000",
    darkGrey: "#1E1E1E",
    white: "#FFFFFF",
};

const HeaderStyle = (isMobile) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: isMobile ? "60px" : "105px",
    backgroundColor: baseColors.black,
    zIndex: 1000,
    boxShadow: "0px 4px 25px 0px #00508A",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0 20px' : '0 40px',
    boxSizing: 'border-box',
    ...(!isMobile && { display: 'block' }),
});

const LogoContainerStyle = (isMobile) => ({
    position: isMobile ? 'static' : 'absolute',
    top: isMobile ? "10px" : "21px",
    left: isMobile ? "0" : "40px",
    margin: 0, 
    order: isMobile ? 2 : 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: isMobile ? '100%' : 'auto',
});

const LogoImageStyle = (isMobile) => ({
    width: isMobile ? "130px" : "225px",
    height: isMobile ? "36px" : "60px",
    objectFit: "contain",
});

const ProfileContainerStyle = (isMobile) => ({
    position: isMobile ? 'static' : 'absolute',
    top: isMobile ? "10px" : "30px",
    right: isMobile ? "0" : "40px",
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "15px" : "36px", 
    order: isMobile ? 3 : 'unset',
});

const DropdownStyle = (isMobile) => ({
    position: "absolute",
    top: isMobile ? "45px" : "55px",
    right: isMobile ? '0' : '0', 
    background: baseColors.darkGrey,
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
    overflow: "hidden",
    width: "200px",
    zIndex: 999,
});

const DropdownButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: 'flex-start',
    gap: "10px",
    padding: "10px 15px",
    background: "none",
    border: "none",
    color: baseColors.white,
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
    boxSizing: 'border-box',
    transition: 'background-color 0.2s',
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    }
};

const SidebarStyle = (isMobile, showMobileNav) => ({
    position: "fixed",
    top: isMobile ? "60px" : "105px", 
    left: isMobile ? (showMobileNav ? "0" : `-${sidebarWidthMobile}px`) : "0", 
    transition: 'left 0.3s ease',
    
    width: isMobile ? `${sidebarWidthMobile}px` : `${sidebarWidthDesktop}px`,
    height: isMobile ? "calc(100vh - 60px)" : "calc(100vh - 105px)",
    
    backgroundColor: baseColors.black,
    alignItems: isMobile ? "flex-start" : "center", 
    display: 'flex', 
    flexDirection: "column",
    paddingTop: "40px",
    paddingBottom: "60px",
    gap: "8px",
    borderRight: `1px solid ${baseColors.primary}`,
    boxShadow: "0px 0px 15px rgba(61, 150, 224, 0.4)",
    zIndex: 990, 
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    scrollbarColor: `${baseColors.primary} ${baseColors.black}`,
    boxSizing: 'border-box',
});

const NavItemStyle = (isMobile, isActive, isHovered) => ({
    display: "flex",
    flexDirection: isMobile ? "row" : "column",
    alignItems: "center",
    marginBottom: isMobile ? "10px" : "30px",
    cursor: "pointer",
    color: isActive || isHovered ? baseColors.primary : baseColors.white,
    transition: "all 0.3s ease",
    width: isMobile ? `${sidebarWidthMobile}px` : `${sidebarWidthDesktop}px`,
    padding: isMobile ? '10px 15px' : '0', 
    boxSizing: 'border-box',
    justifyContent: isMobile ? 'flex-start' : 'center',
    backgroundColor: isActive ? 'rgba(37, 162, 225, 0.1)' : 'transparent',
    ...(isHovered && { backgroundColor: 'rgba(37, 162, 225, 0.05)' }),
});

const NavLabelStyle = (isMobile) => ({
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontSize: isMobile ? "14px" : "10px", 
    textAlign: isMobile ? "left" : "center",
    marginBottom: 0,
    letterSpacing: "0.3px",
    marginTop: isMobile ? '0' : '5px',
    marginLeft: isMobile ? '10px' : '0',
});

export default function AdminHeader() {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [hovered, setHovered] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false); 
    const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false); 
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < mobileBreakpoint;
            setIsMobile(mobile);
            if (!mobile && showMobileNav) {
                setShowMobileNav(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [showMobileNav]);

    // Effect to close mobile nav when navigating or screen size changes
    useEffect(() => {
        if (showMobileNav && isMobile) {
            setShowMobileNav(false);
        }
        // Close dropdown and popup on navigation
        setShowDropdown(false);
        setShowChangePasswordPopup(false); 

    }, [location.pathname]);

    // Effect to close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);


    const navItems = [
        { label: "Dashboard", icon: <LayoutDashboard />, path: "/admin/dashboard" },
        { label: "Campaigns", icon: <Megaphone />, path: "/admin/campaigns" },
        { label: "Course Listings", icon: <BookOpen />, path: "/admin/course-management" },
        { label: "Coupons", icon: <Tag />, path: "/admin/coupon-management" },
        { label: "Blogs", icon: <NotebookPen />, path: "/admin/blog-management" },
        { label: "Payment Verify", icon: <BadgeIndianRupee />, path: "/admin/payment-verification"},
        { label: "Resources", icon: <FileText />, path: "/admin/resource-management"},
        { label: "Practice Questions", icon: <FileText />, path: "/admin/practice-questions"},
        { label: "Opportunities", icon: <Briefcase />, path: "/admin/job-management"},
    ];

    const handleNavItemClick = (path) => {
        navigate(path);
        if (isMobile) {
            setShowMobileNav(false);
        }
    };

    const handleChangePassword = (e) => {
        e.stopPropagation();
        setShowChangePasswordPopup(true); 
        setShowDropdown(false);
    };

    return (
        <>
            {/* Top Header */}
            <div style={HeaderStyle(isMobile)}>
                
                {/* Mobile Menu Icon (Hamburger) */}
                {isMobile && (
                    <div style={{ order: 1 }}>
                        <Menu 
                            size={30} 
                            color={baseColors.white} 
                            onClick={() => setShowMobileNav(true)} 
                            style={{ cursor: 'pointer' }} 
                        />
                    </div>
                )}
                
                {/* Logo Section */}
                <div style={LogoContainerStyle(isMobile)}>
                    <Link to="/admin/dashboard">
                        <img
                            src={logo}
                            alt="Admin Logo"
                            style={LogoImageStyle(isMobile)}
                        />
                    </Link>
                </div>

                {/* Right Section - Profile/Logout */}
                <div style={ProfileContainerStyle(isMobile)} ref={dropdownRef}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: isMobile ? "5px" : "8px",
                            position: "relative",
                            cursor: "pointer",
                        }}
                        onClick={() => setShowDropdown(prev => !prev)}
                    >
                        <SquareUserRound size={isMobile ? 30 : 40} color={baseColors.white} />
                        <span
                            style={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 300,
                                fontSize: isMobile ? "16px" : "24px",
                                color: baseColors.white,
                            }}
                        >
                            Admin
                        </span>

                        {/* Dropdown */}
                        {showDropdown && (
                            <div style={DropdownStyle(isMobile)}>
                                <button
                                    style={{
                                        ...DropdownButtonStyle, 
                                        ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } 
                                    }}
                                    onClick={handleChangePassword}
                                >
                                    <Key size={16} />
                                    Change Password
                                </button>
                                <button
                                    style={{
                                        ...DropdownButtonStyle, 
                                        ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation(); 
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

            {/* Left Sidebar */}
            <div style={SidebarStyle(isMobile, showMobileNav)}>
                {/* Close Button for Mobile */}
                {isMobile && (
                    <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                        <X 
                            size={30} 
                            color={baseColors.white} 
                            onClick={() => setShowMobileNav(false)} 
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                )}
                
                {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    const isHovered = hovered === index;

                    return (
                        <div
                            key={index}
                            onClick={() => handleNavItemClick(item.path)}
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)}
                            style={NavItemStyle(isMobile, isActive, isHovered)}
                        >
                            {/* Icon */}
                            {React.cloneElement(item.icon, {
                                size: isMobile ? 20 : 25,
                                color: isActive || isHovered ? baseColors.primary : baseColors.white,
                            })}

                            {/* Text Label */}
                            <p style={NavLabelStyle(isMobile)}>
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
            {showChangePasswordPopup && (
                <ChangePasswordPopup 
                    onClose={() => setShowChangePasswordPopup(false)}
                />
            )}
        </>
    );
}