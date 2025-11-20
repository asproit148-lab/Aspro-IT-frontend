import React, { useState, useEffect } from "react";
import { Plus, Eye, Trash2 } from "lucide-react";
import AddResource from "../../components/admin/AddResource";
import {
  addResource as addResourceAPI,
  getAllResources,
  deleteResource as deleteResourceAPI,
} from "../../api/resource";

export default function ResourceManagement() {
  const [resources, setResources] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch all resources from backend
  const fetchResources = async () => {
    try {
      const allResources = await getAllResources(); // returns array directly
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
        <h1 style={{ fontWeight: 600, fontSize: "36px", color: "#FFFFFF", marginLeft: "24px", marginBottom: 0 }}>
          Resources
        </h1>
        <p style={{ fontWeight: 400, fontSize: "16px", color: "#FFFFFF", opacity: 0.9, marginTop: "4px", marginLeft: "24px" }}>
          Manage and access all course-related study materials and notes
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
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
      >
        <div>
          <p style={{ fontSize: "20px", fontWeight: 400, marginBottom: "2px" }}>Total Resources</p>
          <p style={{ fontSize: "24px", fontWeight: 500, marginTop: "0", marginBottom: "10px" }}>{resources.length}</p>
        </div>

        <button
          onClick={() => setShowPopup(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#525252",
            color: "#FFFFFF",
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            padding: "10px 12px",
            cursor: "pointer",
          }}
        >
          <Plus size={18} />
          Add Resource
        </button>
      </div>

      {/* Resource Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginLeft: "50px",
          marginTop: "50px",
          marginBottom: "100px",
        }}
      >
        {resources.map((res) => (
          <div
            key={res._id}
            style={{
              width: "340px",
              minHeight: "150px",
              background: "#343434",
              borderRadius: "20px",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "8px" }}>{res.title}</h3>
              <p
                style={{
                  fontSize: "15px",
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

            <div style={{ display: "flex", justifyContent: "center", gap: "80px", marginTop: "16px" }}>
              <button
                onClick={() => handleViewResource(res.url)}
                style={{
                  width: "130px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#4254A5",
                  color: "#E3E3E3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Eye size={20} />
                View Resource
              </button>

              <button
                onClick={() => handleDeleteResource(res._id)}
                style={{
                  width: "100px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#373D48",
                  color: "#E3E3E3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={20} />
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
            setShowPopup(false);
          }}
        />
      )}
    </div>
  );
}
