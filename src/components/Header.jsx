import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import logo from "../assets/logo.webp";
import { Link, useLocation } from "react-router-dom";
import LoginPopup from "../components/LoginPopup";
import SignupPopup from "../components/SignupPopup";
import { getAllCourses } from "../api/course";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  User,
  LogOut,
  BookOpen,
  Info,
  Phone,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Download,
} from "lucide-react";

const desktopBreakpoint = 1024;
const textColor = "#3D96E0";

const customShouldForwardProp = (propName) => {
  return !propName.startsWith('$');
};

const useIsMobile = (breakpoint) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const StyledHeader = styled.header`
  width: 100%;
  background-color: black;
  position: fixed;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
  box-shadow: 0px 4px 25px 0px #00508A;
`;

const HeaderContainer = styled('div', { shouldForwardProp: customShouldForwardProp })`
  max-width: 1400px;
  margin: 0 auto;
  height: ${props => props.$isMobile ? "70px" : "105px"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.$isMobile ? "0 20px" : "0 40px"};
  flex-wrap: nowrap;
  box-sizing: border-box;
`;

const LogoWrapper = styled('div', { shouldForwardProp: customShouldForwardProp })`
  width: ${props => props.$isMobile ? "120px" : "180px"};
  height: auto;
  object-fit: contain;
`;

const LogoImage = styled('img', { shouldForwardProp: customShouldForwardProp })`
  width: ${props => props.$isMobile ? "150px" : "180px"};
  height: ${props => props.$isMobile ? "auto" : "60px"};
  object-fit: contain;
`;

const DesktopNav = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: nowrap;
`;

const NavItem = styled(Link, { shouldForwardProp: customShouldForwardProp })`
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: ${props => props.$isMobile ? 500 : 400};
  color: ${props => props.$isMobile ? (props.$isActive ? textColor : "white") : textColor};
  cursor: pointer;
  padding: ${props => props.$isMobile ? "10px 15px" : "6px 0"};
  width: ${props => props.$isMobile ? "100%" : "auto"};
  justify-content: flex-start;
  background-color: transparent;
  border-radius: 0;
  transition: 0.3s;
  box-sizing: border-box;

  ${props => props.$isMobile && `
    &:hover, &:focus, &:active {
      background-color: rgba(61, 150, 224, 0.1); 
    }
  `}
`;

const DropdownTrigger = styled('div', { shouldForwardProp: customShouldForwardProp })`
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: ${props => props.$isMobile ? 500 : 400};
  color: ${props => props.$isMobile ? (props.$isActive ? textColor : "white") : textColor};
  cursor: pointer;
  padding: ${props => props.$isMobile ? "10px 15px" : "6px 0"};
  width: ${props => props.$isMobile ? "100%" : "auto"};
  justify-content: flex-start;
  background-color: transparent;
  border-radius: 0;
  transition: 0.3s;
  box-sizing: border-box;
  white-space: nowrap; // Added for stability

  ${props => props.$isMobile && `
    &:hover, &:focus, &:active {
      background-color: rgba(61, 150, 224, 0.1); 
    }
  `}
`;

const NavLinkWithDropdown = styled(Link, { shouldForwardProp: customShouldForwardProp })`
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: ${props => props.$isMobile ? (props.$isActive ? textColor : "white") : textColor};
  cursor: pointer;
  padding: 6px 0;
  width: auto;
  justify-content: flex-start;
  background-color: transparent;
  border-radius: 0;
  transition: 0.3s;
  box-sizing: border-box;
  white-space: nowrap; // Added for stability
`;

const DropdownContainer = styled('div', { shouldForwardProp: customShouldForwardProp })`
  position: ${props => props.$isMobile ? "static" : "absolute"};
  top: ${props => props.$isMobile ? "0" : "40px"};
  left: ${props => props.$isMobile ? "0" : "0"};
  background: ${props => props.$isMobile ? "transparent" : "#212121"};
  border-radius: ${props => props.$isMobile ? "0" : "8px"};
  box-shadow: ${props => props.$isMobile ? "none" : "0px 1px 20px rgba(61,150,224,0.5)"};
  display: flex;
  flex-direction: column;
  
  min-width: 160px; 
  width: fit-content; 

  z-index: 999;
  padding: ${props => props.$isMobile ? "0" : "0"};
  margin-top: ${props => props.$isMobile ? "5px" : "0"};
  box-sizing: border-box;
