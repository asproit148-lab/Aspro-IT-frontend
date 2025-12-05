import React, { useState, useEffect } from "react";
import { Plus, Eye, Trash2 } from "lucide-react";
import AddResource from "../../components/admin/AddResource";
import {
  addResource as addResourceAPI,
  getAllResources,
  deleteResource as deleteResourceAPI,
} from "../../api/resource";

// Define breakpoints
const largeBreakpoint = 1200; 
const tabletBreakpoint = 768; 

export default function ResourceManagement() {
  const [resources, setResources] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isMobile = screenWidth < tabletBreakpoint;
  const isTablet = screenWidth < largeBreakpoint;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchResources = async () => {
    try {
      const allResources = await getAllResources(); 
      setResources(allResources);
    } catch (err) {
      console.error("Error fetching resources:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAddResource = async (newResource) => {
    try {
      const formData = new FormData();
      formData.append("title", newResource.title);
      formData.append("description", newResource.description);
      formData.append("filePath", newResource.fileRaw);

      const savedResourceData = await addResourceAPI(formData);
      const savedResource = savedResourceData.resource; // backend returns { message, resource }
      setResources((prev) => [...prev, savedResource]);
      setShowPopup(false);
    } catch (err) {
      console.error("Error adding resource:", err);
    }
  };

  const handleDeleteResource = async (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await deleteResourceAPI(id);
        setResources((prev) => prev.filter((res) => res._id !== id));
      } catch (err) {
        console.error("Error deleting resource:", err);
      }
    }
  };

  const handleViewResource = (link) => {
    window.open(link, "_blank");
  };

  // Determine number of columns based on screen size
  let columns = 3;
  if (screenWidth < largeBreakpoint && screenWidth >= tabletBreakpoint) {
    columns = 2;
  } else if (screenWidth < tabletBreakpoint) {
    columns = 1;
  }

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
          Resources
        </h1>
        <p
          style={{
            fontWeight: 400,
            fontSize: isMobile ? "14px" : "16px",
            color: "#FFFFFF",
            opacity: 0.9,
            marginTop: isMobile ? "0" : "4px",
            marginLeft: isMobile ? "0" : "0",
            marginBottom: isMobile ? "20px" : "0",
          }}
        >
          Manage and access all course-related study materials and notes
        </p>
      </div>

      {/* Top Bar */}
      <div
        style={{
          width: isMobile ? "100%" : "100%",
          height: isMobile ? "60px" : "72px",
          marginTop: isMobile ? "30px" : "40px",
          marginLeft: isMobile ? "0" : "20px",
          borderRadius: "10px",
          background: "linear-gradient(90.19deg, #323232 0%, #0F0F0F 59.13%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 15px" : "0 30px",
          boxSizing: 'border-box',
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
            Total Resources
          </p>
          <p
            style={{
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: 500,
              marginTop: isMobile ? "2px" : "0",
              marginBottom: isMobile ? "0" : "10px",
            }}
          >
            {resources.length}
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
          {isMobile ? "Add" : "Add Resource"}
        </button>
      </div>

      {/* Resource Cards */}
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
        {resources.map((res) => (
          <div
            key={res._id}
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
              boxSizing: 'border-box',
            }}
          >
            {/* Content Area */}
            <div>
              <h3
                style={{
                  fontSize: isMobile ? "16px" : "18px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
              >
                {res.title}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "13px" : "15px",
                  color: "#C9C9C9",
                  lineHeight: "18px",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {res.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: isMobile ? "15px" : "20px",
                marginTop: "16px",
                width: '100%', 
              }}
            >
              <button
                onClick={() => handleViewResource(res.url)}
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
                <Eye size={isMobile ? 16 : 20} />
                {isMobile ? "View" : "View"}
              </button>

              <button
                onClick={() => handleDeleteResource(res._id)}
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
                <Trash2 size={isMobile ? 16 : 20} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Resource Popup */}
      {showPopup && (
        <AddResource
          onClose={() => setShowPopup(false)}
          onSave={(resourceData) => {
            handleAddResource(resourceData);
          }}
        />
      )}
    </div>
  );
}