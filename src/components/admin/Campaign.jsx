import React, { useState, useEffect, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
import AddCampaign from "./AddCampaign"; // Assuming AddCampaign handles form submission and saving
import { getBanners, deleteBanner } from "../../api/campaign"; // Renamed getBanners to fetchBanners for clarity, but kept the original for import simplicity

// Define breakpoints
const largeBreakpoint = 1200; 
const tabletBreakpoint = 768;

// Styles for the section heading/description
const headingSectionStyle = (isMobile) => ({
    padding: isMobile ? '0' : '0 0 0 4px',
});

// Styles for the delete button
const deleteButtonStyle = (isMobile) => ({
    width: isMobile ? "75px" : "85px",
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
    alignSelf: 'flex-start',
    transition: 'background 0.2s ease',
});


export default function Campaign() {
    const [campaigns, setCampaigns] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const isMobile = screenWidth < tabletBreakpoint;

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch campaigns function wrapped in useCallback
    const fetchCampaigns = useCallback(async () => {
        try {
            const res = await getBanners(); // Using original imported function name
            
            let loadedCampaigns = (res.data.banners || []).map((b) => ({
                id: b._id,
                img: b.image,
                title: b.title,
            }));
            
            // 🚀 FIX APPLIED: Reverse the array to display newest items first.
            loadedCampaigns.reverse(); 
            
            setCampaigns(loadedCampaigns);
        } catch (err) {
            console.error("Error loading campaigns:", err);
            // Optional: Set a state for error message
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    const handleAddCampaign = (newCampaign) => {
        setCampaigns((prev) => [newCampaign, ...prev]); 
        setShowAddModal(false);
    };

    // Delete Handler
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this campaign/banner?")) return;
        try {
            await deleteBanner(id);
            // Optimistically remove from UI
            setCampaigns((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
            // Re-fetch on severe error, or show error message
            // fetchCampaigns();
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
                // Adjusted width to be based on the screen size, considering the sidebar area
                width: isMobile ? '100%' : 'calc(100% - 140px)', 
                marginLeft: isMobile ? "0" : "30px",
                background: "black",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                paddingTop: isMobile ? "80px" : "130px",
                paddingLeft: isMobile ? "20px" : "120px",
                paddingRight: isMobile ? "20px" : "20px",
                minHeight: "100vh",
                marginBottom: "50px",
                boxSizing: 'border-box',
                // Removed the fixed width from original for better centering/flexibility
            }}
        >
            {/* Heading */}
            <div style={headingSectionStyle(isMobile)}>
                <h1
                    style={{
                        fontWeight: 600,
                        fontSize: isMobile ? "28px" : "36px",
                        color: "#FFFFFF",
                        marginBottom: 0,
                        marginTop: 0,
                    }}
                >
                    Campaigns & Announcements
                </h1>
                <p
                    style={{
                        fontWeight: 400,
                        fontSize: isMobile ? "14px" : "16px",
                        color: "#FFFFFF",
                        opacity: 0.9,
                        marginTop: isMobile ? "8px" : "4px",
                    }}
                >
                    Create and manage your marketing campaigns and announcements.
                </p>
            </div>

            {/* Top Bar (Total Campaigns and Add Button) */}
            <div
                style={{
                    width: "100%", // Use 100% of parent container
                    maxWidth: isMobile ? '100%' : '1300px', // Set a max-width for cleaner look on desktop
                    height: isMobile ? "60px" : "72px",
                    marginTop: isMobile ? "30px" : "40px",
                    marginLeft: isMobile ? "0" : "20px",
                    borderRadius: "10px",
                    background: "linear-gradient(90.19deg, #323232 0%, #0F0F0F 59.13%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: isMobile ? "0 15px" : "0 30px 4px 30px",
                    boxSizing: 'border-box',
                }}
            >
                <div>
                    <p style={{
                        fontSize: isMobile ? "16px" : "20px",
                        fontWeight: 400,
                        marginBottom: "2px",
                        lineHeight: '1.2' // Improved line height
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
                        padding: isMobile ? "8px 12px" : "10px 16px", 
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                    }}
                >
                    <Plus size={isMobile ? 16 : 18} />
                    {isMobile ? "Add" : "Add Campaign"}
                </button>
            </div>

            {/* Campaign Cards Grid */}
            <div
                style={{
                    width: "100%", 
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: isMobile ? "20px" : "30px",
                    marginTop: isMobile ? "30px" : "50px",
                    boxSizing: 'border-box',
                    padding: isMobile ? '0' : '0 20px',
                }}
            >
                {campaigns.length > 0 ? (
                    campaigns.map((campaign) => (
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
                                    marginTop: "12px", 
                                    marginBottom: "12px", 
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {campaign.title}
                            </h3>

                            <div
                                style={{
                                    width: "100%",
                                    height: "1px",
                                    background: "rgba(255,255,255,0.1)",
                                    marginBottom: '12px'
                                }}
                            ></div>

                            <button
                                onClick={() => handleDelete(campaign.id)}
                                style={deleteButtonStyle(isMobile)}
                            >
                                <Trash2 size={isMobile ? 16 : 18} />
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.7, marginTop: '30px', fontSize: '18px' }}>
                        No campaigns found. Click "Add Campaign" to create one.
                    </p>
                )}
            </div>

            {/* Popup/Modal */}
            {showAddModal && (
                <AddCampaign
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddCampaign}
                />
            )}
        </div>
    );
}