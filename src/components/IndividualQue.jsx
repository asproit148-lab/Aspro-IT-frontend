import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom"; 
import Header from "../components/Header";
import Footer from '../components/Footer';
import bg from "../assets/homeBg.webp";
import { getQuestionsByCourseId } from "../api/practiceque"; 

const desktopBreakpoint = 992;

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

const QuestionsListContainer = styled.div` 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
  width: ${props => props.$isMobile ? "100%" : "80%"}; 
  margin: ${props => props.$isMobile ? "0 auto" : "0"}; 
`;

const QuestionItem = styled.div`
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

const TitleContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
  flex: ${props => props.$isMobile ? "none" : 1};
`;

const QuestionTitle = styled.span`
  font-size: 18px; 
  font-weight: 500;
`;

const QuestionDescription = styled.span`
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

const slugToTitle = (slug) => {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};


export default function IndividualQue() {
  // Get parameters from the route: /practice-questions/:courseSlug/:courseId
  const { courseSlug, courseId } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Dynamically set the heading using the slug
  const pageTitle = courseSlug ? slugToTitle(courseSlug) : "Course Questions";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch questions based on the courseId
  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }
    
    const fetchIndividualQuestions = async () => {
      try {
        // Use the courseId to fetch the filtered questions
        const data = await getQuestionsByCourseId(courseId);
        setQuestions(data || []);
      } catch (error) {
        console.error(`Error fetching questions for course ${courseId}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndividualQuestions();
  }, [courseId]);

  // Download Handler (Reusing the logic from the original file)
  const handleDownload = useCallback(async (question) => {
    try {
      // NOTE: The base URL should be imported from the practiceque.js file if possible, 
      // but for now, we'll assume the environment variable or 'http://localhost:3000' still works.
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const downloadUrl = `${baseUrl}/api/questions/download-question/${question._id}`;

      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf'
        }
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          throw new Error(`Download failed: ${response.status} - ${errorData.message || 'Authentication error'}`);
        }
        throw new Error(`Download failed with status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${pageTitle}_${question.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading question:", error);
      alert(`Failed to download question. Check console for details. Error: ${error.message}`);
    }
  }, [pageTitle]);

  // Back button handler (Go back to the list of all courses)
  const goBack = () => {
    // Using navigate(-1) is generally safer than window.history.back() for React Router
    navigate(-1); 
  };


  return (
    <PageContainer>
      <Header />

      <MainContent $isMobile={isMobile}>

        {/* Heading with Back Button */}
        <ContentHeader $isMobile={isMobile}>
          <BackButton onClick={goBack} $isMobile={isMobile}>
            <ChevronLeft size={isMobile ? 24 : 32} />
          </BackButton>
          <Heading $isMobile={isMobile}>
            {pageTitle} Questions
          </Heading>
        </ContentHeader>


        <QuestionsListContainer $isMobile={isMobile}>
          {loading ? (
            <FallbackText $isMobile={isMobile}>Loading questions for {pageTitle}...</FallbackText>
          ) : questions.length === 0 ? (
            <FallbackText $isMobile={isMobile}>No practice questions available for {pageTitle} yet.</FallbackText>
          ) : (
            questions.map((question) => (
              <QuestionItem key={question._id} $isMobile={isMobile}>
                <TitleContainer $isMobile={isMobile}>
                  <QuestionTitle>{question.title}</QuestionTitle>
                  {question.description && (
                    <QuestionDescription>{question.description}</QuestionDescription>
                  )}
                </TitleContainer>

                <DownloadButton
                  onClick={() => handleDownload(question)}
                  $isMobile={isMobile}
                >
                  Download
                </DownloadButton>
              </QuestionItem>
            ))
          )}
        </QuestionsListContainer>
      </MainContent>
      <Footer/>
    </PageContainer>
  );
}