// src/components/Hero.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import bg from "../assets/homeBg.jpg";

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

const HeroContainer = styled.section`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px -4px 8px 2px #00508A inset;
  overflow: hidden;

  /* Desktop Styles */
  width: 100%;
  height: 580px;
  padding: 0 20px;

  /* Mobile Styles */
  @media (max-width: ${desktopBreakpoint}px) {
    width: 95%;
    height: 100vh;
    padding: 0 15px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  
  /* Desktop Styles */
  align-items: flex-start;
  text-align: left;

  /* Mobile Styles */
  @media (max-width: ${desktopBreakpoint}px) {
    max-width: 95%;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
`;

const Heading = styled(motion.h1)`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
  white-space: pre-line;

  /* Desktop Styles */
  font-size: 42px;
  line-height: 1.2;

  /* Mobile Styles */
  @media (max-width: ${desktopBreakpoint}px) {
    font-size: 32px;
    line-height: 1.3;
  }
`;

const Description = styled(motion.p)`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  color: #FFFFFF;
  margin: 0;
  max-width: 600px;

  /* Font size is 16px for both desktop and mobile */
  font-size: 16px;
`;

const CTAButton = styled(motion.a)`
  width: fit-content;
  border-radius: 36px;
  border: 3px solid #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.2;
  color: #FFFFFF;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;

  /* Desktop Styles */
  min-width: 200px;
  padding: 14px 24px;
  margin: 0;

  /* Mobile Styles */
  @media (max-width: ${desktopBreakpoint}px) {
    min-width: 180px;
    padding: 16px 28px;
    margin: 0 auto; /* Center button when content is centered */
  }

  /* Hover effect for desktop (pointer devices) */
  @media (min-width: ${desktopBreakpoint + 1}px) {
    &:hover {
      border: 3px solid #00A8FF;
      box-shadow: 0 0 15px rgba(0, 168, 255, 0.5);
      transform: translateY(-2px);
    }
    &:not(:hover) {
      /* Revert styles explicitly */
      border: 3px solid #FFFFFF;
      box-shadow: none;
      transform: translateY(0);
    }
  }
`;

export default function Hero() {
  const isMobile = useIsMobile(desktopBreakpoint);

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <HeroContainer>
      <Overlay />

      {/* Content */}
      <ContentWrapper>
        {/* Heading */}
        <Heading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Future-Ready Skills, On Your Schedule.
        </Heading>

        {/* Description */}
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          Join thousands of students and trusted companies worldwide who choose Aspro IT 
          to learn, grow, and succeed.
        </Description>

        {/* CTA Button */}
        <CTAButton
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          href="#live-learning"
          onClick={(e) => handleScrollToSection(e, "live-learning")}
        >
          Start Learning Today
        </CTAButton>
      </ContentWrapper>
    </HeroContainer>
  );
}