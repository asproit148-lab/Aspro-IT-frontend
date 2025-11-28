import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import logo from "../assets/logo.png";
import facebook from "../assets/facebook.png";
import whatsapp from "../assets/whatsapp.png";
import instagram from "../assets/instagram.png";
import x from "../assets/x.png";
import linkedin from "../assets/linkedin.png";

// --- Constants ---
const desktopBreakpoint = 768;

// --- Custom Hook to check screen size ---
const useIsMobile = (breakpoint) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

// --- Styled Components (Desktop-First Approach) ---

const StyledFooter = styled.footer`
  /* DESKTOP DEFAULTS (No change from original request) */
  width: 100%;
  min-height: 450px;
  background: #101010;
  box-shadow: inset 0px -8px 12px #2A292940, inset 0px 8px 12px #2A292940;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 50px 40px;
  position: relative;
  color: #FFFFFF;
  font-family: 'Poppins', sans-serif;
  gap: 50px;
  flex-wrap: wrap;
  overflow-x: hidden;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    width: 90%;
    min-height: auto;
    flex-direction: column;
    align-items: center; /* Center content block */
    padding: 40px 20px;
    gap: 40px;
    flex-wrap: nowrap;
  }
`;

const LeftSide = styled.div`
  /* DESKTOP DEFAULTS */
  display: flex;
  flex-direction: column;
  gap: 48px;
  min-width: 280px;
  max-width: 407px;
  text-align: left;
  align-items: flex-start;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    gap: 20px;
    min-width: 100%;
    max-width: 100%;
    align-items: center;
    text-align: center;
  }
`;

const LogoImage = styled.img`
  /* DESKTOP DEFAULTS */
  width: 221px;
  height: 63px;
  mix-blend-mode: lighten;
  display: block;
  margin: 0;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    width: 180px;
    height: 50px;
    margin: 0 auto 10px auto; /* Center logo on mobile */
  }
`;

const CompanyDescriptionWrapper = styled.div`
  /* DESKTOP DEFAULTS */
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #FFFFFF;
  
  /* Inherit text alignment from LeftSide */
  text-align: inherit; 
`;

const RightSide = styled.div`
  /* DESKTOP DEFAULTS */
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  flex-grow: 1; /* Allows it to take up available space */
  justify-content: flex-start;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    width: 100%;
    gap: 40px 20px; /* Vertical and horizontal gap */
    justify-content: space-around; /* Distribute columns */
    flex-grow: 0;
  }
`;

const ColumnContent = styled.div`
  /* DESKTOP DEFAULTS */
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 150px;
  flex: 1 1 0; /* Ensures even distribution, similar to original flex: '1 1 auto' */
  text-align: left;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    min-width: 45%; /* Allows two columns per row on mobile/tablet */
    max-width: 50%;
    text-align: center;
    flex: none;
  }
`;

const ColumnHeading = styled.h3`
  /* DESKTOP DEFAULTS */
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 36px;
  margin: 0;
  color: #FFFFFF;
  text-align: left;
  width: 100%;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    font-size: 28px;
    text-align: center;
  }
`;

const FooterText = styled.p`
  /* DESKTOP DEFAULTS (Used for Address text and contact links) */
  text-decoration: none;
  color: #FFFFFF99;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  transition: all 0.3s ease;
  white-space: nowrap; /* Default nowrap for desktop links/contacts */
  text-align: inherit; /* Inherit alignment from ColumnContent */

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    font-size: 16px;
    line-height: 24px;
    white-space: normal; /* Allow wrapping on mobile for fit */
    text-align: center;
  }
`;

const SocialIconsContainer = styled.div`
  /* DESKTOP DEFAULTS */
  position: absolute;
  right: 200px;
  bottom: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: auto;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    position: relative; /* Integrate into flow */
    right: auto;
    bottom: auto;
    margin-top: 20px;
    justify-content: center;
    gap: 15px;
    width: 100%;
    order: 4; /* Ensures it appears last in the vertical mobile flow */
  }
`;

const SocialIcon = styled.img`
  /* DESKTOP DEFAULTS */
  width: 50px;
  height: 50px;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    width: 32px;
    height: 32px;
  }
`;

// --- Component Start ---

export default function Footer() {
  const isMobile = useIsMobile(desktopBreakpoint);

  // Helper for applying link styling to anchor tags
  const LinkItem = ({ item, href = "#", enableWrap = false }) => (
    <FooterText 
      as="a" 
      href={href} 
      style={enableWrap ? { whiteSpace: 'normal' } : {}}
    >
      {item}
    </FooterText>
  );

  return (
    <StyledFooter>
      
      {/* LEFT SIDE (Company, Description) */}
      <LeftSide>
        <CompanyDescriptionWrapper>
          <LogoImage src={logo} alt="AsproIT Logo" />
          <FooterText as="p" style={{ 
            fontWeight: 400, 
            fontSize: isMobile ? "14px" : "16px",
            lineHeight: "160%", 
            color: "#FFFFFF",
            whiteSpace: 'normal',
            margin: '0',
            textAlign: 'inherit'
          }}>
            “AsproIT is an IT training and internship company dedicated to
            empowering students and professionals with practical skills in
            Python, Generative AI, and Data Analytics. With hands-on projects,
            expert mentors, and strong career support, we help learners
            confidently step into the future of technology.”
          </FooterText>
        </CompanyDescriptionWrapper>
      </LeftSide>

      {/* RIGHT SIDE (Address, Company, Contacts) */}
      <RightSide>
        {/* Address */}
        <ColumnContent>
          <ColumnHeading>Address</ColumnHeading>
          <FooterText as="p" style={{ whiteSpace: "normal" }}>
            1st Floor, Pratiksha,
            <br />
            Bhawan khajpura,
            <br />
            Patna, India-800014
          </FooterText>
        </ColumnContent>

        {/* Company Links */}
        <ColumnContent>
          <ColumnHeading>Company</ColumnHeading>
          {["Home", "Courses", "About", "Contact"].map((item, i) => (
            <LinkItem key={i} item={item} />
          ))}
        </ColumnContent>

        {/* Contacts */}
        <ColumnContent>
          <ColumnHeading>Contacts</ColumnHeading>
          {["+91-9128444000", "admin@asproit.com"].map((item, i) => (
            <LinkItem key={i} item={item} enableWrap={true} />
          ))}
        </ColumnContent>
      </RightSide>
      
      {/* Social Media Icons Section */}
      <SocialIconsContainer>
        {[facebook, instagram, x, whatsapp, linkedin].map((icon, i) => (
          <SocialIcon
            key={i}
            src={icon}
            alt="social-icon"
            // Hover logic is now inside SocialIcon:hover
          />
        ))}
      </SocialIconsContainer>
    </StyledFooter>
  );
}