import React, { useState, useEffect } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import AddJob from "./AddJob";

import {
  getAllOpportunities,
  deleteOpportunity,
} from "../../api/job";

export default function JobManagement() {
  const [filterType, setFilterType] = useState("All");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const [jobs, setJobs] = useState([]);

  // FETCH FROM BACKEND
  const loadJobs = async () => {
    try {
      const res = await getAllOpportunities();
      if (res?.success) {
        setJobs(res.data);
      }
    } catch (err) {
      console.log("Error loading jobs:", err);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // DELETE FROM BACKEND
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this opportunity?")) return;

    try {
      await deleteOpportunity(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  // ADD NEW JOB — reload or push to array
  const handleSaveJob = (newJob) => {
    setJobs((prev) => [...prev, newJob]);
  };

  const filteredJobs =
    filterType === "All"
      ? jobs
      : jobs.filter((item) => item.type === filterType);

  return (
    <div
      style={{
        left: "100px",
        background: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        paddingTop: "140px",
        paddingLeft: "120px",
        minHeight: "100vh",
      }}
    >
      {/* Heading */}
      <div>
        <h1
          style={{
            fontWeight: 600,
            fontSize: "36px",
            color: "#FFFFFF",
            marginLeft: "24px",
          }}
        >
          Jobs and Internships
        </h1>

        <p
          style={{
            fontWeight: 400,
            fontSize: "16px",
            opacity: 0.9,
            marginTop: "4px",
            marginLeft: "24px",
          }}
        >
          Access and Manage your Jobs and Internships
        </p>
      </div>

      {/* Top Bar */}
      <div
        style={{
          width: "1160px",
          height: "72px",
          marginTop: "40px",
          marginLeft: "20px",
          borderRadius: "10px",
          background: "linear-gradient(90.19deg, #323232 0%, #0F0F0F 59.13%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "4px",
          paddingLeft: "30px",
        }}
      >
        <div>
          <p style={{ fontSize: "20px", fontWeight: 400, marginBottom: "2px" }}>
            Total Openings
          </p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 500,
              marginTop: 0,
              marginBottom: "10px",
            }}
          >
            {filteredJobs.length}
          </p>
        </div>

        {/* Filter */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginLeft: "500px",
              padding: "10px 20px",
              background: "#3D3D3D",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <span>Type: {filterType}</span>
            <ChevronDown size={18} />
          </div>

          {showTypeDropdown && (
            <div
              style={{
                position: "absolute",
                top: "48px",
                width: "150px",
                marginLeft: "500px",
                background: "#2B2B2B",
                borderRadius: "10px",
                overflow: "hidden",
                zIndex: 20,
              }}
            >
              {["All", "Job", "Internship"].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setFilterType(item);
                    setShowTypeDropdown(false);
                  }}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Job Button */}
        <button
          onClick={() => setShowAddPopup(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#525252",
            color: "#FFFFFF",
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          <Plus size={18} />
          Add Job / Internship
        </button>
      </div>

      {/* Cards */}
      <div
        style={{
          width: "100px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          marginLeft: "50px",
          marginTop: "50px",
          marginBottom: "100px",
        }}
      >
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            style={{
              width: "330px",
              height: "280px",
              borderRadius: "12px",
              border: "1px solid #FFFFFF33",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "20px",
              background:
                "radial-gradient(196% 302% at 6% 25%, #101010 0%, #595959 100%)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p style={{ fontSize: "24px", fontWeight: 600, marginBottom: 0 }}>
              {job.companyName}
            </p>
            <p style={{ fontSize: "16px", marginTop: 0 }}>{job.type}</p>
            <p style={{ fontSize: "18px", fontWeight: 500, marginTop: "5px" }}>
              {job.roleTitle}
            </p>
            <p style={{ fontSize: "16px", marginTop: "5px" }}>{job.ctcOrStipend}</p>

            <p style={{ fontSize: "14px", marginTop: "5px", cursor: "pointer" }}>
              Website –{" "}
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#5FA8FF" }}
              >
                {job.companyName}
              </a>
            </p>

            <button
              onClick={() => handleDelete(job._id)}
              style={{
                width: "120px",
                height: "34px",
                borderRadius: "10px",
                background: "#666",
                color: "white",
                border: "none",
                cursor: "pointer",
                marginTop: "auto",
                marginLeft: "auto",
              }}
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        ))}
      </div>

      {showAddPopup && (
        <AddJob
          onClose={() => setShowAddPopup(false)}
          onSave={handleSaveJob}
          reload={loadJobs}
        />
      )}
    </div>
  );
}
