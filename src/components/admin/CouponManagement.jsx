import React, { useEffect, useState } from "react";
import { Edit3, Trash2, Plus } from "lucide-react";
import AddCoupon from "../../components/admin/AddCoupon";
import { getAllCoupons, deleteCoupon } from "../../api/coupon";

// Define the mobile breakpoint
const mobileBreakpoint = 768;

export default function CouponManagement() {
    const [coupons, setCoupons] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const isMobile = screenWidth < mobileBreakpoint;

    // Effect to track screen size for responsiveness
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const loadCoupons = async () => {
        try {
            const res = await getAllCoupons();
            setCoupons(res.coupons || []);
        } catch (err) {
            console.error(err);
            alert("Failed to load coupons");
        }
    };

    useEffect(() => {
        loadCoupons();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this coupon?")) return;

        try {
            await deleteCoupon(id);
            await loadCoupons();
        } catch (err) {
            console.error(err);
            alert("Failed to delete coupon");
        }
    };

    const handleEdit = (coupon) => {
        setEditingData(coupon);
        setShowModal(true);
    };

    const formatDate = (dateString) => {
        return dateString ? dateString.split("T")[0] : 'N/A';
    };

    // --- Component JSX ---
    return (
        <div
            style={{
                // ⬅️ CRUCIAL: Desktop left offset is 100px, Mobile is 0
                marginLeft: isMobile ? "0" : "30px",
                background: "black",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                // ⬅️ CRUCIAL: Adjust padding top and horizontal padding
                paddingTop: isMobile ? "80px" : "130px",
                paddingLeft: isMobile ? "20px" : "120px",
                paddingRight: isMobile ? "20px" : "20px",
                minHeight: "100vh",
                marginBottom: "50px",
                boxSizing: 'border-box',
                width: isMobile ? '95%' : 'calc(100% - 100px)',
            }}
        >
            {/* Heading */}
            <div style={{ padding: isMobile ? '0' : '0 0 0 24px' }}>
                <h1
                    style={{
                        fontWeight: 600,
                        // ⬅️ ADJUSTED: Smaller font size on mobile
                        fontSize: isMobile ? "28px" : "36px",
                        color: "#FFFFFF",
                        // ⬅️ CRUCIAL: Remove fixed left margin on mobile
                        marginLeft: isMobile ? "0" : "0",
                        marginBottom: 0,
                        marginTop: 0,
                    }}
                >
                    Coupon Management
                </h1>
                <p
                    style={{
                        fontWeight: 400,
                        fontSize: isMobile ? "14px" : "16px",
                        color: "#FFFFFF",
                        opacity: 0.9,
                        marginTop: isMobile ? "8px" : "4px",
                        // ⬅️ CRUCIAL: Remove fixed left margin on mobile
                        marginLeft: isMobile ? "0" : "0",
                    }}
                >
                    Create and manage discount coupons for your courses
                </p>
            </div>

            {/* Top Bar */}
            <div
                style={{
                    // ⬅️ CRUCIAL: Full width on mobile, 90% on desktop, adjust margins
                    width: isMobile ? "100%" : "100%",
                    height: isMobile ? "60px" : "72px",
                    marginTop: isMobile ? "30px" : "40px",
                    // ⬅️ CRUCIAL: Remove fixed left margin on mobile
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
                        Total Coupons
                    </p>
                    <p
                        style={{
                            fontSize: isMobile ? "20px" : "24px",
                            fontWeight: 500,
                            marginTop: isMobile ? "2px" : "0",
                            marginBottom: isMobile ? "0" : "10px",
                        }}
                    >
                        {coupons.length}
                    </p>
                </div>

                <button
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#525252",
                        color: "#FFFFFF",
                        fontSize: isMobile ? "14px" : "16px",
                        borderRadius: "10px",
                        border: "none",
                        padding: isMobile ? "8px 10px" : "10px 10px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                    }}
                    onClick={() => {
                        setEditingData(null);
                        setShowModal(true);
                    }}
                >
                    <Plus size={isMobile ? 16 : 18} />
                    {isMobile ? "Add" : "Add Coupon"}
                </button>
            </div>

            {/* Table / Mobile Cards */}
            <div
                style={{
                    marginTop: isMobile ? "30px" : "50px",
                    // ⬅️ CRUCIAL: Remove fixed left margin on mobile
                    marginLeft: isMobile ? "0" : "50px",
                    // ⬅️ CRUCIAL: Full width on mobile, 80% on desktop
                    width: isMobile ? "100%" : "80%",
                    background: "#282727",
                    borderRadius: "10px",
                    // ⬅️ ADJUSTED: Reduced padding on mobile
                    padding: isMobile ? "10px 15px" : "10px 50px",
                }}
            >
                {/* Header (Hidden on Mobile) */}
                {!isMobile && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1.5fr 1.5fr 1.5fr",
                            padding: "20px 0px",
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: 400,
                            textAlign: "center",
                        }}
                    >
                        <span>Code</span>
                        <span>Discount</span>
                        <span>Expiry Date</span>
                        <span>Actions</span>
                    </div>
                )}

                {/* Rows / Mobile Cards */}
                {coupons.length > 0 ? (
                    coupons.map((coupon) => (
                        // Mobile Card Layout
                        isMobile ? (
                            <div
                                key={coupon._id}
                                style={{
                                    background: "#323232",
                                    borderRadius: "10px",
                                    padding: "15px",
                                    marginBottom: "15px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                    borderLeft: '4px solid #3D7EFF'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: "#3D7EFF", fontWeight: 600, fontSize: '16px' }}>
                                        {coupon.Code}
                                    </span>
                                    <span style={{ fontSize: '16px', fontWeight: 500 }}>
                                        {coupon.Discount}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#CCCCCC' }}>
                                    <span>Expiry:</span>
                                    <span>{formatDate(coupon.Expiry_date)}</span>
                                </div>

                                <div style={{ display: "flex", gap: "10px", marginTop: '10px', justifyContent: 'flex-end' }}>
                                    <button
                                        style={{
                                            width: "36px",
                                            height: "35px",
                                            borderRadius: "10px",
                                            background: "#373D48",
                                            border: "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onClick={() => handleEdit(coupon)}
                                    >
                                        <Edit3 size={14} color="#E3E3E3" />
                                    </button>

                                    <button
                                        style={{
                                            width: "36px",
                                            height: "35px",
                                            borderRadius: "10px",
                                            background: "#373D48",
                                            border: "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onClick={() => handleDelete(coupon._id)}
                                    >
                                        <Trash2 size={14} color="#E3E3E3" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Desktop/Tablet Grid Row Layout
                            <div
                                key={coupon._id}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1.5fr 1.5fr 1.5fr",
                                    alignItems: "center",
                                    justifyItems: "center",
                                    padding: "20px 0px",
                                    color: "#FFFFFF",
                                    fontSize: "16px",
                                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                                }}
                            >
                                <span style={{ color: "#3D7EFF", fontWeight: 500 }}>
                                    {coupon.Code}
                                </span>
                                <span>{coupon.Discount}</span>
                                <span>{formatDate(coupon.Expiry_date)}</span>

                                <div style={{ display: "flex", gap: "8px" }}>
                                    <button
                                        style={{
                                            width: "36px",
                                            height: "35px",
                                            borderRadius: "10px",
                                            background: "#373D48",
                                            border: "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onClick={() => handleEdit(coupon)}
                                    >
                                        <Edit3 size={14} color="#E3E3E3" />
                                    </button>

                                    <button
                                        style={{
                                            width: "36px",
                                            height: "35px",
                                            borderRadius: "10px",
                                            background: "#373D48",
                                            border: "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onClick={() => handleDelete(coupon._id)}
                                    >
                                        <Trash2 size={14} color="#E3E3E3" />
                                    </button>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <div style={{ padding: '30px', textAlign: 'center', color: '#CCCCCC' }}>
                        No coupons found. Click "Add Coupon" to create one.
                    </div>
                )}
            </div>

            {/* Add/Edit Coupon Modal */}
            {showModal && (
                <AddCoupon
                    onClose={() => {
                        setShowModal(false);
                        setEditingData(null);
                    }}
                    existingData={editingData}
                    onSaved={loadCoupons}
                />
            )}
        </div>
    );
}