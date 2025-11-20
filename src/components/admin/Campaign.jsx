import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import AddCampaign from "./AddCampaign";

import { getBanners, deleteBanner } from "../../api/campaign";

export default function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
  getBanners()
    .then((res) => {
      setCampaigns(
        res.data.banners.map((b) => ({
          id: b._id,
          img: b.image,
          title: b.title,
        }))
      );
    })
    .catch((err) => console.error("Error loading campaigns:", err));
}, []);

  // Add new campaign to UI
  const handleAddCampaign = (newCampaign) => {
    setCampaigns((prev) => [...prev, newCampaign]);
    setShowAddModal(false);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
  try {
    await deleteBanner(id);
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  } catch (err) {
    console.error(err);
  }
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
        <h1
          style={{
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "100%",
            color: "#FFFFFF",
            marginLeft: "24px",
          }}
        >
          Campaigns & Announcements
        </h1>
        <p
          style={{
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "10%",
            color: "#FFFFFF",
            opacity: 0.9,
            marginTop: "4px",
            marginLeft: "24px",
          }}
        >
          Create and manage your marketing campaigns and announcements
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
            Total Campaigns
          </p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 500,
              marginTop: "0",
              marginBottom: "10px",
            }}
          >
            {campaigns.length}
          </p>
        </div>

        {/* Add Campaign Button */}
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#525252",
            color: "#FFFFFF",
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            padding: "10px 10px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          <Plus size={18} />
          Add Campaigns
        </button>
      </div>

      {/* Campaign Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          marginLeft: "50px",
          marginTop: "50px",
          marginBottom: "80px",
          width: "fit-content",
        }}
      >
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            style={{
              width: "340px",
              height: "320px",
              background: "#343434",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src={campaign.img}
              alt={campaign.title}
              style={{
                width: "345px",
                height: "179px",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />

            <h3
              style={{
                fontSize: "18px",
                fontWeight: 500,
                marginTop: "4px",
                marginBottom: "8px",
              }}
            >
              {campaign.title}
            </h3>

            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(255,255,255,0.1)",
              }}
            ></div>

            <button
              onClick={() => handleDelete(campaign.id)}
              style={{
                width: "80px",
                height: "34px",
                borderRadius: "10px",
                background: "#525252",
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
        ))}
      </div>

      {/* Add Campaign Modal */}
      {showAddModal && (
        <AddCampaign
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCampaign}
        />
      )}
    </div>
  );
}
