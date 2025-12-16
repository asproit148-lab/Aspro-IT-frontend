import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import logo from "../assets/logo.webp";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import linkedin from "../assets/linkedin.png";

const desktopBreakpoint = 768;

const useIsMobile = (breakpoint) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

/* STYLED COMPONENTS */
const StyledFooter = styled.footer`
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
  gap: 80px;
  flex-wrap: wrap;

  @media (max-width: ${desktopBreakpoint}px) {
    width: 90%;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    gap: 40px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  min-width: 280px;
  max-width: 407px;
  text-align: left;
  align-items: flex-start;

  @media (max-width: ${desktopBreakpoint}px) {
    gap: 20px;
    min-width: 100%;
    max-width: 100%;
    align-items: center;
    text-align: center;
  }
`;

const LogoImage = styled.img`
  width: 221px;
  height: 63px;
  mix-blend-mode: lighten;
  display: block;
  margin: 0;

  @media (max-width: ${desktopBreakpoint}px) {
    width: 180px;
    height: 50px;
    margin: 0 auto 10px auto;
  }
`;

const CompanyDescriptionWrapper = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #FFFFFF;
  text-align: justify;

  /* Redundant styles removed from JSX and consolidated here */
  padding-top: 30px;
  margin: 0; 
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: auto; // Reset to default

  @media (max-width: ${desktopBreakpoint}px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px 20px;
    justify-content: space-between;
    align-items: flex-start; 
  }
`;

const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 150px;
  flex: 1;
  text-align: left;

  @media (max-width: ${desktopBreakpoint}px) {
    /* Default to full width for Address */
    min-width: 100%;
    max-width: 100%;
    text-align: left;

    ${props => props.$halfWidthOnMobile && `
      min-width: calc(50% - 10px);
      max-width: calc(50% - 10px);
      flex: 0 0 calc(50% - 10px);
    `}
  }
`;

const ColumnHeading = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 36px;
  margin: 0;
  color: #FFFFFF;
  text-align: left;
  width: 100%;

  @media (max-width: ${desktopBreakpoint}px) {
    font-size: 28px;
  }
`;

const FooterText = styled.p`
  text-decoration: none;
  color: #FFFFFF99;
  font-size: 24px;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  line-height: ${props => props.$smallLineHeight ? '2px' : '32px'};

  @media (min-width: ${desktopBreakpoint}px) {
    text-align: justify;
    line-height: ${props => props.$smallLineHeight ? '2px' : '32px'};
  }

  @media (max-width: ${desktopBreakpoint}px) {
    font-size: 16px;
    line-height: 24px;
    white-space: normal;
    text-align: left;
    line-height: ${props => props.$smallLineHeight ? '18px' : '24px'};
  }
`;

const FooterLink = styled(Link)`
  text-decoration: none;
`;

const SocialIconsContainer = styled.div`
  position: absolute;
  right: 200px;
  bottom: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: auto;

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
  width: 56px;
  height: 56px;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: ${desktopBreakpoint}px) {
    width: 48px;
    height: 48px;
  }
`;

const EmbeddedMapWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
`;

export default function Footer() {
  const isMobile = useIsMobile(desktopBreakpoint);
  
  const mapEmbedUrl = 
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.041403323105!2d85.07795399999999!3d25.606630400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed575b37041b3d%3A0x52e04703ab113cfd!2sAspro%20IT%20Training%20%E2%80%93%20Python%20%26%20Programming%20Classes%20Online%20%7C%20Offline%20Free%20%26%20Paid%20in%20Patna%20(India)!5e1!3m2!1sen!2sin!4v1765138051676!5m2!1sen!2sin";

  return (
    <StyledFooter>
      {/* LEFT SIDE */}
      <LeftSide>
        <CompanyDescriptionWrapper>
          <LogoImage src={logo} alt="AsproIT Logo" />
          <FooterText as="p" $isMobile={isMobile} style={{ 
            fontWeight: 400, 
            fontSize: isMobile ? "14px" : "16px",
            lineHeight: "160%",
            color: "#FFFFFF",
            whiteSpace: 'normal',
            textAlign: isMobile ? "center" : "left",
          }}>
            “AsproIT is an IT training and internship company dedicated to
            empowering students and professionals with practical skills in
            Python, Generative AI, and Data Analytics. With hands-on projects,
            expert mentors, and strong career support, we help learners
            confidently step into the future of technology.”
          </FooterText>
        </CompanyDescriptionWrapper>
      </LeftSide>

      {/* RIGHT SIDE */}
      <RightSide>
        {/* Address */}
        <ColumnContent>
          <ColumnHeading>Address</ColumnHeading>
          <FooterText as="p">
            1st Floor Pratiksha <br />
            Bhawan, Khajpura, <br />
            Patna, India - 800014
          </FooterText>
          
          {/* Embedded Map */}
          <EmbeddedMapWrapper>
            <iframe
              title="AsproIT Location"
              src={mapEmbedUrl}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </EmbeddedMapWrapper>
        </ColumnContent>

        {/* Company Links */}
        <ColumnContent $halfWidthOnMobile>
          <ColumnHeading>Company</ColumnHeading>
          {[
            {name:"Home", link:"/"},
            {name:"Courses", link:"/courses"},
            {name:"About", link:"/about"},
            {name:"Contact", link:"/contact"},
          ].map((item,i)=>(
            <FooterLink to={item.link} key={i}> 
              <FooterText $smallLineHeight>{item.name}</FooterText> 
            </FooterLink>
          ))}
        </ColumnContent>

        {/* Contacts */}
        <ColumnContent $halfWidthOnMobile>
          <ColumnHeading>Contacts</ColumnHeading>
          {["+91-9128444000", "admin@asproit.com"].map((item,i)=>(
            <FooterText key={i} as="p" $smallLineHeight>
              {item}
            </FooterText>
          ))}
        </ColumnContent>

      </RightSide>

      {/* Social Icons */}
      <SocialIconsContainer>
        <a href="https://www.facebook.com/asproit/" target="_blank" rel="noopener noreferrer">
          <SocialIcon src={facebook} alt="AsproIT Facebook" />
        </a>
        <a href="https://www.instagram.com/aspro_it/" target="_blank" rel="noopener noreferrer">
          <SocialIcon src={instagram} alt="AsproIT Instagram" />
        </a>
        <a href="https://www.linkedin.com/company/aspro-it/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
          <SocialIcon src={linkedin} alt="AsproIT LinkedIn" />
        </a>
      </SocialIconsContainer>
    </StyledFooter>
  );
}