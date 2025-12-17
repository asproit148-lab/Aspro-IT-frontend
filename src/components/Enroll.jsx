import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentFlow from "../components/PaymentFlow";
import { applyCoupon } from "../api/coupon";
import { sendEnrollment } from "../api/email";

const mobileBreakpoint = 992;

export default function Enroll() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Course and Price Details from location state
    const courseName = location.state?.course || "";
    const courseId = location.state?.courseId || "";
    const price = location.state?.price || 0; // Current base price
    const originalPrice = location.state?.originalPrice || 0;
    const discount = location.state?.discount || 0; // Initial discount percentage

    // Coupon State
    const [coupon, setCoupon] = useState("");
    const [couponError, setCouponError] = useState("");
    
    // State for dynamically calculated price and discount
    const [finalPrice, setFinalPrice] = useState(price);
    const [discountPercent, setDiscountPercent] = useState(0); 

    // UI/Form State
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        state: "",
        zip: "",
        phone: "",
    });

    const [mode, setMode] = useState("");
    const [batch, setBatch] = useState("");
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    // 1. Screen size tracking
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 2. Initialize finalPrice when base price changes (and reset coupon info)
    useEffect(() => {
        setFinalPrice(price);
        setDiscountPercent(0);
        setCouponError("");
    }, [price]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // 3. Coupon Application Logic
    const handleApply = async () => {
        if (!coupon) return;
    
        try {
          const res = await applyCoupon({
            Code: coupon,
            amount: price, // Use the base price for the API calculation
          });
    
          if (res.success) {
            setDiscountPercent(res.discountPercent);
            setFinalPrice(Number(res.finalAmount).toFixed(2));
            setCouponError("");
          } else {
            setDiscountPercent(0); // Clear discount if previous one failed
            setFinalPrice(price); // Revert to base price
            setCouponError(res.message || "Invalid coupon");
          }
        } catch {
          setDiscountPercent(0);
          setFinalPrice(price); // Revert to base price
          setCouponError("Invalid or expired coupon");
        }
    };

    const handleSubmit = async () => {
        // Empty fields validation
        if (
            !formData.name ||
            !formData.email ||
            !formData.address ||
            !formData.state ||
            !formData.zip ||
            !formData.phone ||
            !mode ||
            !batch
        ) {
            alert("Please fill all required fields!");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address!");
            return;
        }

        // Zip must be 6 digits
        const zipRegex = /^[0-9]{6}$/;
        if (!zipRegex.test(formData.zip)) {
            alert("Zip code must be exactly 6 digits!");
            return;
        }

        // Phone must be 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert("Phone number must be exactly 10 digits!");
            return;
        }

        const payload = {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            state: formData.state,
            zip_code: formData.zip,
            course_name: courseName,
            Mode_of_training: mode,
            batch_type: batch,
            phone_no: formData.phone,
            final_price: Number(finalPrice).toFixed(2),
            coupon_applied: coupon,
        };

        try {
            setLoading(true);
            console.log("Sending payload:", payload);
            const res = await sendEnrollment(payload);
            console.log("Enrollment success:", res);
            setShowPaymentPopup(true);
        } catch (error) {
            console.error("Enrollment failed:", error);
            alert(error.response?.data?.error || "Enrollment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = (minWidth) => ({
        fontSize: "12px",
        minWidth: isMobile ? "100%" : minWidth,
        width: isMobile ? "100%" : "auto", 
        paddingLeft: "20px",
        height: "40px",
        borderRadius: "8px",
        border: "0.5px solid #FFFFFF",
        background: "transparent",
        color: "white",
        boxSizing: "border-box",
    });

    const formRowStyle = {
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        gap: isMobile ? "15px" : "24px", 
        width: "100%",
        boxSizing: "border-box",
    };

    const formColumnStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: isMobile ? "100%" : "50%", 
        boxSizing: "border-box",
    };


    return (
        <div
            style={{
                backgroundColor: "black",
                marginTop: isMobile ? "70px" : "105px",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                marginRight: isMobile ? "0" : "20px", 
                padding: isMobile ? "20px" : "40px 0 60px 30px",
                transition: "0.3s ease",
            }}
        >
            {/* Heading */}
            <div
                style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: isMobile ? "8px" : "12px", 
                    marginBottom: isMobile ? "20px" : "25px", 
                    cursor: "pointer",
                    paddingLeft: isMobile ? "0" : "30px", 
                }}
                onClick={() => navigate(-1)}
            >
                <ChevronLeft size={isMobile ? 24 : 36} color="white" />
                <h1 style={{ fontWeight: 600, fontSize: isMobile ? "24px" : "32px", lineHeight: "100%", margin: 0, color: "white" }}>
                    Enrollment Details
                </h1>
            </div>

            {/* Main Flex Container */}
            <div 
                style={{ 
                    display: "flex", 
                    gap: isMobile ? "20px" : "25px", 
                    flexDirection: isMobile ? "column" : "row", 
                    alignItems: isMobile ? "center" : "flex-start", 
                    padding: isMobile ? "0" : "0 30px 0 0",
                }}
            >
                {/* FORM CONTAINER (No changes here) */}
                <div
                    style={{
                        width: isMobile ? "95%" : "64%", 
                        minHeight: "auto", 
                        borderRadius: "16px",
                        background: "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
                        boxShadow: "0px 4px 16px 0px #FFFFFF40",
                        padding: isMobile ? "18px" : "24px", 
                        display: "flex",
                        flexDirection: "column",
                        gap: isMobile ? "18px" : "24px", 
                        boxSizing: "border-box",
                    }}
                >
                    {/* Row 1 - Name & Email */}
                    <div style={{ ...formRowStyle, marginTop: isMobile ? "5px" : "15px" }}>
                        <div style={formColumnStyle}>
                            <label style={{ fontWeight: 500, fontSize: isMobile ? "18px" : "20px" }}>Name<span style={{ color: "#FF4D4D" }}> *</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                style={inputStyle("350px")}
                            />
                        </div>
                        <div style={formColumnStyle}>
                            <label style={{ fontWeight: 500, fontSize: isMobile ? "18px" : "20px" }}>E-mail<span style={{ color: "#FF4D4D" }}> *</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                style={inputStyle("350px")}
                            />
                        </div>
                    </div>

                    {/* Row 2 - Address */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <label style={{ fontWeight: 500, fontSize: isMobile ? "18px" : "20px" }}>Address<span style={{ color: "#FF4D4D" }}> *</span></label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Residential address"
                            style={inputStyle("720px")}
                        />
                    </div>

                    {/* Row 3 - State & Zip */}
                    <div style={formRowStyle}>
                        <div style={formColumnStyle}>
                            <label style={{ fontWeight: 500, fontSize: isMobile ? "18px" : "20px" }}>State<span style={{ color: "#FF4D4D" }}> *</span></label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="eg: Delhi"
                                style={inputStyle("350px")}
                            />
                        </div>
                        <div style={formColumnStyle}>
                            <label style={{ fontWeight: 500, fontSize: isMobile ? "18px" : "20px" }}>Zip Code<span style={{ color: "#FF4D4D" }}> *</span></label>
                            <input
                                type="text"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                placeholder="eg: 112223"
                                style={inputStyle("350px")}
                            />
                        </div>
                    </div>

                    {/* Row 4 - Course & Mode */}
                    <div style={{ ...formRowStyle, gap: isMobile ? "15px" : "23px", alignItems: "flex-end" }}> {/* Align mode to bottom */}
                        <div style={formColumnStyle}>
                            <label style={{ fontWeight: 500, fontSize: isMobile ? "18px" : "20px" }}>Course Name<span style={{ color: "#FF4D4D" }}> *</span></label>
                            <input
                                type="text"
                                value={courseName}
                                readOnly
                                style={{
                                    ...inputStyle("350px"), 
                                    paddingLeft: "20px", 
                                    fontSize: "14px",
                                    height: "40px",
                                }}
                            />
                        </div>
                        <div style={{ ...formColumnStyle, gap: "15px" }}>
                            <label style={{ fontWeight: 500, fontSize: isMobile ? "18px" : "20px", marginTop: isMobile ? "0" : "0" }}>Mode of Training<span style={{ color: "#FF4D4D" }}> *</span></label>
                            <div style={{ display: "flex", gap: isMobile ? "10px" : "20px", alignItems: "center" }}>
                                {["Online", "Offline"].map((val) => (
                                    <label key={val} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: isMobile ? "16px" : "18px" }}>
                                        <input
                                            type="radio"
                                            name="mode"
                                            value={val}
                                            checked={mode === val}
                                            onChange={(e) => setMode(e.target.value)}
                                        />
                                        {val}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Row 5 - Batch & Phone */}
                    <div style={formRowStyle}>
                        <div style={formColumnStyle}>
                            <label style={{ fontWeight: 500, fontSize: isMobile ? "18px" : "20px" }}>Batch Type<span style={{ color: "#FF4D4D" }}> *</span></label>
                            <div style={{ display: "flex", gap: isMobile ? "10px" : "20px", alignItems: "center" }}>
                                {["1 on 1", "Group"].map((val) => (
                                    <label key={val} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: isMobile ? "16px" : "18px" }}>
                                        <input
                                            type="radio"
                                            name="batch"
                                            value={val}
                                            checked={batch === val}
                                            onChange={(e) => setBatch(e.target.value)}
                                        />
                                        {val}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div style={formColumnStyle}>
                            <label style={{ fontWeight: 500, fontSize: isMobile ? "18px" : "20px" }}>Phone Number<span style={{ color: "#FF4D4D" }}> *</span></label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="909xxxxxxx"
                                style={inputStyle("350px")}
                            />
                        </div>
                    </div>
                </div>

                {/* PRICE DETAILS CONTAINER */}
                <div 
                    style={{ 
                        width: isMobile ? "95%" : "36%", 
                        minHeight: "580px", 
                        borderRadius: "16px", 
                        background: "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)", 
                        boxShadow: "0px 4px 16px 0px #FFFFFF40", 
                        padding: "20px", 
                        display: "flex", 
                        flexDirection: "column",
                        boxSizing: "border-box",
                    }}
                >
                    {/* Prices - ORIGINAL LOGIC (no change from initial state) */}
                    <div style={{ display: "flex", width: "100%", alignItems: "baseline", gap: "20px", marginBottom: "5px", marginTop: isMobile ? "10px" : "40px" }}>
                        <div style={{ fontSize: isMobile ? "30px" : "42px", width: "auto", fontWeight: 700, color: "#FFFFFF" }}>₹{price}</div>
                        <div style={{ fontSize: isMobile ? "20px" : "24px", width: "auto", fontWeight: 700, color: "rgba(255,255,255,0.5)", textDecoration: "line-through" }}>₹{originalPrice}</div>
                        
                        <div style={{ 
                            marginRight: "auto", 
                            minWidth: isMobile ? "60px" : "70px", 
                            height: isMobile ? "28px" : "32px", 
                            borderRadius: "8px", 
                            background: "#0DA745",
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            fontSize: isMobile ? "12px" : "14px", 
                            fontWeight: 700 
                        }}>
                            {discount}% OFF
                        </div>
                    </div>

                    <p style={{ fontSize: "16px", fontWeight: 500, color: "#FF6969", marginBottom: "10px" }}>Sale ends in 24 hours!</p>

                    
                    {/* START OF NEW/MODIFIED COUPON SECTION */}

                    <h3 style={{ fontSize: isMobile ? "18px" : "20px", fontWeight: 600, marginTop: "10px", marginBottom: "40px" }}>Apply Coupon</h3>
                    
                    {/* Coupon Input/Button */}
                    <div
                        style={{
                            width: "100%", 
                            height: "48px",
                            borderRadius: "10px",
                            border: "1px solid #BFBFBF",
                            margin: "0 auto 10px auto", 
                            display: "flex",
                            alignItems: "center",
                            background: "#000",
                        }}
                    >
                        <input
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            placeholder="Enter Coupon Code"
                            style={{
                                flex: 1,
                                height: "100%",
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                paddingLeft: "10px",
                                fontFamily: "Inter",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#fff",
                            }}
                        />
                        <button
                            onClick={handleApply}
                            style={{
                                width: "100px",
                                height: "100%",
                                borderRadius: "0 10px 10px 0", 
                                border: "1px solid #BFBFBF",
                                background: "#2B6EF0",
                                color: "white",
                                fontWeight: 600,
                                cursor: "pointer",
                                borderLeft: "none",
                            }}
                        >
                            Apply
                        </button>
                    </div>

                    {couponError && (
                        <p style={{ color: "red", fontSize: "14px", marginBottom: "10px", textAlign: "center" }}>
                            {couponError}
                        </p>
                    )}

                    {/* Display Updated Price */}
                    {discountPercent > 0 && (
                        <div style={{ marginTop: "10px", padding: "10px", background: "#1F1F1F", borderRadius: "8px", borderLeft: "4px solid #4CAF50" }}>
                            <p style={{ fontSize: "16px", fontWeight: 500, margin: 0 }}>
                                Coupon Applied: <span style={{ color: "#4CAF50", fontWeight: 700 }}>{discountPercent}% OFF</span>
                            </p>
                            <p style={{ fontSize: "24px", fontWeight: 700, margin: "5px 0 0 0" }}>
                                Final Price: ₹{Number(finalPrice).toFixed(2)}
                            </p>
                        </div>
                    )}

                    <div style={{ width: "100%", borderTop: "1px solid white", opacity: "0.4", marginTop: isMobile ? "20px" : "40px", marginBottom: "40px" }}></div> 


                    {/* Button */}
                    <button
                        style={{ 
                            width: "100%", 
                            height: isMobile ? "48px" : "54px", 
                            borderRadius: "8px", 
                            border: "1px solid #FFFFFF", 
                            background: "transparent", 
                            color: "#FFFFFF", 
                            fontSize: isMobile ? "22px" : "28px", 
                            fontWeight: 600, 
                            cursor: "pointer", 
                            transition: "all 0.3s ease" 
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 4px 16px 0px #FFFFFF40"; e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "transparent"; }}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Proceed to Payment"}
                    </button>



                </div>
            </div>

            {/* Payment Flow Modal*/}
            <PaymentFlow
                open={showPaymentPopup}
                onClose={() => setShowPaymentPopup(false)}
                courseId={courseId}
                price={Number(finalPrice).toFixed(2)}
            />
        </div>
    );
}