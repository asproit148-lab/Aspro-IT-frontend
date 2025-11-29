import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import AddCampaign from "./AddCampaign";

import { getBanners, deleteBanner } from "../../api/campaign";

// Define breakpoints
const largeBreakpoint = 1200; 
const tabletBreakpoint = 768;

export default function Campaign() {
    const [campaigns, setCampaigns] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const isMobile = screenWidth < tabletBreakpoint;
    const isTablet = screenWidth < largeBreakpoint;

    // Effect to track screen size for responsiveness
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                marginLeft: isMobile ? "0" : "30px", 
                background: "black",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                paddingTop: isMobile ? "80px" : "140px", 
                paddingLeft: isMobile ? "20px" : "120px", 
                paddingRight: isMobile ? "20px" : "20px",
                paddingBottom: "100px",
                minHeight: "100vh",
                boxSizing: 'border-box',
                width: isMobile ? '100%' : 'calc(100% - 100px)',
            }}
        >
            {/* Heading */}
            <div style={{ padding: isMobile ? '0' : '0 0 0 24px' }}>
                <h1
                    style={{
                        fontWeight: 600,
                        fontSize: isMobile ? "28px" : "36px", 
                        lineHeight: "100%",
                        color: "#FFFFFF",
                        marginLeft: isMobile ? "0" : "0", 
                        marginTop: 0,
                    }}
                >
                    Campaigns & Announcements
                </h1>
                <p
                    style={{
                        fontWeight: 400,
                        fontSize: isMobile ? "14px" : "16px",
                        lineHeight: "100%",
                        color: "#FFFFFF",
                        opacity: 0.9,
                        marginTop: isMobile ? "8px" : "12px",
                        marginLeft: isMobile ? "0" : "0", 
                    }}
                >
                    Create and manage your marketing campaigns and announcements
                </p>
            </div>

            {/* Top Bar (Total Campaigns) */}
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
                    padding: isMobile ? "0 15px" : "0 30px 4px 30px", // Adjusted padding for mobile
                    boxSizing: 'border-box',
                }}
            >
                <div>
                    <p style={{ 
                        fontSize: isMobile ? "16px" : "20px", 
                        fontWeight: 400, 
                        marginBottom: "2px",
                        lineHeight: isMobile ? '1' : 'auto'
                    }}>
                        Total Campaigns
                    </p>
                    <p
                        style={{
                            fontSize: isMobile ? "20px" : "24px",
                            fontWeight: 500,
                            marginTop: isMobile ? "2px" : "0",
                            marginBottom: isMobile ? "0" : "10px",
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
                        fontSize: isMobile ? "14px" : "16px",
                        borderRadius: "10px",
                        border: "none",
                        padding: isMobile ? "8px 10px" : "10px 10px", // Smaller padding on mobile
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                    }}
                >
                    <Plus size={isMobile ? 16 : 18} />
                    {isMobile ? "Add" : "Add Campaigns"}
                </button>
            </div>

            {/* Campaign Cards Grid */}
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
                }}
            >
                {campaigns.map((campaign) => (
                    <div
                        key={campaign.id}
                        style={{
                            width: "100%", 
                            height: isMobile ? "280px" : "320px", 
                            background: "#343434",
                            borderRadius: "20px",
                            padding: isMobile ? "15px" : "20px", 
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                            boxSizing: 'border-box',
                        }}
                    >
                        <img
                            src={campaign.img}
                            alt={campaign.title}
                            style={{
                                width: "100%",
                                height: isMobile ? "140px" : "179px", 
                                borderRadius: "16px",
                                objectFit: "cover",
                            }}
                        />

                        <h3
                            style={{
                                fontSize: isMobile ? "16px" : "18px",
                                fontWeight: 500,
                                marginTop: "8px", // Adjusted margin up
                                marginBottom: "4px", // Adjusted margin down
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
                                width: isMobile ? "70px" : "80px", // Smaller button on mobile
                                height: isMobile ? "30px" : "34px",
                                borderRadius: "10px",
                                background: "#525252",
                                color: "#E3E3E3",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "7px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: isMobile ? "12px" : "14px",
                                alignSelf: 'flex-start' // Ensure button is always left-aligned
                            }}
                        >
                            <Trash2 size={isMobile ? 16 : 20} />
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {showAddModal && (
                <AddCampaign
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddCampaign}
                />
            )}
        </div>
    );
}