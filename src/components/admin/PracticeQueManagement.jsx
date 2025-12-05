import React, { useState, useEffect } from "react";
import { Plus, Eye, Trash2 } from "lucide-react";
import AddQuestion from "../../components/admin/AddPracticeQue";
import {
  addQuestion as addQuestionAPI,
  getAllQuestions,
  deleteQuestion as deleteQuestionAPI,
} from "../../api/practiceque";

const largeBreakpoint = 1200;
const tabletBreakpoint = 768;

// Utility function for consistent ID access
const getQuestionId = (question) => question?._id || question?.id;
// Utility function for consistent link access
const getQuestionLink = (question) =>
  question.url ||
  question.fileUrl ||
  question.filePath ||
  question.file ||
  question.link ||
  question.resource?.url;

export default function PracticeQueManagement() {
  const [questions, setQuestions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : largeBreakpoint
  );

  const isMobile = screenWidth < tabletBreakpoint;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch All Questions
  const fetchQuestions = async () => {
    try {
      // getAllQuestions already returns the array of questions thanks to the API wrapper
      const list = await getAllQuestions();
      setQuestions(list);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Add Question: Handles API call and state update.
  const handleAddQuestion = async (data) => {
    try {
      const payload = new FormData();
      payload.append("title", data.title);
      payload.append("description", data.description);
      
      // CRITICAL FIX: Ensure the file field name is "file" to match the Multer configuration.
      if (data.fileRaw) payload.append("file", data.fileRaw);

      const response = await addQuestionAPI(payload);

      // FIX: Extract the saved question object from the expected backend response structure
      const savedQue =
        response?.question || response?.resource || response?.data || response || null;

      if (!savedQue || !getQuestionId(savedQue)) {
        console.warn("Unexpected response shape or missing ID from addQuestionAPI:", response);
        // Fallback: If we can't get the object, re-fetch the entire list.
        fetchQuestions(); 
        setShowPopup(false); 
        return;
      }

      // Append saved question to the start of the state list
      setQuestions((prev) => [savedQue, ...prev]);
      setShowPopup(false); // Close popup on success
    } catch (error) {
      console.error("Upload failed:", error);
      // Optionally show a toast or set an error state
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Question?")) return;
    try {
      await deleteQuestionAPI(id);
      // Ensure the filter uses the same ID extraction logic
      setQuestions((prev) => prev.filter((q) => getQuestionId(q) !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleView = (link) => {
    if (!link) {
      alert("No file link available to view.");
      return;
    }
    window.open(link, "_blank");
  };

  let columns =
    screenWidth < tabletBreakpoint ? 1 : screenWidth < largeBreakpoint ? 2 : 3;

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
        // FIX: Added explicit bottom padding to prevent style conflicts/warnings
        paddingBottom: "20px",
      }}
    >
      {/* HEADING */}
      <div style={{ padding: isMobile ? "0" : "0 0 0 24px" }}>
        <h1
          style={{
            fontWeight: 600,
            fontSize: isMobile ? "28px" : "36px",
            color: "#FFFFFF",
            marginLeft: 0,
            marginBottom: isMobile ? "4px" : "8px",
            marginTop: 0,
          }}
        >
          Practice Questions
        </h1>
        <p
          style={{
            fontWeight: 400,
            fontSize: isMobile ? "14px" : "16px",
            color: "#FFFFFF",
            opacity: 0.9,
            marginTop: isMobile ? "0" : "4px",
            marginBottom: isMobile ? "20px" : "0",
          }}
        >
          Upload & Manage practice questions for students
        </p>
      </div>

      {/* Top Bar */}
      <div
        style={{
          width: "100%",
          height: isMobile ? "60px" : "72px",
          marginTop: isMobile ? "30px" : "40px",
          marginLeft: isMobile ? "0" : "20px",
          borderRadius: "10px",
          background: "linear-gradient(90.19deg, #323232 0%, #0F0F0F 59.13%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 15px" : "0 30px",
          boxSizing: "border-box",
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

      {/* CARD GRID */}
      <div
        style={{
          width: isMobile ? "100%" : "90%",
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: isMobile ? "20px" : "30px",
          marginLeft: isMobile ? "0" : "50px",
          marginTop: isMobile ? "30px" : "50px",
          marginBottom: "100px",
          boxSizing: "border-box",
          alignItems: "stretch",
        }}
      >
        {questions.map((q) => {
          const keyId = getQuestionId(q); // Use utility for consistent ID
          const link = getQuestionLink(q); // Use utility for consistent link

          return (
            <div
              key={keyId || Math.random()}
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
                textAlign: "center",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ width: "100%" }}>
                <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>
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
                  <Eye size={18} /> View
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
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showPopup && (
        <AddQuestion
          onClose={() => setShowPopup(false)}
          onSave={(queData) => {
            handleAddQuestion(queData);
          }}
        />
      )}
    </div>
  );
}