import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/Header";
import bg from "../assets/homeBg.webp";
import { getAllCourses } from "../api/course"; 
import {getAllQuestions} from '../api/practiceque';
import Footer from '../components/Footer';

const desktopBreakpoint = 992;
const slugify = (title) => title.trim().toLowerCase().replace(/\s+/g, "-");

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
  font-size: ${props => props.$isMobile ? "30px" : "48px"};
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

const CourseItem = styled.div`
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

const CourseTitle = styled.span`
  font-size: 18px; 
  font-weight: 500;
`;

const CourseDescription = styled.span`
  font-size: 14px; 
  color: #B0B0B0;
`;

const QuestionCount = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #4CAF50; /* Green */
    background: rgba(76, 175, 80, 0.2);
    padding: 2px 8px;
    border-radius: 4px;
    display: inline-block; /* Keep it inline-block for its own width */
    margin-left: 0; /* Remove any previous margin */
    align-self: flex-start; /* Ensures it is aligned to the left within the flex column */
`;

const GetQuestionsButton = styled.button`
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

export default function PracticeQue() {
 const [courses, setCourses] = useState([]);
 const [loading, setLoading] = useState(true);
 const [isMobile, setIsMobile] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCoursesAndCounts = async () => {
      try {
        // 1. Fetch all courses
        const coursesRes = await getAllCourses();
        let courseData = Array.isArray(coursesRes.courses) ? coursesRes.courses : (Array.isArray(coursesRes) ? coursesRes : []);
        courseData = courseData.filter(c => c.Course_title);
        
        // 2. Fetch ALL questions
        const questionsRes = await getAllQuestions();
        const allQuestions = Array.isArray(questionsRes) ? questionsRes : (Array.isArray(questionsRes.questions) ? questionsRes.questions : []);

        // =============== START DEBUG LOGGING ===============
        console.log("--- DEBUG START ---");

        // Log the ID format of the first course
        if (courseData.length > 0) {
            console.log("Course ID (courseData[0]._id):", courseData[0]._id);
            if (courseData[0]._id) {
                console.log("Course ID (toString()):", courseData[0]._id.toString());
            }
        } else {
            console.log("No course data fetched.");
        }

        // Log the category ID format of the first question
        if (allQuestions.length > 0) {
            console.log("Question Category ID (allQuestions[0].category):", allQuestions[0].category);
        } else {
            console.log("No question data fetched.");
        }
        
        console.log("--- DEBUG END ---");
        // =============== END DEBUG LOGGING ===============


        // 3. Calculate counts on the frontend
        const countMap = allQuestions.reduce((acc, question) => {
          const categoryId = question.category; 
          acc[categoryId] = (acc[categoryId] || 0) + 1;
          return acc;
        }, {});
   
        // 4. Merge counts into course data - FIX IS HERE
        const coursesWithCount = courseData.map(course => ({
          ...course,
          // This line is the focus of the mismatch
          questionCount: countMap[course._id.toString()] || 0 
        }));

        setCourses(coursesWithCount);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCourses([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndCounts();
  }, []);

  const handleGetQuestions = (course) => {
    // Navigate only if there are questions available
    if (course.questionCount > 0) {
        navigate(`/practice-questions/${slugify(course.Course_title)}/${course._id}`);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <PageContainer>
      <Header />

      <MainContent $isMobile={isMobile}>

        <ContentHeader $isMobile={isMobile}>
          <BackButton onClick={goBack} $isMobile={isMobile}>
            <ChevronLeft size={isMobile ? 24 : 32} />
          </BackButton>
          <Heading $isMobile={isMobile}>
            Practice Questions
          </Heading>
        </ContentHeader>


        <QuestionsListContainer $isMobile={isMobile}>
          {loading ? (
            <FallbackText $isMobile={isMobile}>Loading available courses...</FallbackText>
          ) : courses.length === 0 ? (
            <FallbackText $isMobile={isMobile}>No Courses available for practice questions.</FallbackText>
          ) : (
            courses.map((course) => (
              <CourseItem key={course._id} $isMobile={isMobile}>
                <TitleContainer $isMobile={isMobile}>
    <CourseTitle>
        {course.Course_title}
    </CourseTitle>
    {/* Move QuestionCount here, outside of CourseTitle */}
    <QuestionCount $isMobile={isMobile}>
        {course.questionCount} {course.questionCount === 1 ? 'question' : 'questions'} available
    </QuestionCount>
    {course.description && (
        <CourseDescription>{course.description}</CourseDescription>
    )}
</TitleContainer> 

              <GetQuestionsButton
                onClick={() => handleGetQuestions(course)}
                $isMobile={isMobile}
                    disabled={course.questionCount === 0}
                    style={{ opacity: course.questionCount === 0 ? 0.5 : 1, cursor: course.questionCount === 0 ? 'not-allowed' : 'pointer' }}
               >
                  {course.questionCount === 0 ? 'No Questions' : 'Get Questions'}
                </GetQuestionsButton>
            </CourseItem>
            ))
           )}
        </QuestionsListContainer>
      </MainContent>
      <Footer/>
    </PageContainer>
  );
}