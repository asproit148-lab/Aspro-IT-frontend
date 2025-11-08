import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Search,
  Bell,
  LayoutDashboard,
  Megaphone,
  BookOpen,
  Tag,
  FileText,
  SquareUserRound,
} from "lucide-react";

export default function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={25} />, path: "/admin/dashboard" },
    { label: "Campaigns", icon: <Megaphone size={25} />, path: "/admin/campaigns" },
    { label: "Course Listings", icon: <BookOpen size={25} />, path: "/admin/course-management" },
    { label: "Coupons Management", icon: <Tag size={25} />, path: "/admin/coupon-management" },
    { label: "Blogs Management", icon: <FileText size={25} />, path: "/admin/blog-management" },
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
          <Link to="/">
            <img
              src="/src/assets/logo.png"
              alt="AsproIT Logo"
              style={{
                width: "221px",
                height: "63px",
                objectFit: "contain",
              }}
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "375px",
            width: "250px",
            height: "25px",
            borderRadius: "36px",
            borderWidth: "3px",
            borderStyle: "solid",
            borderColor: "white",
            boxShadow: "0px 4px 10px 0px rgba(61, 150, 224, 0.5)",
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "white",
              outline: "none",
              fontSize: "16px",
            }}
          />
          <Search color="white" size={18} />
        </div>

        {/* Right section */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            display: "flex",
            gap: "36px",
            left: "1200px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
          </div>
        </div>
      </div>

      {/* Left Sidebar (starts below top header) */}
      <div
        style={{
          position: "fixed",
          top: "105px",
          left: 0,
          width: "95px",
          height: "calc(100vh - 105px)",
          backgroundColor: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "50px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0px 0px 15px rgba(61, 150, 224, 0.4)",
          zIndex: 900,
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
            marginBottom: "35px",
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
              marginTop: "8px",
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
