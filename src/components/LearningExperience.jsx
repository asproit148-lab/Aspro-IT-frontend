import { BookOpen, Clock, MessageCircle, Briefcase, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react"; // Added useMemo/useCallback

// Debounce utility remains outside (Perfect)
const debounce = (fn, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

// 🚩 OPTIMIZATION 1: Move static data OUTSIDE the component.
// This prevents the array from being redefined on every render.
const BASE_FEATURE_ITEMS = [
  {
    iconKey: BookOpen,
    label: "Courses",
    bg: "#8139E6",
    mobileWidth: "100px",
    desktopWidth: "112px",
    scrollTarget: "live-learning", // Use a unique property for scrolling
    path: null,
  },
  {
    iconKey: Clock,
    label: "Self Material",
    bg: "#A539E6",
    mobileWidth: "110px",
    desktopWidth: "129px",
    scrollTarget: null,
    path: "/resources",
  },
  {
    iconKey: MessageCircle,
    label: "Mock Interview",
    bg: "#E65C5C",
    mobileWidth: "115px",
    desktopWidth: "135px",
    scrollTarget: null,
    path: "/mock-interview",
  },
  {
    iconKey: UserCheck,
    label: "Internship",
    bg: "#C539E6",
    mobileWidth: "100px",
    desktopWidth: "112px",
    scrollTarget: null,
    path: "/internships",
  },
  {
    iconKey: Briefcase,
    label: "Jobs",
    bg: "#E63971",
    mobileWidth: "85px",
    desktopWidth: "90px",
    scrollTarget: null,
    path: "/jobs",
  },
];


export default function LearningExperience() {
  const navigate = useNavigate();
  
  // 🚩 OPTIMIZATION 2: Only store icon size in state/memo, not full mobile status.
  // This avoids recalculating all style objects on resize.
  const [iconSize, setIconSize] = useState(36); 
  const isMobileView = iconSize === 32; // Derive boolean from iconSize

  // 🚩 OPTIMIZATION 3: Memoize expensive style/logic calculations.
  const handleResize = useCallback(() => {
    const newSize = window.innerWidth < 768 ? 32 : 36;
    // Only update state if the value actually changes (32 -> 36 or 36 -> 32)
    setIconSize(prevSize => (prevSize !== newSize ? newSize : prevSize));
  }, []);


  useEffect(() => {
    // Initial check
    handleResize(); 
    
    // Optimization: Debounce the resize handler by 150ms
    const debouncedHandleResize = debounce(handleResize, 150); 
    
    window.addEventListener("resize", debouncedHandleResize);
    
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, [handleResize]);
  
  // 🚩 OPTIMIZATION 4: Memoize all constant style objects.
  // This ensures they are not recreated on every render, improving TBT/main thread work.
  // The only time these are recreated is when 'iconSize' changes (on breakpoint hit).

  const SectionStyle = useMemo(() => ({
    position: "relative",
    width: isMobileView ? "95%" : "100%", 
    display: "flex",
    top: isMobileView ? "70px" : "105px", 
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: isMobileView ? "30px 0" : "50px 0",
    padding: isMobileView ? "0 15px" : "0 20px", 
    gap: isMobileView ? "24px" : "30px",
  }), [isMobileView]);

  const ContainerStyle = useMemo(() => ({
    maxWidth: isMobileView ? "90%" : "850px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    textAlign: "center",
    position: "relative",
    opacity: 1,
  }), [isMobileView]);

  const TitleStyle = useMemo(() => ({
    margin: 0,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontSize: isMobileView ? "32px" : "42px",
    lineHeight: isMobileView ? "1.3" : "1.2",
  }), [isMobileView]);

  const SubtitleStyle = useMemo(() => ({
    margin: 0,
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: isMobileView ? "15px" : "16px",
    lineHeight: "1.5",
    color: "grey",
  }), [isMobileView]);

  // The main container for the cards
  const CardsContainerStyle = useMemo(() => isMobileView
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
      }, [isMobileView]);

  const RowStyle = useMemo(() => ({
    display: "flex",
    justifyContent: "center", 
    alignItems: "center",
    gap: isMobileView ? "20px" : "50px",
    width: "100%",
    flexWrap: "wrap", 
  }), [isMobileView]);

  // The two functions below cannot be memoized with useMemo/useCallback due to inline style calculation, 
  // but they only run when rendering the few cards. We keep them as functions but simplify the item properties.

  const getCardStyle = (item) => ({
    minWidth: "90px", 
    maxWidth: isMobileView ? item.mobileWidth : item.desktopWidth, // Use pre-calculated widths
    height: isMobileView ? "110px" : "120px", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "35px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: isMobileView ? "8px" : "8px", 
  });

  const getIconContainerStyle = (item) => ({
    width: isMobileView ? "60px" : "70px",
    height: isMobileView ? "60px" : "70px",
    borderRadius: "50%",
    background: item.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0px 4px 20px 2px ${item.bg}`,
    padding: isMobileView ? "10px" : "12px",
  });

  const LabelStyle = useMemo(() => ({
    color: "white",
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: isMobileView ? "14px" : "16px",
    textAlign: "center",
    marginTop: "2px",
    lineHeight: isMobileView ? "1.3" : "1.2",
  }), [isMobileView]);

  // Use useCallback to prevent these functions from being recreated on every render
  const handleHover = useCallback((e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
  }, []);

  const handleHoverOut = useCallback((e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  }, []);
  
  // 🚩 OPTIMIZATION 5: Centralized click handler using item properties.
  const handleItemClick = useCallback((item) => {
    if (item.scrollTarget) {
      document.getElementById(item.scrollTarget)?.scrollIntoView({
        behavior: "smooth",
      });
    } else if (item.path) {
      navigate(item.path);
    }
  }, [navigate]);


  return (
    <section style={SectionStyle}>
      {/* Container */}
      <div style={ContainerStyle}>
        {/* Title */}
        <h2 style={TitleStyle}>
          The Ultimate{" "}
          <span style={{ color: "#00A8FF", fontWeight: 900 }}>Learning </span>
          Experience
        </h2>

        {/* Subtitle */}
        <p style={SubtitleStyle}>
          Beyond Learning: Your All-in-One Pathway to a New Career.
        </p>
      </div>

      {/* Feature Cards */}
      <div style={CardsContainerStyle}>
        {isMobileView ? (
          <>
            {/* Row 1: 3 items (Courses, Self Material, Mock Interview) */}
            <div style={RowStyle}>
              {BASE_FEATURE_ITEMS.slice(0, 3).map((item, index) => {
                const IconComponent = item.iconKey;
                return (
                  <div
                    key={`mobile-row1-${index}`}
                    onClick={() => handleItemClick(item)}
                    style={getCardStyle(item)}
                    role="button" 
                    tabIndex="0" 
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverOut}
                  >
                    <div style={getIconContainerStyle(item)}>
                      <IconComponent size={iconSize} color="white" />
                    </div>
                    <span style={LabelStyle}>{item.label}</span>
                  </div>
                );
              })}
            </div>
            {/* Row 2: 2 items (Internship, Jobs) */}
            <div style={RowStyle}>
              {BASE_FEATURE_ITEMS.slice(3, 5).map((item, index) => {
                const IconComponent = item.iconKey;
                return (
                  <div
                    key={`mobile-row2-${index}`}
                    onClick={() => handleItemClick(item)}
                    style={getCardStyle(item)}
                    role="button" 
                    tabIndex="0" 
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverOut}
                  >
                    <div style={getIconContainerStyle(item)}>
                      <IconComponent size={iconSize} color="white" />
                    </div>
                    <span style={LabelStyle}>{item.label}</span>
                  </div>
                );
              })}
          </div>
          </>
        ) : (
          // Single row on desktop
          BASE_FEATURE_ITEMS.map((item, index) => {
            const IconComponent = item.iconKey;
            return (
              <div
                key={`desktop-row-${index}`}
                onClick={() => handleItemClick(item)}
                style={getCardStyle(item)}
                role="button" 
                tabIndex="0" 
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
              >
                <div style={getIconContainerStyle(item)}>
                  <IconComponent size={iconSize} color="white" />
                </div>
                <span style={LabelStyle}>{item.label}</span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}