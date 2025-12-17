import React, { useState } from "react";
import { Upload } from "lucide-react";
import { addBanner } from "../../api/campaign";

export default function AddCampaign({ onClose, onSave }) {
  // --- STATE MANAGEMENT ---
  const [imagePreview, setImagePreview] = useState(null); 
  const [imageFile, setImageFile] = useState(null); 
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // --- IMAGE PROCESSING ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // --- FORM SUBMISSION & API CALL ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input Validation
    if (!title || !imageFile) {
      alert("Please upload an image and enter a title.");
      return;
    }

    try {
      // Prepare Multipart Form Data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("url", url);
      formData.append("image", imageFile); 

      const banner = await addBanner(formData);

      alert("Campaign added successfully!");

      onSave(banner);
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to add campaign");
    }
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
          height: "480px",
          background: "#1B1B1B",
          borderRadius: "20px",
          padding: "30px 40px",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            color: "#FFFFFF",
            marginBottom: "20px",
          }}
        >
          Add Campaigns
        </h2>

        {/* DRAG & DROP / UPLOAD SECTION */}
        <label
          htmlFor="campaign-image"
          style={{
            width: "100%",
            height: "200px",
            borderRadius: "20px",
            background: "#2E2E2E",
            border: "2px dashed rgba(201, 201, 201, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            cursor: "pointer",
            overflow: "hidden",
          }}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Uploaded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          ) : (
            <>
              <Upload size={42} color="#C9C9C9" />
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#C9C9C9",
                  marginTop: "8px",
                }}
              >
                Upload image
              </p>
            </>
          )}
          <input
            id="campaign-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>

        {/* INPUT FIELDS (TITLE & URL) */}
        <div
          style={{
            width: "97%",
            height: "60px",
            border: "1px solid #C9C9C94D",
            borderRadius: "30px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "24px",
            background: "#2E2E2E",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Add Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "Poppins, sans-serif",
              fontSize: "18px",
              color: "#FFFFFF",
            }}
          />
        </div>

        <div
          style={{
            width: "97%",
            height: "60px",
            border: "1px solid #C9C9C94D",
            borderRadius: "30px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "24px",
            background: "#2E2E2E",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Add URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "Poppins, sans-serif",
              fontSize: "18px",
              color: "#FFFFFF",
            }}
          />
        </div>

        {/* FOOTER ACTIONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: "100px",
              height: "50px",
              borderRadius: "15px",
              background: "#414141",
              color: "#FFFFFF",
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
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
              width: "100px",
              height: "50px",
              borderRadius: "15px",
              background: "#2B6EF0",
              color: "#FFFFFF",
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
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