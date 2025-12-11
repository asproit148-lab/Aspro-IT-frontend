import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { getAllCourses } from "../../api/course"; 

export default function AddPracticeQue({ onClose, onSave, existingQue }) {
  const [file, setFile] = useState(existingQue?.link || existingQue?.file || "");
  const [fileRaw, setFileRaw] = useState(existingQue?.fileRaw || null);
  const [fileName, setFileName] = useState(existingQue?.fileName || "");
  const [title, setTitle] = useState(existingQue?.title || "");
  const [description, setDescription] = useState(existingQue?.description || "");
  const [category, setCategory] = useState(existingQue?.category || ""); 
  
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesRes = await getAllCourses();
        const courseData = Array.isArray(coursesRes.courses) ? coursesRes.courses : (Array.isArray(coursesRes) ? coursesRes : []);
        setCourses(courseData.filter(c => c.Course_title));
      } catch (error) {
        console.error("Error fetching courses for dropdown:", error);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile)); 
      setFileRaw(uploadedFile); 
      setFileName(uploadedFile.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFilePresent = fileRaw || (existingQue && file);

    if (!title || !description || !category || !isFilePresent) {
      alert("Please fill all fields & upload file, and select a valid Category.");
      return;
    }

    const newQue = {
      title,
      description,
      category, 
      link: file,
      fileRaw,
      fileName,
    };

    if (onSave) onSave(newQue);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "600px",
          height: "550px", 
          background: "#1B1B1B",
          borderRadius: "20px",
          padding: "30px 40px",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            color: "#FFFFFF",
          }}
        >
          {existingQue ? "Edit Question" : "Add Question"}
        </h2>

        {/* Upload Document */}
        <label
          htmlFor="question-file"
          style={{
            width: "98%",
            height: "100px",
            borderRadius: "16px",
            background: "#2E2E2E",
            border: "1px dashed rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            cursor: "pointer",
            textAlign: "center",
            padding: "10px",
          }}
        >
          {fileName ? (
            <>
              <p
                style={{
                  color: "#00C853",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {fileName}
              </p>
              <p
                style={{
                  color: "#C9C9C9",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                (Click again to replace file)
              </p>
            </>
          ) : (
            <>
              <Upload size={40} color="#C9C9C9" />
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#C9C9C9",
                  marginTop: "10px",
                }}
              >
                Upload document
              </p>
            </>
          )}

          <input
            id="question-file"
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "95%",
            height: "45px", 
            borderRadius: "30px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#2E2E2E",
            color: "#FFFFFF",
            fontSize: "16px",
            padding: "0 20px",
            fontFamily: "Poppins, sans-serif",
            outline: "none",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            height: "45px", 
            borderRadius: "30px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#2E2E2E",
            color: category ? "#FFFFFF" : "#888888", 
            fontSize: "16px",
            padding: "0 20px",
            fontFamily: "Poppins, sans-serif",
            outline: "none",
            cursor: "pointer"
          }}
          disabled={loadingCourses}
        >
          <option value="" disabled>
            {loadingCourses ? "Loading Categories..." : "Select Category"}
          </option>
          {courses.map(course => (
            <option 
              key={course._id} 
              value={course._id}
              style={{ color: '#FFFFFF', background: '#2E2E2E' }}
            >
              {course.Course_title}
            </option>
          ))}
        </select>

        {/* Description */}
        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "94%",
            height: "60px", 
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#2E2E2E",
            color: "#FFFFFF",
            fontSize: "16px",
            padding: "14px 20px",
            fontFamily: "Poppins, sans-serif",
            resize: "none",
            outline: "none",
          }}
        />

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: "120px",
              height: "45px", 
              borderRadius: "15px",
              background: "#414141",
              color: "#FFFFFF",
              fontFamily: "Poppins, sans-serif",
              fontSize: "18px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            style={{
              width: "120px",
              height: "45px", 
              borderRadius: "15px",
              background: "#2B6EF0",
              color: "#FFFFFF",
              fontFamily: "Poppins, sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            {existingQue ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}