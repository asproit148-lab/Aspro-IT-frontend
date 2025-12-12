import React, { useEffect, useState, useCallback } from "react";
import { Edit3, Trash2, Plus } from "lucide-react";
import AddCoupon from "../../components/admin/AddCoupon";
import { getAllCoupons, deleteCoupon } from "../../api/coupon";

// Define the mobile breakpoint (as a constant outside the component)
const MOBILE_BREAKPOINT = 768;

// Helper function for consistent date formatting
const formatDate = (dateString) => {
    // Only return the date part (YYYY-MM-DD) or 'N/A'
    return dateString ? String(dateString).split("T")[0] : 'N/A';
};

export default function CouponManagement() {
    const [coupons, setCoupons] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingData, setEditingData] = useState(null);
    
    // OPTIMIZATION: Use state only for the derived boolean value
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
    );

    // --- FUNCTIONAL HANDLERS (using useCallback for stability) ---

    // 1. Data Fetcher (Stable function for useEffect dependency)
    const loadCoupons = useCallback(async () => {
        try {
            const res = await getAllCoupons();
            let fetchedCoupons = res.coupons || [];
            fetchedCoupons.reverse();
            setCoupons(res.coupons || []);
        } catch (err) {
            console.error("Failed to load coupons:", err);
            // Consider more user-friendly error handling here
            alert("Failed to load coupons");
        }
    }, []); // Empty dependency array means this function is created once

    // 2. Delete Handler (Stable function)
    const handleDelete = useCallback(async (id) => {
        if (!window.confirm("Are you sure you want to delete this coupon?")) return;

        try {
            await deleteCoupon(id);
            // OPTIMIZATION: Instead of refetching ALL, use functional update to remove the item
            setCoupons(prev => prev.filter(coupon => coupon._id !== id));
            // If refetching is required for complex sync logic, use the original `loadCoupons()` call instead.
        } catch (err) {
            console.error("Failed to delete coupon:", err);
            alert("Failed to delete coupon");
        }
    }, []);

    // 3. Edit Handler (Stable function)
    const handleEdit = useCallback((coupon) => {
        setEditingData(coupon);
        setShowModal(true);
    }, []);

    // 4. Modal Closer (Stable function)
    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        setEditingData(null);
    }, []);

    // --- EFFECTS ---

    // 1. Initial Data Fetch
    useEffect(() => {
        loadCoupons();
    }, [loadCoupons]); // Dependency on stable loadCoupons

    // 2. Screen size tracking for responsiveness
    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
            // Only update state if the derived value changes (crossing breakpoint)
            setIsMobile(prev => (prev !== newIsMobile ? newIsMobile : prev));
        };
        
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    // --- RENDER START (Preserving original inline styles) ---

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
            <div style={{ padding: isMobile ? '0' : '0 0 0 24px' }}>
                <h1
                    style={{
                        fontWeight: 600,
                        fontSize: isMobile ? "28px" : "36px",
                        color: "#FFFFFF",
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
                    }}
                >
                    Create and manage discount coupons for your courses
                </p>
            </div>

            {/* Top Bar (Total Coupons & Add Button) */}
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
                        setEditingData(null); // Ensure no coupon is selected for Add mode
                        setShowModal(true);
                    }}
                >
                    <Plus size={isMobile ? 16 : 18} />
                    {isMobile ? "Add" : "Add Coupon"}
                </button>
            </div>

            {/* Table / Mobile Cards Container */}
            <div
                style={{
                    marginTop: isMobile ? "30px" : "50px",
                    marginLeft: isMobile ? "0" : "20px",
                    width: "100%", // Use 100% of parent container
                    maxWidth: isMobile ? '100%' : '1200px', // Match max width of the top bar
                    background: "#282727",
                    borderRadius: "10px",
                    padding: isMobile ? "10px 15px" : "10px 50px",
                    boxSizing: 'border-box',
                }}
            >
                {/* Header (Hidden on Mobile) */}
                {!isMobile && (
                    <div
                        style={{
                            display: "grid",
                            // Adjusted grid layout for better spacing and center alignment on desktop
                            gridTemplateColumns: "1fr 1fr 1fr 100px", 
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
                    coupons.map((coupon, index) => (
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
                                    borderLeft: '4px solid #3D7EFF',
                                    // Remove bottom border on the last item for cleaner list ending
                                    borderBottom: (index === coupons.length - 1 && !isMobile) ? 'none' : undefined, 
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
                                    gridTemplateColumns: "1fr 1fr 1fr 100px",
                                    alignItems: "center",
                                    justifyItems: "center",
                                    padding: "20px 0px",
                                    color: "#FFFFFF",
                                    fontSize: "16px",
                                    borderBottom: (index === coupons.length - 1) ? 'none' : "1px solid rgba(255,255,255,0.05)",
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
                    onClose={handleCloseModal} // Use the stable handler
                    existingData={editingData}
                    onSaved={loadCoupons} // Recovers all coupons after successful save/update
                />
            )}
        </div>
    );
}