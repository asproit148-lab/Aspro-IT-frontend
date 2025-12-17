import React, { useState } from "react";
import { Upload } from "lucide-react";

export default function AddResource({ onClose, onSave, existingResource }) {
  // --- STATE MANAGEMENT ---
  const [file, setFile] = useState(existingResource?.file || "");
  const [fileRaw, setFileRaw] = useState(null);
  const [fileName, setFileName] = useState(existingResource?.fileName || "");
  const [title, setTitle] = useState(existingResource?.title || "");
  const [description, setDescription] = useState(existingResource?.description || "");

  // --- FILE HANDLING ---
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      // Create local URL for preview/viewing
      setFile(URL.createObjectURL(uploadedFile)); 
      // Store raw file object for backend multipart/form-data
      setFileRaw(uploadedFile); 
      setFileName(uploadedFile.name);
    }
  };

  // --- FORM SUBMISSION ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Ensure all fields and files are present
    if (!title || !file || !description) {
      alert("Please fill all fields and upload a document.");
      return;
    }

    const newResource = {
      id: Date.now(),
      title,
      description,
      link: file,
      fileRaw,
      fileName,
    };

    if (onSave) onSave(newResource);
  };

  return (
    // --- MODAL OVERLAY ---
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
      {/* MODAL CONTAINER */}
      <div
        style={{
          width: "600px",
          height: "520px",
          background: "#1B1B1B",
          borderRadius: "20px",
          padding: "30px 40px",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            color: "#FFFFFF",
            textAlign: "left",
          }}
        >
          {existingResource ? "Edit Resource" : "Add Resource"}
        </h2>

        {/* DOCUMENT UPLOAD SECTION */}
        <label
          htmlFor="resource-file"
          style={{
            width: "100%",
            height: "150px",
            borderRadius: "16px",
            background: "#2E2E2E",
            border: "1px dashed rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            cursor: "pointer",
            overflow: "hidden",
            textAlign: "center",
            padding: "10px",
          }}
        >
          {file ? (
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
              <p style={{ color: "#C9C9C9", fontSize: "13px", marginTop: "4px" }}>
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
            id="resource-file"
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>

        {/* RESOURCE TITLE INPUT */}
        <input
          type="text"
          placeholder="Resource Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "96%",
            height: "50px",
            borderRadius: "30px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#2E2E2E",
            color: "#FFFFFF",
            fontSize: "18px",
            paddingLeft: "20px",
            fontFamily: "Poppins, sans-serif",
            outline: "none",
          }}
        />

        {/* RESOURCE DESCRIPTION INPUT */}
        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "94%",
            height: "100px",
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

        {/* ACTION BUTTONS */}
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
              height: "50px",
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
              height: "50px",
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}