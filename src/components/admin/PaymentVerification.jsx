import React, { useState, useEffect, useCallback } from "react";
import { CircleCheckBig, CircleX } from "lucide-react";
import { getPendingPayments, approvePayment, rejectPayment } from "../../api/payment";

// Define breakpoints (Constant, moved outside component)
const LARGE_BREAKPOINT = 1200; 
const TABLET_BREAKPOINT = 768; 

// Helper function for responsive columns
const getColumnCount = (width) => {
    if (width < TABLET_BREAKPOINT) return 1;
    if (width < LARGE_BREAKPOINT) return 2;
    return 3;
};

export default function PaymentVerification() {
    const [pending, setPending] = useState([]);
    
    // OPTIMIZATION: Use calculated states instead of raw screenWidth state
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < TABLET_BREAKPOINT : false
    );
    const [columns, setColumns] = useState(
        typeof window !== "undefined" ? getColumnCount(window.innerWidth) : 3
    );

    // 1. Data Fetching (useCallback): Stable function for fetching data
    const loadPending = useCallback(async () => {
        try {
            const res = await getPendingPayments();
            // OPTIMIZATION: Assuming LCFS (Latest Confirmed First) is desired, otherwise keep original order
            setPending(res.payments || []);
        } catch (err) {
            console.log("Error fetching pending payments:", err);
            // Consider showing a user-friendly error message here
        }
    }, []); // Empty dependency array means this function is stable

    // 2. Approve Handler (useCallback): Updates state directly on success
    const handleApprove = useCallback(async (paymentId) => {
        if (!window.confirm("Confirm to approve payment?")) return;

        try {
            // Wait for API call to succeed
            await approvePayment(paymentId);
            
            // OPTIMIZATION: Remove the approved payment from the local state instead of re-fetching all data
            setPending(prevPending => prevPending.filter(item => item._id !== paymentId));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to approve");
            console.log("Approve failed:", err);
        }
    }, []); // Empty dependency array means this function is stable

    const handleReject = useCallback(async (paymentId) => {
        if (!window.confirm("Reject this student's payment?")) return;

        try {
            await rejectPayment(paymentId);
            setPending(prevPending => prevPending.filter(item => item._id !== paymentId));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to reject");
            console.log("Reject failed:", err);
        }
    }, []);

    useEffect(() => {
        loadPending();

        const handleResize = () => {
            const width = window.innerWidth;
            const newIsMobile = width < TABLET_BREAKPOINT;
            const newColumns = getColumnCount(width);

            setIsMobile(prev => (prev !== newIsMobile ? newIsMobile : prev));
            setColumns(prev => (prev !== newColumns ? newColumns : prev));
        };

        // Initial setup and listener
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [loadPending]); // Dependency on loadPending ensures it is stable

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
                        lineHeight: "100%",
                        color: "#FFFFFF",
                        marginLeft: isMobile ? "0" : "0", 
                        marginTop: 0,
                    }}
                >
                    Payment Verification
                </h1>
                <p
                    style={{
                        fontWeight: 400,
                        fontSize: isMobile ? "14px" : "16px", 
                        lineHeight: isMobile ? "100%" : "100%", 
                        color: "#FFFFFF",
                        opacity: 0.9,
                        marginTop: isMobile ? "8px" : "12px",
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
                    width: isMobile ? "100%" : "90%",
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
            </div>

            {/* Pending Cards Grid */}
            <div
                style={{
                    width: isMobile ? "100%" : "90%",
                    display: "grid",
                    // Use responsive columns state
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: isMobile ? "20px" : "30px",
                    marginLeft: isMobile ? "0" : "50px",
                    marginTop: isMobile ? "30px" : "50px",
                    marginBottom: "100px",
                    boxSizing: 'border-box',
                }}
            >
                {/* Fallback for no pending payments */}
                {pending.length === 0 ? (
                    <div style={{ 
                        gridColumn: '1 / -1', 
                        textAlign: 'center', 
                        padding: '40px', 
                        fontSize: '18px', 
                        color: '#aaa' 
                    }}>
                        No pending payments found.
                    </div>
                ) : (
                    pending.map((item) => (
                        <div
                            key={item._id}
                            style={{
                                width: "100%", 
                                minHeight: isMobile ? "300px" : "350px", 
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
                                src={item.paymentScreenshot}
                                alt="proof"
                                style={{
                                    width: "100%",
                                    height: isMobile ? "150px" : "179px", 
                                    borderRadius: "16px",
                                    objectFit: "cover",
                                }}
                            />

                            <div>
                                <h3
                                    style={{
                                        fontSize: isMobile ? "16px" : "18px", 
                                        fontWeight: 500,
                                        marginTop: isMobile ? "8px" : "12px",
                                        marginBottom: isMobile ? "4px" : "8px",
                                    }}
                                >
                                    {item.courseId?.Course_title || 'N/A Course Title'}
                                </h3>
                                <p
                                    style={{
                                        fontSize: isMobile ? "14px" : "16px", 
                                        color: "#C9C9C9",
                                        fontWeight: 500,
                                        margin: 0,
                                    }}
                                >
                                    Student: {item.userId?.name || 'N/A Student Name'}
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
                                    gap: isMobile ? "8px" : "10px", 
                                }}
                            >
                                <button
                                    onClick={() => handleApprove(item._id)}
                                    style={{
                                        width: "50%", // Adjusted to 50% for mobile
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
                                        fontSize: isMobile ? "14px" : "16px", 
                                        flexGrow: 1, // Added flexGrow for responsiveness
                                    }}
                                >
                                    <CircleCheckBig size={isMobile ? 16 : 20} />
                                    Approve
                                </button>

                                <button
                                    onClick={() => handleReject(item._id)}
                                    style={{
                                        width: "50%", // Adjusted to 50% for mobile
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
                                        fontSize: isMobile ? "14px" : "16px",
                                        flexGrow: 1, // Added flexGrow for responsiveness
                                    }}
                                >
                                    <CircleX size={isMobile ? 16 : 20} />
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}