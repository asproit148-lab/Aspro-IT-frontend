import { BookOpen, Clock, MessageCircle, Briefcase, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LearningExperience() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const featureItems = [
    {
      icon: <BookOpen size={isMobile ? 32 : 36} color="white" />,
      label: "Courses",
      bg: "#8139E6",
      width: isMobile ? "100px" : "112px",
      onClick: () => {
        document.getElementById("live-learning")?.scrollIntoView({
          behavior: "smooth",
        });
      },
    },
    {
      icon: <Clock size={isMobile ? 32 : 36} color="white" />,
      label: "Self Material",
      bg: "#A539E6",
      width: isMobile ? "110px" : "129px",
      onClick: () => navigate("/resources"),
    },
    {
      icon: <MessageCircle size={isMobile ? 32 : 36} color="white" />,
      label: "Mock Interview",
      bg: "#E65C5C",
      width: isMobile ? "115px" : "135px",
      onClick: () => navigate("/mock-interview"),
    },
    {
      icon: <UserCheck size={isMobile ? 32 : 36} color="white" />,
      label: "Internship",
      bg: "#C539E6",
      width: isMobile ? "100px" : "112px",
      onClick: () => navigate("/internships"),
    },
    {
      icon: <Briefcase size={isMobile ? 32 : 36} color="white" />,
      label: "Jobs",
      bg: "#E63971",
      width: isMobile ? "85px" : "90px",
      onClick: () => navigate("/jobs"),
    },
  ];

  const sectionStyle = {
    position: "relative",
    width: isMobile ? "95%" : "100%", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // Ensure horizontal padding on mobile instead of margin
    margin: isMobile ? "30px 0" : "50px 0",
    padding: isMobile ? "0 15px" : "0 20px", 
    gap: isMobile ? "24px" : "30px",
  };

  const containerStyle = {
    maxWidth: isMobile ? "90%" : "850px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    textAlign: "center",
    position: "relative",
    opacity: 1,
  };

  const titleStyle = {
    margin: 0,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontSize: isMobile ? "32px" : "42px",
    lineHeight: isMobile ? "1.3" : "1.2",
  };

  const subtitleStyle = {
    margin: 0,
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: isMobile ? "15px" : "16px",
    lineHeight: "1.5",
    color: "grey",
  };

  // The main container for the cards
  const cardsContainerStyle = isMobile
    ? {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        width: "100%",
        maxWidth: "1000px",
      }
    : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
        flexWrap: "nowrap",
        width: "100%",
        maxWidth: "1000px",
      };

  // The style for the individual rows within the mobile container
  const rowStyle = {
    display: "flex",
    // Center items horizontally in the row
    justifyContent: "center", 
    alignItems: "center",
    gap: isMobile ? "20px" : "50px",
    width: "100%",
    // Ensure wrapping happens if needed (important for very small screens)
    flexWrap: "wrap", 
  };

  const cardStyle = (item) => ({
    // Adjusted min width to ensure 3 fit comfortably on standard mobile view
    minWidth: isMobile ? "90px" : "90px", 
    // Max width is defined by the item (but minWidth overrides if necessary)
    maxWidth: item.width,
    // Consistent height
    height: isMobile ? "110px" : "120px", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "35px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: isMobile ? "8px" : "8px", // Reduced padding slightly on mobile for better fit
  });

  const iconContainerStyle = (item) => ({
    width: isMobile ? "60px" : "70px",
    height: isMobile ? "60px" : "70px",
    borderRadius: "50%",
    background: item.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0px 4px 20px 2px ${item.bg}`,
    padding: isMobile ? "10px" : "12px",
  });

  const labelStyle = {
    color: "white",
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: isMobile ? "14px" : "16px",
    textAlign: "center",
    marginTop: "2px",
    lineHeight: isMobile ? "1.3" : "1.2",
  };

  const handleHover = (e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
  };

  const handleHoverOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section style={sectionStyle}>
      {/* Container */}
      <div style={containerStyle}>
        {/* Title */}
        <h2 style={titleStyle}>
          The Ultimate{" "}
          <span style={{ color: "#00A8FF", fontWeight: 900 }}>Learning </span>
          Experience
        </h2>

        {/* Subtitle */}
        <p style={subtitleStyle}>
          Beyond Learning: Your All-in-One Pathway to a New Career.
        </p>
      </div>

      {/* Feature Cards */}
      <div style={cardsContainerStyle}>
        {isMobile ? (
          <>
            {/* Row 1: 3 items (Courses, Self Material, Mock Interview) */}
            <div style={rowStyle}>
              {featureItems.slice(0, 3).map((item, index) => (
                <div
                  key={`mobile-row1-${index}`}
                  onClick={item.onClick}
                  style={cardStyle(item)}
                  // Only apply hover/mouse effects if not on mobile (better for touch)
                  onMouseEnter={!isMobile ? handleHover : undefined}
                  onMouseLeave={!isMobile ? handleHoverOut : undefined}
                >
                  <div style={iconContainerStyle(item)}>{item.icon}</div>
                  <span style={labelStyle}>{item.label}</span>
                </div>
              ))}
            </div>
            {/* Row 2: 2 items (Internship, Jobs) */}
            <div style={rowStyle}>
              {featureItems.slice(3, 5).map((item, index) => (
                <div
                  key={`mobile-row2-${index}`}
                  onClick={item.onClick}
                  style={cardStyle(item)}
                  onMouseEnter={!isMobile ? handleHover : undefined}
                  onMouseLeave={!isMobile ? handleHoverOut : undefined}
                >
                  <div style={iconContainerStyle(item)}>{item.icon}</div>
                  <span style={labelStyle}>{item.label}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Single row on desktop
          featureItems.map((item, index) => (
            <div
              key={`desktop-row-${index}`}
              onClick={item.onClick}
              style={cardStyle(item)}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverOut}
            >
              <div style={iconContainerStyle(item)}>{item.icon}</div>
              <span style={labelStyle}>{item.label}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}