`;

const DropdownItem = styled(Link, { shouldForwardProp: customShouldForwardProp })`
  ${props => {
    let borderRadius = "0";
    if (!props.$isMobile) {
      if (props.$index === 0) borderRadius = "8px 8px 0 0";
      else if (props.$index === props.$arrLength - 1) borderRadius = "0 0 8px 8px";
    }
    return `border-radius: ${borderRadius};`;
  }}

  width: ${props => props.$isMobile ? "100%" : "100%"}; 
  
  height: auto;
  padding: ${props => props.$isMobile ? "8px 15px 8px 30px" : "10px 15px"}; 
  color: ${props => props.$isMobile ? "#ccc" : "white"};
  font-family: 'Poppins', sans-serif;
  font-size: ${props => props.$isMobile ? "18px" : "16px"};
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s;
  box-sizing: border-box;
  
  &:hover {
    background: ${props => props.$isMobile ? "#222" : "#555"}; 
  }
`;

const DesktopLoginButton = styled.button`
  padding: 10px 24px;
  border-radius: 36px;
  border: 3px solid #FFFFFF;
  background: transparent;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;

  &:hover {
    border: 3px solid #00A8FF;
  }
`;

const UserIconWrapper = styled('div', { shouldForwardProp: customShouldForwardProp })`
  width: ${props => props.$isMobile ? "40px" : "48px"};
  height: ${props => props.$isMobile ? "40px" : "48px"};
  border-radius: 50%;
  border: ${props => props.$isMobile ? "2px solid #FFFFFF" : "3px solid #FFFFFF"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  position: relative;
  transition: 0.3s;
  margin-right: ${props => props.$isMobile ? "10px" : "0"}; 
`;

const UserDropdown = styled('div', { shouldForwardProp: customShouldForwardProp })`
  position: absolute;
  top: ${props => props.$isMobile ? "50px" : "60px"};
  right: 0;
  background: #1E1E1E;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.25);
  min-width: 120px;
  overflow: hidden;
  z-index: 999;
  box-sizing: border-box;
`;

const LogoutButton = styled('button', { shouldForwardProp: customShouldForwardProp })`
  width: 100%;
  padding: ${props => props.$isMobile ? "10px 14px" : "12px 16px"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  background: transparent;
  color: white;
  font-size: ${props => props.$isMobile ? "14px" : "16px"};
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: 0.3s;
  box-sizing: border-box;

  &:hover {
    background: #343434;
  }
`;

const MobileRightSide = styled.div`
  display: flex;
  align-items: center;
`;

const MobileHeaderLoginButton = styled.button`
  padding: 8px 16px;
  margin-right: 10px; // Spacing before the hamburger menu
  border-radius: 36px;
  border: 2px solid #00A8FF;
  background: transparent;
  color: #00A8FF;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;

  &:hover {
    background: rgba(0, 168, 255, 0.1);
  }
`;

const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
`;

const MobileMenuContent = styled.div`
  position: absolute; 
  top: 70px; 
  left: 0;
  width: 100%;
  height: calc(100vh - 70px); 
  background-color: #111111;
  z-index: 90;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  overflow-y: auto; 
  box-shadow: 0px 4px 25px 0px #00508A;
  box-sizing: border-box;
`;

const BodyScrollLock = ({ isLocked }) => {
  useEffect(() => {
    if (isLocked) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0)'; 
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = 'unset';
    };
  }, [isLocked]);
  return null;
};

export default function Header() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const slugify = (title) =>
    title.trim().toLowerCase().replace(/\s+/g, "-");

  const isMobile = useIsMobile(desktopBreakpoint);

  // Popups & dropdowns
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  // Local states for dropdown visibility
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [courses, setCourses] = useState([]);

  // Fetch courses
