import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import gemini from '../assets/gemini.png';

const desktopBreakpoint = 768;

// --- STYLED COMPONENTS ---

const MotionContainer = styled(motion.div)`
  width: ${props => props.$isMobile ? "90%" : "100%"}; 
  height: ${props => props.$isMobile ? "900px" : "536px"}; 
  top: ${props => props.$isMobile ? "70px" : "105px"}; 
  padding: ${props => props.$isMobile ? "40px 20px" : "0"}; 
  background: #101010;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: ${props => props.$isMobile ? "column" : "row"}; 
  align-items: center;
  justify-content: ${props => props.$isMobile ? "center" : (props.$isAwake ? "flex-start" : "center")};
  width: 100%;
  padding-left: ${props => props.$isMobile ? "0px" : (props.$isAwake ? "86px" : "0px")};
  gap: ${props => props.$isMobile ? "20px" : "40px"}; 
  position: relative;
  z-index: 2;
  transition: all 0.4s ease;
`;

const GlowLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: "none";
  z-index: 1;
  background:
    "radial-gradient(circle at 95% 5%, #4BDA43 50px, #A078D7 80px, #F29B9B 50px, transparent 20px), " +
    "radial-gradient(circle at 5% 95%, #4BDA43 50px, #A078D7 80px, #F29B9B 50px, transparent 320px)";
  filter: blur(100px);
`;

const Image = styled.img`
  width: ${props => props.$isMobile ? "90%" : "514px"};
  max-width: ${props => props.$isMobile ? "400px" : "514px"}; 
  height: ${props => props.$isMobile ? "auto" : "488px"};
  border-radius: 36px;
  object-fit: cover;
  flex-shrink: 0;
  margin-bottom: ${props => props.$isMobile ? "20px" : "0"}; 
`;

const TextContainer = styled.div`
  width: ${props => props.$isMobile ? "100%" : "640px"};
  max-width: ${props => props.$isMobile ? "100%" : "640px"};
  color: #FFFFFF;
  font-family: "Poppins, sans-serif";
  display: flex;
  flex-direction: column;
  text-align: ${props => props.$isMobile ? "center" : "left"}; 
  padding: ${props => props.$isMobile ? "0 10px" : "0"}; 
`;

const Heading = styled.h2`
  font-weight: 600;
  font-size: ${props => props.$isMobile ? "28px" : "36px"}; 
  line-height: 130%;
  margin-bottom: 16px;
`;

const Paragraph = styled.p`
  font-weight: 400;
  font-size: ${props => props.$isMobile ? "16px" : "20px"}; 
  line-height: 150%;
  color: #E0E0E0;
  text-align: justify;
`;

// --- COMPONENT ---

export default function SubtleScroll() {
  const [isAwake, setIsAwake] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const headingText = "Summer Training and Internship Opportunity for College Students";
  const paragraphText = `✨ Kickstart your career this summer with AsproIT’s Summer Internship & Training Program—designed for college students who want more than classroom learning. Gain real-world experience by working on live projects, collaborate with industry professionals and talented peers, and build practical technical and professional skills that employers value. By the end of the program, you’ll walk away with hands-on experience, a strong portfolio, and the confidence to stand out in your career journey. Make your summer count with AsproIT and take the first step toward a successful future.`;
  

  return (
    <MotionContainer
      $isMobile={isMobile}
      onMouseEnter={() => !isAwake && setTimeout(() => setIsAwake(true), 200)}
      onTouchStart={() => !isAwake && setIsAwake(true)}
      animate={{
        boxShadow: isAwake
          ? "inset 0px 4px 8px #4EA34740, inset 0px -4px 8px #4EA34740"
          : "inset 0px 4px 8px #7956A380, inset 0px -4px 8px #7956A380",
      }}
      transition={{
        type: "spring",
        mass: 1,
        stiffness: 80,
        damping: 20,
        duration: 1.2,
      }}
    >
      {isAwake && (
        <ContentWrapper
          $isMobile={isMobile}
          $isAwake={isAwake}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            mass: 1,
            stiffness: 150,
            damping: 30,
          }}
        >
          {/* Subtle Glow Layer */}
          <GlowLayer />
          
          {/* Left Image */}
          <Image
            src={gemini}
            alt="gemini"
            $isMobile={isMobile}
          />

          {/* Right Text */}
          <TextContainer $isMobile={isMobile}>
            <Heading $isMobile={isMobile}>
              {headingText}
            </Heading>
            <Paragraph $isMobile={isMobile}>
              {paragraphText}
            </Paragraph>
          </TextContainer>
        </ContentWrapper>
      )}
    </MotionContainer>
  );
}