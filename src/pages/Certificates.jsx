import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react"; // Import for the back button
import Header from "../components/Header";
import bg from "../assets/homeBg.jpg";
import { downloadCertificate } from "../api/certificate";
import Footer from '../components/Footer';

const desktopBreakpoint = 992;

/* STYLED COMPONENTS */

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: black;
  color: #FFFFFF;
  font-family: Poppins, sans-serif;
`;

const HeroSection = styled.div`
  width: ${props => props.$isMobile ? "95%" : "100%"}; 
  min-height: ${props => props.$isMobile ? "400px" : "550px"}; 
  margin-top: ${props => props.$isMobile ? "70px" : "105px"}; 
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${props => props.$isMobile ? "20px" : "28px"};
  padding: ${props => props.$isMobile ? "20px" : "0"};
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center;
  position: relative;
  
  /* FIX: On mobile, justify to the start to make the button and heading left-aligned */
  justify-content: flex-start; 
  /* Also remove the 15px gap on mobile to make the button and heading appear tighter */
  gap: ${props => props.$isMobile ? "5px" : "15px"};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;

  /* Use static positioning on mobile to flow as a flex item */
  position: ${props => props.$isMobile ? 'static' : 'absolute'}; 
  
  /* Desktop Positioning */
  top: ${props => props.$isMobile ? 'auto' : '50%'};
  left: ${props => props.$isMobile ? 'auto' : '-50px'};
  transform: ${props => props.$isMobile ? 'none' : 'translateY(-50%)'};
  
  /* FIX: Adjust margin-left to pull it to the edge of the 20px padding (on mobile) */
  margin-left: ${props => props.$isMobile ? '-10px' : '0'};
  margin-bottom: 0;
  z-index: 10;
`;

const Heading = styled.h1`
  font-size: ${props => props.$isMobile ? "30px" : "48px"};
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.2;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
  gap: ${props => props.$isMobile ? "15px" : "30px"}; 
  width: 100%;
`;

const Input = styled.input`
  width: ${props => props.$isMobile ? "85%" : "30%"}; 
  max-width: 450px; 
  height: ${props => props.$isMobile ? "50px" : "60px"};
  border-radius: 10px;
  border: none;
  outline: none;
  padding-left: ${props => props.$isMobile ? "15px" : "20px"};
  font-size: ${props => props.$isMobile ? "16px" : "18px"};
  background: #FFFFFF;
  color: #000000;
  font-family: Poppins, sans-serif;
  box-sizing: border-box; 
`;

const DownloadButton = styled.button`
  width: ${props => props.$isMobile ? "85%" : "25%"}; 
  max-width: 450px; 
  height: ${props => props.$isMobile ? "45px" : "50px"};
  border-radius: 30px;
  border: none;
  background: #00A8FF;
  color: #FFFFFF;
  font-size: ${props => props.$isMobile ? "16px" : "20px"};
  font-weight: 600;
  cursor: pointer;
  margin-top: ${props => props.$isMobile ? "10px" : "20px"};
  transition: background 0.3s ease;
  box-sizing: border-box;
  
  /* OPTIMIZATION: Abstracted hover logic */
  &:hover {
    background: #0090DD;
  }
`;

// ----------------------------------------------------

export default function Certificates() {
  const [name, setName] = useState("");
  const [enrollId, setEnrollId] = useState("");
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownload = async() => {
    if (!name || !enrollId) {
      alert("Please enter your Name and Enrollment ID.");
      return;
    }
    // Retain original logic structure
    await downloadCertificate({ name, enrollmentId: enrollId });
  };
  
  // Back button handler (simple history back)
  const goBack = () => {
    window.history.back();
  };


  return (
    <PageContainer>
      <Header />

      <HeroSection $isMobile={isMobile}>
        
        {/* Heading with Back Button */}
        <ContentHeader $isMobile={isMobile}>
          <BackButton onClick={goBack} $isMobile={isMobile}>
            {/* Back Arrow Icon */}
            <ChevronLeft size={isMobile ? 24 : 32} />
          </BackButton>
          <Heading $isMobile={isMobile}>
            Download Certificate
          </Heading>
        </ContentHeader>


        <InputContainer $isMobile={isMobile}>
          <Input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            $isMobile={isMobile}
          />

          <Input
            type="text"
            placeholder="Enter your Enrollment ID"
            value={enrollId}
            onChange={(e) => setEnrollId(e.target.value)}
            $isMobile={isMobile}
          />
        </InputContainer>

        <DownloadButton
          onClick={handleDownload}
          $isMobile={isMobile}
          // OPTIMIZATION: Removed onMouseEnter/onMouseLeave inline styles
        >
          Download Certificate
        </DownloadButton>
      </HeroSection>
      <Footer/>
    </PageContainer>
  );
}