useEffect(() => {
    async function loadCourses() {
      try {
        const res = await getAllCourses();
        if (res.success) {
          setCourses(res.courses);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    }
    loadCourses();
}, []);

  // Universal handler to close all mobile menus/popups/dropdowns on link click
  const handleLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsDownloadOpen(false);
    setIsCoursesOpen(false);
    setIsAboutOpen(false);
    setShowUserDropdown(false);
  }, []);

  // Handler for sign-out
  const handleSignOut = () => {
    signOut();
    handleLinkClick(); 
  };

  // Handler for login button
  const handleLoginClick = () => {
    setShowLoginPopup(true);
    setIsMobileMenuOpen(false);
  };
  
  // Helper for checking if path is active for the 'About' dropdown
  const isAboutActive = location.pathname.startsWith("/about-us") || location.pathname.startsWith("/blogs") || location.pathname.startsWith("/our-services");
  
  const aboutMenuItems = [
    { name: "About Us", link: "/about-us" }, 
    { name: "Blogs", link: "/blogs" },
    { name: "Services", link: "/our-services" },
  ];

  const downloadMenuItems = [
    { name: "Resources", link: "/resources" },
    { name: "Certificates", link: "/certificates" },
    { name: "Practice Questions", link: "/practice-questions" },
  ];

  return (
    <>
      <BodyScrollLock isLocked={isMobile && isMobileMenuOpen} />
      
      <StyledHeader>
        <HeaderContainer $isMobile={isMobile}>
          {/* Logo */}
          <LogoWrapper $isMobile={isMobile}>
            <Link to="/" onClick={handleLinkClick}>
              <LogoImage src={logo} alt="logo" $isMobile={isMobile} />
            </Link>
          </LogoWrapper>

          {/* Desktop Nav (Hidden on Mobile) */}
          {!isMobile && (
            <DesktopNav>
              {/* Home */}
              <NavItem to="/" $isMobile={false} $isActive={location.pathname === "/"} onClick={handleLinkClick}>
                <Home size={20} /> Home
              </NavItem>

              {/* Download Dropdown */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setIsDownloadOpen(true)}
                onMouseLeave={() => setIsDownloadOpen(false)}
              >
                <DropdownTrigger $isMobile={false} $isActive={location.pathname.startsWith("/resources") || location.pathname.startsWith("/certificates")}>
                  Download{" "}
                  {isDownloadOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </DropdownTrigger>

                {isDownloadOpen && (
                  <DropdownContainer $isMobile={false}>
                    {downloadMenuItems.map((item, index, arr) => (
                      <DropdownItem
                        key={index}
                        to={item.link}
                        onClick={handleLinkClick}
                        $isMobile={false}
                        $index={index}
                        $arrLength={arr.length}
                      >
                        {item.name}
                      </DropdownItem>
                    ))}
                  </DropdownContainer>
                )}
              </div>

              {/* Courses Dropdown */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setIsCoursesOpen(true)}
                onMouseLeave={() => setIsCoursesOpen(false)}
              >
                <NavLinkWithDropdown 
                  to="/courses-all" // <-- ADDED: The main courses link
                  onClick={handleLinkClick} // Click the main link, which closes dropdowns
                  $isMobile={false}
                  $isActive={location.pathname.startsWith("/courses")} // Check for all /courses/* paths
                >
                  <BookOpen size={20} /> Courses{" "}
                  {isCoursesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </NavLinkWithDropdown>

                {isCoursesOpen && (
                  <DropdownContainer $isMobile={false}>
                    {courses
                      .filter((course) => course.Course_title)
                      .map((course, index, arr) => (
                        <DropdownItem
                          key={course._id}
                          to={`/courses/${slugify(course.Course_title)}/${course._id}`}
                          onClick={handleLinkClick}
                          $isMobile={false}
                          $index={index}
                          $arrLength={arr.length}
                        >
                          {course.Course_title}
                        </DropdownItem>
                      ))}
                  </DropdownContainer>
                )}
              </div>

              {/* About Dropdown */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <NavLinkWithDropdown 
                  to="/about-us" 
                  onClick={handleLinkClick} // Click the main link, which closes dropdowns
                  $isMobile={false}
                  $isActive={isAboutActive}
                >
                  <Info size={20} /> About{" "}
                  {isAboutOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </NavLinkWithDropdown>

                {isAboutOpen && (
                  <DropdownContainer $isMobile={false}>
                    {aboutMenuItems.slice(1).map((item, index, arr) => (
                      <DropdownItem
                        key={index}
                        to={item.link}
                        onClick={handleLinkClick}
                        $isMobile={false}
                        $index={index}
                        $arrLength={arr.length}
                      >
                        {item.name}
                      </DropdownItem>
                    ))}
                  </DropdownContainer>
                )}
              </div>

              {/* Contact */}
              <NavItem to="/contact" $isMobile={false} $isActive={location.pathname === "/contact"} onClick={handleLinkClick}>
                <Phone size={20} /> Contact
              </NavItem>
            </DesktopNav>
          )}

          {!isMobile && (
            <div>
              {user ? (
                <UserIconWrapper 
  onClick={() => setShowUserDropdown(!showUserDropdown)} 
  $isMobile={false} 
  title="Profile" 
  aria-label="Toggle user profile menu"
  role="button" 
  aria-expanded={showUserDropdown} 
>
                  <User size={24} color="white" />
                  {showUserDropdown && (
                    <UserDropdown $isMobile={false}>
                      <LogoutButton onClick={handleSignOut} $isMobile={false}>
                        <LogOut size={16} />
                        Logout
                      </LogoutButton>
                    </UserDropdown>
                  )}
                </UserIconWrapper>
              ) : (
                <DesktopLoginButton onClick={handleLoginClick}>
                  Log in
                </DesktopLoginButton>
              )}
            </div>
          )}

          {/* Mobile Right Side (Shown on Mobile) */}
          {isMobile && (
            <MobileRightSide>
              {!user && (
                <MobileHeaderLoginButton onClick={handleLoginClick}>
                  Log in
                </MobileHeaderLoginButton>
              )}

              {/* Mobile User Icon */}
              {user && (
                <UserIconWrapper 
  onClick={() => setShowUserDropdown(!showUserDropdown)} 
  $isMobile={true} 
  title="Profile" 
  aria-label="Toggle user profile menu"
  role="button" 
  aria-expanded={showUserDropdown} 
>
                  <User size={20} color="white" />
                  {showUserDropdown && (
                    <UserDropdown $isMobile={true}>
                      <LogoutButton onClick={handleSignOut} $isMobile={true}>
                        <LogOut size={14} />
                        Logout
                      </LogoutButton>
                    </UserDropdown>
                  )}
                </UserIconWrapper>
              )}
              
              {/* Mobile Menu Button */}
              <MobileMenuButton 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}>
                {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
              </MobileMenuButton>
            </MobileRightSide>
          )}

          {/* Mobile Menu Content (Conditionally rendered) */}
          {isMobile && isMobileMenuOpen && (
            <MobileMenuContent>
              {/* Home */}
              <NavItem to="/" $isMobile={true} $isActive={location.pathname === "/"} onClick={handleLinkClick}>
                <Home size={20} /> Home
              </NavItem>

              {/* Download Dropdown (Mobile) */}
              <div style={{ position: "relative" }}>
                <DropdownTrigger 
                  onClick={() => setIsDownloadOpen(!isDownloadOpen)}
                  $isMobile={true}
                  $isActive={location.pathname.startsWith("/resources") || location.pathname.startsWith("/certificates")}
                >
                  <Download size={20} /> Download{" "}
                  {isDownloadOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </DropdownTrigger>

                {isDownloadOpen && (
                  <DropdownContainer $isMobile={true}>
                    {downloadMenuItems.map((item, index, arr) => (
                      <DropdownItem
                        key={index}
                        to={item.link}
                        onClick={handleLinkClick}
                        $isMobile={true}
                        $index={index}
                        $arrLength={arr.length}
                      >
                        {item.name}
                      </DropdownItem>
                    ))}
                  </DropdownContainer>
                )}
              </div>

              {/* Courses Dropdown (Mobile) */}
              <div style={{ position: "relative" }}>
                <DropdownTrigger 
                  onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                  $isMobile={true}
                  $isActive={location.pathname.startsWith("/courses/")}
                >
                  <BookOpen size={20} /> Courses{" "}
                  {isCoursesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </DropdownTrigger>

                {isCoursesOpen && (
                  <DropdownContainer $isMobile={true}>
                    {courses
                      .filter((course) => course.Course_title)
                      .map((course, index, arr) => (
                        <DropdownItem
                          key={course._id}
                          to={`/courses/${slugify(course.Course_title)}/${course._id}`}
                          onClick={handleLinkClick}
                          $isMobile={true}
                          $index={index}
                          $arrLength={arr.length}
                        >
                          {course.Course_title}
                        </DropdownItem>
                      ))}
                  </DropdownContainer>
                )}
              </div>

              {/* About Dropdown (Mobile) */}
              <div style={{ position: "relative" }}>
                <DropdownTrigger 
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  $isMobile={true}
                  $isActive={isAboutActive}
                >
                  <Info size={20} /> About{" "}
                  {isAboutOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </DropdownTrigger>

                {isAboutOpen && (
                  <DropdownContainer $isMobile={true}>
                    {aboutMenuItems.map((item, index, arr) => (
                      <DropdownItem
                        key={index}
                        to={item.link}
                        onClick={handleLinkClick}
                        $isMobile={true}
                        $index={index}
                        $arrLength={arr.length}
                      >
                        {item.name}
                      </DropdownItem>
                    ))}
                  </DropdownContainer>
                )}
              </div>

              {/* Contact */}
              <NavItem to="/contact" $isMobile={true} $isActive={location.pathname === "/contact"} onClick={handleLinkClick}>
                <Phone size={20} /> Contact
              </NavItem>

            </MobileMenuContent>
          )}
        </HeaderContainer>
        {/* Login Popup */}
        {showLoginPopup && (
          <LoginPopup
            onClose={() => setShowLoginPopup(false)}
            onSignup={() => {
              setShowLoginPopup(false);
              setIsSignupOpen(true);
            }}
          />
        )}
        {/* Signup Popup */}
        {isSignupOpen && <SignupPopup 
        onClose={() => setIsSignupOpen(false)} 
        onBack={() => {
          setIsSignupOpen(false);
          setShowLoginPopup(true);
        }}/>}
      </StyledHeader>
    </>
  );
}