import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import AddJob from "./AddJob";

import {
  getAllOpportunities,
  deleteOpportunity,
} from "../../api/job";

const LARGE_BREAKPOINT = 1200;
const TABLET_BREAKPOINT = 768;

const getColumnCount = (width) => {
  if (width < TABLET_BREAKPOINT) return 1;
  if (width < LARGE_BREAKPOINT) return 2;
  return 3;
};

export default function JobManagement() {
  const [filterType, setFilterType] = useState("All");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [jobs, setJobs] = useState([]);
  
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < TABLET_BREAKPOINT : false
  );
  const [columns, setColumns] = useState(
    typeof window !== "undefined" ? getColumnCount(window.innerWidth) : 3
  );

  const loadJobs = useCallback(async () => {
    try {
      const res = await getAllOpportunities();
      if (res?.success) {

        setJobs(res.data);
      }
    } catch (err) {
      console.log("Error loading jobs:", err);
    }
  }, []); 

  // Data Filtering 
  const filteredJobs = useMemo(() => {
    return filterType === "All"
      ? jobs
      : jobs.filter((item) => item.type === filterType);
  }, [jobs, filterType]); // Recalculates only when jobs or the filter changes

  // Delete Handler 
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Delete this opportunity?")) return;

    try {
      await deleteOpportunity(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.log("Delete failed:", err);
    }
  }, []); // Empty dependency array means this function is stable

  // Add Handler 
  const handleSaveJob = useCallback((newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  }, []);

  // Effect for Fetching and Responsive Resize Handling
  useEffect(() => {
    // Initial Data Fetch
    loadJobs();

    const handleResize = () => {
      const width = window.innerWidth;
      const newIsMobile = width < TABLET_BREAKPOINT;
      const newColumns = getColumnCount(width);

      if (newIsMobile !== isMobile) setIsMobile(newIsMobile);
      if (newColumns !== columns) setColumns(newColumns);
    };

    // Initial setup and listener
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loadJobs, isMobile, columns]); // Dependencies ensure stability of the effect

  return (
    <div
      style={{
        background: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        boxSizing: 'border-box',
        marginLeft: isMobile ? "0" : "30px",
        paddingTop: isMobile ? "80px" : "140px",
        paddingLeft: isMobile ? "20px" : "120px",
        paddingRight: isMobile ? "20px" : "20px",
        paddingBottom: "100px",
        width: isMobile ? '100%' : 'calc(100% - 100px)',
      }}
    >
      {/* Heading */}
      <div style={{ padding: isMobile ? '0' : '0 0 0 24px' }}>
        <h1
          style={{
            fontWeight: 600,
            fontSize: isMobile ? "28px" : "36px",
            color: "#FFFFFF",
            marginLeft: isMobile ? "0" : "0",
            marginBottom: isMobile ? "4px" : "8px",
            marginTop: 0,
          }}
        >
          Jobs and Internships
        </h1>

        <p
          style={{
            fontWeight: 400,
            fontSize: isMobile ? "14px" : "16px",
            opacity: 0.9,
            marginTop: isMobile ? "0" : "4px",
            marginLeft: isMobile ? "0" : "0",
            marginBottom: isMobile ? "20px" : "0",
          }}
        >
          Access and Manage your Jobs and Internships
        </p>
      </div>

      {/* Top Bar */}
      <div
        style={{
          width: isMobile ? "100%" : "100%",
          height: isMobile ? "auto" : "72px",
          marginTop: isMobile ? "30px" : "40px",
          marginLeft: isMobile ? "0" : "20px",
          borderRadius: "10px",
          background: "linear-gradient(90.19deg, #323232 0%, #0F0F0F 59.13%)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          padding: isMobile ? "15px" : "0 30px 4px 30px",
          boxSizing: 'border-box',
          gap: isMobile ? "10px" : "0",
        }}
      >
        <div>
          <p
            style={{
              fontSize: isMobile ? "16px" : "20px",
              fontWeight: 400,
              marginBottom: "2px",
              lineHeight: isMobile ? '1' : 'auto'
            }}
          >
            Total Openings
          </p>
          <p
            style={{
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: 500,
              marginTop: isMobile ? "2px" : "0",
              marginBottom: isMobile ? "0" : "10px",
            }}
          >
            {filteredJobs.length}
          </p>
        </div>

        {/* Right side container for Filter and Add Button */}
        <div style={{ display: "flex", gap: isMobile ? "10px" : "20px", width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
          {/* Filter */}
          <div style={{ position: "relative" }}>
            <div
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: isMobile ? "8px 15px" : "10px 20px",
                background: "#3D3D3D",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: isMobile ? "14px" : "16px",
              }}
            >
              <span>Type: {filterType}</span>
              <ChevronDown size={isMobile ? 16 : 18} />
            </div>

            {showTypeDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: isMobile ? "40px" : "48px",
                  width: "150px",
                  right: 0,
                  left: isMobile ? 'auto' : 'auto', // Auto keeps it aligned right on desktop
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
                      background: filterType === item ? "#4A4A4A" : "transparent"
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
              fontSize: isMobile ? "14px" : "16px",
              borderRadius: "10px",
              border: "none",
              padding: isMobile ? "8px 10px" : "10px 20px",
              cursor: "pointer",
            }}
          >
            <Plus size={isMobile ? 16 : 18} />
            {isMobile ? "Add" : "Add Job / Internship"}
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          width: isMobile ? "100%" : "90%",
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: isMobile ? "20px" : "30px",
          marginLeft: isMobile ? "0" : "50px",
          marginTop: isMobile ? "30px" : "50px",
          marginBottom: "100px",
          boxSizing: 'border-box',
          alignItems: 'stretch',
        }}
      >
        {/* Use the filtered list here */}
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            style={{
              width: "100%",
              height: "auto",
              minHeight: isMobile ? "220px" : "280px",
              borderRadius: "12px",
              border: "1px solid #FFFFFF33",
              padding: isMobile ? "15px" : "20px",
              background:
                "radial-gradient(196% 302% at 6% 25%, #101010 0%, #595959 100%)",
              display: "flex",
              flexDirection: "column",
              boxSizing: 'border-box',
            }}
          >
            <p
              style={{
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: 600,
                marginBottom: isMobile ? "0px" : "0",
                marginTop: 0
              }}
            >
              {job.companyName}
            </p>
            <p
              style={{
                fontSize: isMobile ? "14px" : "16px",
                marginTop: "0",
                marginBottom: isMobile ? "10px" : "10px",
              }}
            >
              {job.type}
            </p>
            <p
              style={{
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: 500,
                marginTop: isMobile ? "5px" : "5px",
                marginBottom: isMobile ? "5px" : "5px",
              }}
            >
              {job.roleTitle}
            </p>
            <p
              style={{
                fontSize: isMobile ? "14px" : "16px",
                marginTop: isMobile ? "5px" : "5px",
                marginBottom: isMobile ? "10px" : "10px",
              }}
            >
              {job.ctcOrStipend}
            </p>

            <p
              style={{
                fontSize: isMobile ? "12px" : "14px",
                marginTop: "5px",
                cursor: "pointer",
                marginBottom: isMobile ? "15px" : "10px",
              }}
            >
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
                width: isMobile ? "100px" : "120px",
                height: isMobile ? "30px" : "34px",
                borderRadius: "10px",
                background: "#666",
                color: "white",
                border: "none",
                cursor: "pointer",
                marginTop: "auto",
                marginLeft: isMobile ? 'auto' : "auto",
                marginRight: isMobile ? 'auto' : "0",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                fontSize: isMobile ? '14px' : '16px',
              }}
            >
              <Trash2 size={isMobile ? 14 : 16} /> Delete
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