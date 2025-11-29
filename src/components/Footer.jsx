import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import logo from "../assets/logo.png";
import facebook from "../assets/facebook.png";
import whatsapp from "../assets/whatsapp.png";
import instagram from "../assets/instagram.png";
import x from "../assets/x.png";
import linkedin from "../assets/linkedin.png";

const desktopBreakpoint = 768;

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

const StyledFooter = styled.footer`
  /* DESKTOP DEFAULTS */
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
  text-align: inherit; 
`;

const RightSide = styled.div`
  /* DESKTOP DEFAULTS */
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  flex-grow: 1; 
  justify-content: flex-start;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    width: 100%;
    gap: 40px 20px; 
    justify-content: space-around; 
    flex-grow: 0;
  }
`;

const ColumnContent = styled.div`
  /* DESKTOP DEFAULTS */
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 150px;
  flex: 1 1 0; 
  text-align: left;

  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    min-width: 45%; 
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
  /* DESKTOP DEFAULTS  */
  text-decoration: none;
  color: #FFFFFF99;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  transition: all 0.3s ease;
  white-space: nowrap; 
  text-align: inherit;
  /* MOBILE OVERRIDES */
  @media (max-width: ${desktopBreakpoint}px) {
    font-size: 16px;
    line-height: 24px;
    white-space: normal;
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
    position: relative; 
    right: auto;
    bottom: auto;
    margin-top: 20px;
    justify-content: center;
    gap: 15px;
    width: 100%;
    order: 4; 
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

export default function Footer() {
  const isMobile = useIsMobile(desktopBreakpoint);

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
          />
        ))}
      </SocialIconsContainer>
    </StyledFooter>
  );
}