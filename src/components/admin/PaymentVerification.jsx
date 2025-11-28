import React, { useState, useEffect } from "react";
import { CircleCheckBig, CircleX } from "lucide-react";
import { getPendingPayments, approvePayment, rejectPayment } from "../../api/payment";

// Define breakpoints
const largeBreakpoint = 1200; // For 3 columns to 2 columns
const tabletBreakpoint = 768; // For 2 columns to 1 column

export default function PaymentVerification() {
    const [pending, setPending] = useState([]);
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
        loadPending();
    }, []);

    const loadPending = async () => {
        try {
            const res = await getPendingPayments();
            setPending(res.payments || []);
        } catch (err) {
            console.log("Error fetching pending payments:", err);
        }
    };

    const handleApprove = async (paymentId) => {
        if (!window.confirm("Confirm to approve payment?")) return;

        try {
            await approvePayment(paymentId);
            loadPending();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to approve");
        }
    };

    const handleReject = async (paymentId) => {
        if (!window.confirm("Reject this student's payment?")) return;

        try {
            await rejectPayment(paymentId);
            loadPending();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to reject");
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
                background: "black",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                minHeight: "100vh",
                boxSizing: 'border-box',
                
                // ⬅️ CRUCIAL: Responsive container adjustments
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
                        // ⬅️ ADJUSTED: Smaller font size on mobile
                        fontSize: isMobile ? "28px" : "36px", 
                        lineHeight: "100%",
                        color: "#FFFFFF",
                        // ⬅️ CRUCIAL: Remove fixed left margin on mobile
                        marginLeft: isMobile ? "0" : "0", 
                        marginTop: 0,
                    }}
                >
                    Payment Verification
                </h1>
                <p
                    style={{
                        fontWeight: 400,
                        // ⬅️ ADJUSTED: Smaller font size on mobile
                        fontSize: isMobile ? "14px" : "16px", 
                        // ⬅️ ADJUSTED: Line height for better spacing
                        lineHeight: isMobile ? "100%" : "100%", 
                        color: "#FFFFFF",
                        opacity: 0.9,
                        marginTop: isMobile ? "8px" : "12px",
                        // ⬅️ CRUCIAL: Remove fixed left margin on mobile
                        marginLeft: isMobile ? "0" : "0", 
                        marginBottom: isMobile ? "20px" : "0",
                    }}
                >
                    Review pending payments and approve or reject student submissions
                </p>
            </div>

            {/* Top Bar (Pending Count) */}
            <div
                style={{
                    // ⬅️ CRUCIAL: Responsive width/margin adjustments
                    width: isMobile ? "100%" : "90%",
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
                    <p 
                        style={{ 
                            fontSize: isMobile ? "16px" : "20px", 
                            fontWeight: 400, 
                            marginBottom: "2px",
                            lineHeight: isMobile ? '1' : 'auto'
                        }}
                    >
                        Pending Verifications
                    </p>
                    <p 
                        style={{ 
                            fontSize: isMobile ? "20px" : "24px", 
                            fontWeight: 500, 
                            margin: 0,
                            marginTop: isMobile ? "2px" : "0",
                            marginBottom: isMobile ? "0" : "10px",
                        }}
                    >
                        {pending.length}
                    </p>
                </div>
                {/* No button here, keeping structure aligned with Campaigns/Blogs if one were added later */}
            </div>

            {/* Pending Cards Grid */}
            <div
                style={{
                    // ⬅️ CRUCIAL: Responsive width/margin adjustments
                    width: isMobile ? "100%" : "90%",
                    display: "grid",
                    // ⬅️ CRUCIAL: Dynamic columns
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: isMobile ? "20px" : "30px",
                    marginLeft: isMobile ? "0" : "50px",
                    marginTop: isMobile ? "30px" : "50px",
                    marginBottom: "100px",
                    boxSizing: 'border-box',
                }}
            >
                {pending.map((item) => (
                    <div
                        key={item._id}
                        style={{
                            // ⬅️ CRUCIAL: Card width must be 100% of the grid cell
                            width: "100%", 
                            // ⬅️ ADJUSTED: Reduced height on mobile, use min-height for flexibility
                            minHeight: isMobile ? "300px" : "350px", 
                            background: "#343434",
                            borderRadius: "20px",
                            // ⬅️ ADJUSTED: Reduced padding on mobile
                            padding: isMobile ? "15px" : "20px", 
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                            boxSizing: 'border-box',
                        }}
                    >
                        <img
                            src={item.paymentScreenshot}
                            alt="proof"
                            style={{
                                width: "100%",
                                // ⬅️ ADJUSTED: Reduced image height on mobile
                                height: isMobile ? "150px" : "179px", 
                                borderRadius: "16px",
                                objectFit: "cover",
                            }}
                        />

                        <div>
                            <h3
                                style={{
                                    // ⬅️ ADJUSTED: Smaller font size on mobile
                                    fontSize: isMobile ? "16px" : "18px", 
                                    fontWeight: 500,
                                    marginTop: isMobile ? "8px" : "12px",
                                    marginBottom: isMobile ? "4px" : "8px",
                                }}
                            >
                                {item.courseId?.Course_title}
                            </h3>
                            <p
                                style={{
                                    // ⬅️ ADJUSTED: Smaller font size on mobile
                                    fontSize: isMobile ? "14px" : "16px", 
                                    color: "#C9C9C9",
                                    fontWeight: 500,
                                    margin: 0,
                                }}
                            >
                                Student: {item.userId?.name}
                            </p>
                        </div>

                        <div
                            style={{
                                width: "100%",
                                height: "1px",
                                background: "rgba(255,255,255,0.1)",
                                margin: isMobile ? "8px 0" : "10px 0",
                            }}
                        ></div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                // ⬅️ ADJUSTED: Added small gap for mobile buttons
                                gap: isMobile ? "8px" : "10px", 
                            }}
                        >
                            <button
                                onClick={() => handleApprove(item._id)}
                                style={{
                                    // ⬅️ ADJUSTED: Sizing adjustment for mobile
                                    width: isMobile ? "48%" : "100px", 
                                    height: isMobile ? "30px" : "34px",
                                    borderRadius: "10px",
                                    background: "#28A745",
                                    color: "#E3E3E3",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "7px",
                                    border: "none",
                                    cursor: "pointer",
                                    // ⬅️ ADJUSTED: Smaller font size on mobile
                                    fontSize: isMobile ? "14px" : "16px", 
                                }}
                            >
                                <CircleCheckBig size={isMobile ? 16 : 20} />
                                Approve
                            </button>

                            <button
                                onClick={() => handleReject(item._id)}
                                style={{
                                    // ⬅️ ADJUSTED: Sizing adjustment for mobile
                                    width: isMobile ? "48%" : "100px",
                                    height: isMobile ? "30px" : "34px",
                                    borderRadius: "10px",
                                    background: "#DC3545",
                                    color: "#E3E3E3",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "7px",
                                    border: "none",
                                    cursor: "pointer",
                                    // ⬅️ ADJUSTED: Smaller font size on mobile
                                    fontSize: isMobile ? "14px" : "16px",
                                }}
                            >
                                <CircleX size={isMobile ? 16 : 20} />
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}