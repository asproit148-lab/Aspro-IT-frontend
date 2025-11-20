import React, { useState } from "react";
import { addOpportunity } from "../../api/job";

export default function AddJob({ onClose, onSave }) {
  const [type, setType] = useState("Job");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [ctc, setCtc] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company || !role || !ctc || !website) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = {
  type,
  companyName: company,
  roleTitle: role,
  ctcOrStipend: ctc, // rename your variable
  companyWebsite: website
};

    try {
      setLoading(true);

      // 🔥 API CALL
      const res = await addOpportunity(formData);

      // Send back the saved job to parent so UI updates
      if (onSave) onSave(res.data);

      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error adding opportunity:", error);
      alert("Failed to add job. Check console for details.");
      setLoading(false);
    }
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
          background: "#1B1B1B",
          borderRadius: "20px",
          padding: "30px 40px",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            color: "#FFFFFF",
            marginBottom: "25px",
          }}
        >
          Add Job / Internship
        </h2>

        {/* TYPE */}
        <label style={{ color: "#C9C9C9", fontFamily: "Poppins" }}>
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            width: "100%",
            height: "55px",
            borderRadius: "15px",
            border: "1px solid #C9C9C94D",
            background: "#2E2E2E",
            color: "white",
            padding: "0 20px",
            fontSize: "16px",
            marginBottom: "20px",
            fontFamily: "Poppins",
          }}
        >
          <option value="Job">Job</option>
          <option value="Internship">Internship</option>
        </select>

        {/* FIELDS */}
        {[
          { label: "Company Name", state: company, set: setCompany },
          { label: "Role", state: role, set: setRole },
          { label: "CTC / Stipend", state: ctc, set: setCtc },
          { label: "Company Website", state: website, set: setWebsite },
        ].map((item, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <label style={{ color: "#C9C9C9", fontFamily: "Poppins" }}>
              {item.label}
            </label>
            <input
              type="text"
              value={item.state}
              onChange={(e) => item.set(e.target.value)}
              placeholder={item.label}
              style={{
                width: "95%",
                height: "55px",
                borderRadius: "15px",
                border: "1px solid #C9C9C94D",
                background: "#2E2E2E",
                color: "white",
                padding: "0 20px",
                fontSize: "16px",
                marginTop: "8px",
                fontFamily: "Poppins",
              }}
            />
          </div>
        ))}

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
            marginTop: "10px",
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
              fontFamily: "Poppins",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100px",
              height: "50px",
              borderRadius: "15px",
              background: "#2B6EF0",
              color: "#FFFFFF",
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: 600,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
