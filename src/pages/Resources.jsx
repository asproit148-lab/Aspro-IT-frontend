import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import Header from "../components/Header";
import bg from "../assets/homeBg.Webp";
import { getAllResources } from '../api/resource';
import Footer from '../components/Footer';

const desktopBreakpoint = 992;

/* STYLED COMPONENTS */

const PageContainer = styled.div`
  background-color: black;
  color: white;
  font-family: Poppins, sans-serif;
`;

const MainContent = styled.div`
  width: ${props => props.$isMobile ? "90%" : "100%"};
  /* OPTIMIZATION: Use props for dynamic margin and padding */
  margin-top: ${props => props.$isMobile ? "70px" : "105px"};
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: ${props => props.$isMobile ? "20px 20px 40px 20px" : "20px 120px 60px 120px"};
  gap: ${props => props.$isMobile ? "20px" : "30px"};
  background-image: url(${bg});
  color: #FFFFFF;
  background-size: cover;
  background-position: center;
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center;
  position: relative;
  padding-left: ${props => props.$isMobile ? "0" : "0"}; 
  justify-content: ${props => props.$isMobile ? "center" : "flex-start"};
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
  position: absolute; 
  top: 50%; /* Center vertically */
  transform: translateY(-50%); 
  left: ${props => props.$isMobile ? '0' : '-50px'};
  margin-bottom: 0;
  z-index: 10;
`;


const Heading = styled.h1`
  font-size: ${props => props.$isMobile ? "36px" : "48px"};
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
  text-align: ${props => props.$isMobile ? "center" : "left"};
  /* Ensure alignment for desktop layout */
  width: ${props => props.$isMobile ? '100%' : 'auto'}; 
`;

const ResourcesListContainer = styled.div` 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
  width: ${props => props.$isMobile ? "100%" : "80%"}; 
  margin: ${props => props.$isMobile ? "0 auto" : "0"}; 
`;

const ResourceItem = styled.div`
  display: flex;
  flex-direction: ${props => props.$isMobile ? "column" : "row"};
  justify-content: space-between;
  align-items: ${props => props.$isMobile ? "flex-start" : "center"};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: ${props => props.$isMobile ? "16px" : "16px 24px"};
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  gap: ${props => props.$isMobile ? "12px" : "0"};
`;

const ResourceTitleContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
  flex: ${props => props.$isMobile ? "none" : 1};
`;

const ResourceTitle = styled.span`
  font-size: 18px; 
  font-weight: 500;
`;

const ResourceDescription = styled.span`
  font-size: 14px; 
  color: #B0B0B0;
`;

const DownloadButton = styled.button`
  width: ${props => props.$isMobile ? "100%" : "180px"};
  height: 45px;
  border-radius: 25px;
  border: none;
  background: #00A8FF;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  
  /* OPTIMIZATION: Abstracted hover logic */
  &:hover {
    background: #0090DD;
  }
`;

const FallbackText = styled.p`
  font-size: 18px;
  text-align: ${props => props.$isMobile ? "center" : "left"};
`;

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getAllResources();
        setResources(data || []);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleDownload = async (resource) => {
    try {
      const downloadUrl = `${import.meta.env.VITE_API_URL}/api/resources/download-resource/${resource._id}`;
      
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf'
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resource.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading resource:", error);
      // Retain alert for failure as per original logic
      alert("Failed to download resource. Please try again.");
    }
  };
  
  // Back button handler (simple history back)
  const goBack = () => {
    window.history.back();
  };

  return (
    <PageContainer>
      <Header />

      <MainContent $isMobile={isMobile}>
        
        {/* Heading with Back Button */}
        <ContentHeader $isMobile={isMobile}>
          <BackButton onClick={goBack} $isMobile={isMobile}>
            {/* Back Arrow Icon */}
            <ChevronLeft size={isMobile ? 24 : 32} /> 
          </BackButton>
          <Heading $isMobile={isMobile}>
            Download Notes
          </Heading>
        </ContentHeader>

        {/* Resources List */}
        <ResourcesListContainer $isMobile={isMobile}>
          {loading ? (
            <FallbackText $isMobile={isMobile}>Loading resources...</FallbackText>
          ) : resources.length === 0 ? (
            <FallbackText $isMobile={isMobile}>No resources available</FallbackText>
          ) : (
            resources.map((resource) => (
              <ResourceItem
                key={resource._id}
                $isMobile={isMobile}
              >
                <ResourceTitleContainer $isMobile={isMobile}>
                  <ResourceTitle>{resource.title}</ResourceTitle>
                  {resource.description && (
                    <ResourceDescription>{resource.description}</ResourceDescription>
                  )}
                </ResourceTitleContainer>

                <DownloadButton
                  onClick={() => handleDownload(resource)}
                  $isMobile={isMobile}
                  // OPTIMIZATION: Removed onMouseEnter/onMouseLeave inline styles
                >
                  Download
                </DownloadButton>
              </ResourceItem>
            ))
          )}
        </ResourcesListContainer>
      </MainContent>
      <Footer />
    </PageContainer>
  );
}