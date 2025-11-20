import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";

export default function AddBlog({ onClose, onSave, existingBlog }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (existingBlog) {
      setTitle(existingBlog.title || "");
      setDescription(existingBlog.description || "");
      setPreview(existingBlog.image || "");
    }
  }, [existingBlog]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || (!selectedFile && !existingBlog)) {
      alert("Please fill all fields.");
      return;
    }

    const blogData = {
      title,
      description,
      file: selectedFile,
    };

    onSave(blogData);
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
          {existingBlog ? "Edit Blog" : "Add Blog"}
        </h2>

        <label
          htmlFor="blog-image"
          style={{
            width: "100%",
            height: "120px",
            borderRadius: "16px",
            background: "#2E2E2E",
            border: "1px dashed rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            cursor: "pointer",
            overflow: "hidden",
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
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
                Upload image
              </p>
            </>
          )}

          <input
            id="blog-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>

        <input
          type="text"
          placeholder="Blog Title"
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

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "94%",
            height: "50px",
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
