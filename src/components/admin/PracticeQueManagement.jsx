import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Eye, Trash2 } from "lucide-react";
import AddQuestion from "../../components/admin/AddPracticeQue";
import {
  addQuestion as addQuestionAPI,
  getAllQuestions,
  deleteQuestion as deleteQuestionAPI,
} from "../../api/practiceque";
import { getAllCourses } from "../../api/course";

const LARGE_BREAKPOINT = 1200;
const TABLET_BREAKPOINT = 768;

const getQuestionId = (question) => question?._id || question?.id;
const getQuestionLink = (question) =>
  question.url ||
  question.fileUrl ||
  question.filePath ||
  question.file ||
  question.link ||
  question.resource?.url;

const getColumnCount = (width) => {
  if (width < TABLET_BREAKPOINT) return 1;
  if (width < LARGE_BREAKPOINT) return 2;
  return 3;
};

export default function PracticeQueManagement() {
  const [questions, setQuestions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < TABLET_BREAKPOINT : false
  );
  const [columns, setColumns] = useState(
    typeof window !== "undefined" ? getColumnCount(window.innerWidth) : 3
  );

  const courseTitleMap = useMemo(() => {
    return courses.reduce((map, course) => {
      if (course._id && course.Course_title) {
        map[course._id.toString()] = course.Course_title;
      }
      return map;
    }, {});
  }, [courses]);

  const sortedQuestions = useMemo(() => {
    return [...questions].sort((a, b) => (getQuestionId(b) > getQuestionId(a) ? 1 : -1));
  }, [questions]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesRes = await getAllCourses();
        const courseData = Array.isArray(coursesRes.courses)
          ? coursesRes.courses
          : (Array.isArray(coursesRes) ? coursesRes : []);
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses for title lookup:", error);
      }
    };
    fetchCourses();
  }, []);

  const fetchQuestions = useCallback(async () => {
    try {
      const list = await getAllQuestions();
      setQuestions(list);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();

    const handleResize = () => {
      const width = window.innerWidth;
      const newIsMobile = width < TABLET_BREAKPOINT;
      const newColumns = getColumnCount(width);

      if (newIsMobile !== isMobile) setIsMobile(newIsMobile);
      if (newColumns !== columns) setColumns(newColumns);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fetchQuestions, isMobile, columns]);

  const handleAddQuestion = useCallback(async (data) => {
    try {
      const payload = new FormData();
      payload.append("title", data.title);
      payload.append("description", data.description);
      payload.append("category", data.category);

      if (data.fileRaw) payload.append("file", data.fileRaw);

      const response = await addQuestionAPI(payload);

      const savedQue =
        response?.question || response?.resource || response?.data || response || null;

      if (!savedQue || !getQuestionId(savedQue)) {
        console.warn("Unexpected response shape or missing ID from addQuestionAPI. Re-fetching data.");
        fetchQuestions();
        setShowPopup(false);
        return;
      }

      setQuestions((prev) => [savedQue, ...prev]);
      setShowPopup(false);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }, [fetchQuestions]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Delete this Question?")) return;
    try {
      await deleteQuestionAPI(id);
      setQuestions((prev) => prev.filter((q) => getQuestionId(q) !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }, []);

  const handleView = (link) => {
    if (!link) {
      alert("No file link available to view.");
      return;
    }
    window.open(link, "_blank");
  };

  return (
    <div
      style={{
        background: "black",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
        paddingTop: isMobile ? "80px" : "140px",
        paddingLeft: isMobile ? "20px" : "120px",
        paddingRight: "20px",
        paddingBottom: "20px",
      }}
    >
      <div style={{ padding: isMobile ? "0" : "0 0 0 24px" }}>
        <h1
          style={{
            fontWeight: 600,
            fontSize: isMobile ? "28px" : "36px",
            lineHeight: "100%",
            color: "#FFFFFF",
            marginLeft: isMobile ? "0" : "30px",
            marginTop: 0,
          }}
        >
          Practice Questions
        </h1>
        <p
          style={{
            fontWeight: 400,
            fontSize: isMobile ? "14px" : "16px",
            lineHeight: isMobile ? "100%" : "100%",
            color: "#FFFFFF",
            opacity: 0.9,
            marginTop: isMobile ? "8px" : "12px",
            marginLeft: isMobile ? "0" : "30px",
            marginBottom: isMobile ? "20px" : "0",
          }}
        >
          Upload & Manage practice questions for students
        </p>
      </div>

      <div
        style={{
          width: isMobile ? "100%" : "90%",
          height: isMobile ? "60px" : "72px",
          marginTop: isMobile ? "30px" : "40px",
          marginLeft: isMobile ? "0" : "50px",
          borderRadius: "10px",
          background: "linear-gradient(90.19deg, #323232 0%, #0F0F0F 59.13%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 15px" : "0 30px 4px 30px",
          boxSizing: 'border-box',
        }}
      >
        <div>
          <p
            style={{
              fontSize: isMobile ? "16px" : "20px",
              fontWeight: 400,
              marginBottom: "2px",
              lineHeight: isMobile ? "1" : "normal",
            }}
          >
            Total Questions
          </p>
          <p
            style={{
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: 500,
              marginTop: isMobile ? "2px" : "0",
              marginBottom: isMobile ? "0" : "10px",
            }}
          >
            {questions.length}
          </p>
        </div>

        <button
          onClick={() => setShowPopup(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#525252",
            color: "#FFFFFF",
            fontSize: isMobile ? "14px" : "16px",
            borderRadius: "10px",
            border: "none",
            padding: isMobile ? "8px 10px" : "10px 12px",
            cursor: "pointer",
          }}
        >
          <Plus size={isMobile ? 16 : 18} />
          {isMobile ? "Add" : "Add Questions"}
        </button>
      </div>

      <div
        style={{
          width: isMobile ? "100%" : "90%",
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: isMobile ? "20px" : "30px",
          marginLeft: isMobile ? "0" : "70px",
          marginTop: isMobile ? "30px" : "50px",
          marginBottom: "100px",
          boxSizing: "border-box",
          alignItems: "stretch",
        }}
      >
        {sortedQuestions.map((q) => {
          const keyId = getQuestionId(q);
          const link = getQuestionLink(q);
          const displayedCategory = courseTitleMap[q.category] || q.category;

          return (
            <div
              key={keyId || q.title}
              style={{
                width: "100%",
                minHeight: isMobile ? "180px" : "200px",
                background: "#343434",
                borderRadius: "20px",
                padding: isMobile ? "15px" : "20px",
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "left",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ width: "100%" }}>
                <p
                  style={{
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: 600,
                    color: "#D9A833",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}
                >
                  {displayedCategory}
                </p>
                <h3
                  style={{
                    fontSize: isMobile ? "16px" : "18px",
                    fontWeight: 500,
                    marginBottom: "8px"
                  }}
                >
                  {q.title}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? "13px" : "15px",
                    color: "#C9C9C9",
                    lineHeight: "18px",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    marginTop: 0,
                    marginBottom: "8px",
                  }}
                >
                  {q.description}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: isMobile ? "15px" : "20px",
                  marginTop: "16px",
                  width: "100%",
                }}
              >
                <button
                  onClick={() => handleView(link)}
                  style={{
                    width: isMobile ? "50%" : "50%",
                    height: isMobile ? "36px" : "36px",
                    borderRadius: "10px",
                    background: "#4254A5",
                    color: "#E3E3E3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "7px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  <Eye size={isMobile ? 16 : 18} /> View
                </button>

                <button
                  onClick={() => handleDelete(keyId)}
                  style={{
                    width: isMobile ? "50%" : "50%",
                    height: isMobile ? "36px" : "36px",
                    borderRadius: "10px",
                    background: "#373D48",
                    color: "#E3E3E3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "7px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  <Trash2 size={isMobile ? 16 : 18} /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showPopup && (
        <AddQuestion
          onClose={() => setShowPopup(false)}
          onSave={handleAddQuestion}
        />
      )}
    </div>
  );
}