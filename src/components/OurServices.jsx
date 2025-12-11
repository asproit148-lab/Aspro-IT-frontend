import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import service4 from "../assets/service4.jpg";
import service5 from "../assets/service5.jpg";

const desktopBreakpoint = 992; 

const ServicesContainer = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: #0A0A0A;
  color: white;
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.$isMobile ? "300px" : "620px"};
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.$isMobile ? "100px" : "60px"};
  background-color: #0000009E;
  display: flex;
  flex-direction: ${props => props.$isMobile ? "column" : "row"};
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

const HeroHeading = styled.span`
  font-size: ${props => props.$isMobile ? "28px" : "48px"};
  font-weight: bold;
  background: linear-gradient(to bottom, #0745E4, #9700AE);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: block;
  text-align: center;
`;

const HeroSubHeading = styled.span`
  font-size: ${props => props.$isMobile ? "24px" : "32px"};
  font-weight: 600;
  margin-left: ${props => props.$isMobile ? "0" : "12px"};
  color: white;
  display: block;
  text-align: center;
`;

const ContentSection = styled.div`
  margin-top: ${props => props.$isMobile ? "70px" : "105px"};
  margin-bottom: ${props => props.$isMobile ? "40px" : "100px"};
  display: grid;
  grid-template-columns: ${props => props.$isMobile ? "1fr" : "1fr 1fr"};
  align-items: center;
  gap: ${props => props.$isMobile ? "30px" : "56px"};
  padding-left: ${props => props.$isMobile ? "20px" : "86px"};
  padding-right: ${props => props.$isMobile ? "20px" : "86px"};
`;

const SectionText = styled.p`
  font-size: ${props => props.$isMobile ? "16px" : "20px"}; 
  line-height: 1.6; 
  color: white;
  text-align: justify;
  /* Use $isIntroText prop to conditionally remove padding only for the Intro section */
  padding: ${props => props.$isIntroText ? "0" : (props.$isMobile ? "0" : "24px")};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.$isMobile ? "28px" : "36px"}; 
  font-weight: 600;
  margin-bottom: 16px;
  text-align: ${props => props.$isMobile ? "left" : "center"};
`;

const SectionImage = styled.img`
  width: 100%; 
  height: ${props => props.$isMobile ? "250px" : "350px"}; 
  object-fit: cover;
  border-radius: 12px;
  margin: 0;
  /* Image ordering matches original logic */
  order: ${props => props.$isMobile ? 1 : 'unset'}; 
`;

const TextBlock = styled.div`
  /* Text block ordering matches original logic */
  order: ${props => props.$isMobile ? 2 : 'unset'}; 
  text-align: ${props => props.$isMobile ? "left" : "center"};
`;

const Separator = styled.hr`
  border-top: 1px solid #333; 
  margin: ${props => props.$isMobile ? '40px 20px' : '80px 86px'};
`;

export default function OurServices() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ServicesContainer>

      {/* Hero Section */}
      <HeroSection $isMobile={isMobile}>
        <HeroImage
          src={service1}
          alt="service hero"
        />

        <HeroOverlay $isMobile={isMobile}>
          <HeroHeading $isMobile={isMobile}>
            Learn IT
          </HeroHeading>
          <HeroSubHeading $isMobile={isMobile}>
            with AsproIT Learning!
          </HeroSubHeading>
        </HeroOverlay>
      </HeroSection>

      {/* Intro Section */}
      <ContentSection $isMobile={isMobile}>
        <SectionText $isMobile={isMobile} $isIntroText> 
          Welcome to our institute — where we turn ambition into achievement.
          <br /><br />
          We specialize in IT Support, Software Development, and IT Services training that helps learners build real-world skills and launch successful tech careers. 
          Whether you are a beginner entering IT or a professional looking to upskill, our structured training and placement-focused approach supports you every step of the way.           
          <br /><br />
          Our mission is to equip you with hands-on skills, industry insights, and the confidence to succeed in today’s competitive tech world.
        </SectionText>

        <SectionImage
          src={service2}
          alt="service2"
          $isMobile={isMobile}
          style={{ order: isMobile ? 2 : 'unset' }}
        />
      </ContentSection>

      <Separator $isMobile={isMobile} />

      {/* Section 1: IT & Support (Image Left / Text Right) */}
      <ContentSection $isMobile={isMobile}>
        <SectionImage
          src={service3}
          alt="service3"
          $isMobile={isMobile}
        />

        <TextBlock $isMobile={isMobile}>
          <SectionTitle $isMobile={isMobile}>
            IT and Support
          </SectionTitle>
          <SectionText $isMobile={isMobile}>
            Our IT and Support team ensures a smooth and uninterrupted learning experience for every student. 
            From technical assistance to platform maintenance, we make sure our e-learning systems run efficiently.             
            <br /><br />
            Whether you need help accessing courses, setting up accounts, or resolving software issues, 
            our support experts are always ready to guide you. We provide quick solutions and a reliable learning 
            platform so you can focus on your studies without interruptions.
          </SectionText>
        </TextBlock>
      </ContentSection>

      <Separator $isMobile={isMobile} />

      {/* Section 2: Development (Text Left / Image Right) */}
      <ContentSection $isMobile={isMobile}>
        <TextBlock $isMobile={isMobile}>
          <SectionTitle $isMobile={isMobile}>Development</SectionTitle>
          <SectionText $isMobile={isMobile}>
            We constantly innovate to make online learning engaging and effective. 
            Our development team builds interactive e-learning modules, web applications, and tools 
            that enhance both teaching and learning. 
            <br /><br />
            Using modern technologies and user-friendly design, 
            we create solutions that are easy to navigate, responsive, and accessible to learners everywhere. 
            Our goal is to build a digital learning environment that is powerful and enjoyable.
          </SectionText>
        </TextBlock>

        <SectionImage
          src={service4}
          alt="service4"
          $isMobile={isMobile}
        />
      </ContentSection>

      <Separator $isMobile={isMobile} />

      {/* Section 3: Training (Image Left / Text Right) */}
      <ContentSection $isMobile={isMobile}>
        <SectionImage
          src={service5}
          alt="service5"
          $isMobile={isMobile}
        />

        <TextBlock $isMobile={isMobile}>
          <SectionTitle $isMobile={isMobile}>Training</SectionTitle>
          <SectionText $isMobile={isMobile}>
            Our training programs are designed to equip learners with in-demand IT and software skills 
            through practical, hands-on learning. Each course is led by industry professionals who bring 
            real-world experience into the classroom.             
            <br /><br />
            We offer skill-based training in programming, web development, software testing, and 
            project management. With flexible learning options, personalized mentoring, and 
            placement assistance, we help learners confidently take the next step in their careers.
          </SectionText>
        </TextBlock>
      </ContentSection>
      
    </ServicesContainer>
  );
}