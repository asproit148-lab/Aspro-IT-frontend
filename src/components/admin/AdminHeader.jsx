import React, { useState } from "react";
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
} from "lucide-react";

export default function AdminHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={25} />, path: "/admin/dashboard" },
    { label: "Campaigns", icon: <Megaphone size={25} />, path: "/admin/campaigns" },
    { label: "Course Listings", icon: <BookOpen size={25} />, path: "/admin/course-management" },
    { label: "Coupons Management", icon: <Tag size={25} />, path: "/admin/coupon-management" },
    { label: "Blogs Management", icon: <NotebookPen size={25} />, path: "/admin/blog-management" },
    { label: "Payment Verification", icon: <BadgeIndianRupee size={25} />, path: "/admin/payment-verification"},
    { label: "Resources", icon: <FileText size={25} />, path: "/admin/resource-management"},
    { label: "Jobs & Internships", icon: <Briefcase size={25} />, path: "/admin/job-management"},
  ];

  return (
    <>
      {/* Top Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "105px",
          backgroundColor: "#000000",
          zIndex: 1000,
          boxShadow: "0px 4px 25px 0px #00508A",
        }}
      >
        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: "21px",
            left: "105px",
          }}
        >
          <Link>
            <img
              src={logo}
              alt="logo"
              style={{
                width: "221px",
                height: "63px",
                objectFit: "contain",
              }}
            />
          </Link>
        </div>

        {/* Right Section */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            display: "flex",
            gap: "36px",
            left: "1200px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <SquareUserRound size={40} color="white" />
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 300,
                fontSize: "24px",
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
                  top: "50px",
                  right: 0,
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
                  }}
                  onClick={() => {
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
      <div
        style={{
          position: "fixed",
          top: "105px",
          left: 0,
          width: "100px",
          height: "calc(100vh - 105px)",
          backgroundColor: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "40px",
          paddingBottom: "60px",
          gap: "8px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0px 0px 15px rgba(61, 150, 224, 0.4)",
          zIndex: 900,
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#25A2E1 rgba(255,255,255,0.1)",
        }}
      >
        {navItems.map((item, index) => {
        const isActive = location.pathname === item.path;

      return (
        <div
          key={index}
          onClick={() => navigate(item.path)}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "30px",
            cursor: "pointer",
            color: isActive || hovered === index ? "#25A2E1" : "#FFFFFF",
            transition: "all 0.3s ease",
          }}
        >
          {React.cloneElement(item.icon, {
            color: isActive || hovered === index ? "#25A2E1" : "#FFFFFF",
          })}
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: "10px",
              textAlign: "center",
              marginTop: 0,
              marginBottom: 0,
              letterSpacing: "0.3px",
            }}
          >
            {item.label}
          </p>
        </div>
      );
    })}
      </div>
    </>
  );
}
