import React, { useState } from "react";
import { ArrowLeft, Award, Clock, Video, Download } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentFlow from "../components/PaymentFlow";
import { sendEnrollment } from "../api/email";

export default function Enroll() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseName = location.state?.course || "";
  const courseId = location.state?.courseId || "";
  const price = location.state?.price || 0;
  const originalPrice = location.state?.originalPrice || 0;
const discount = location.state?.discount || 0;

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        padding: "40px 60px 60px 60px",
        transition: "0.3s ease",
      }}
    >
      {/* Heading */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "25px", cursor: "pointer" }}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={36} color="white" />
        <h1 style={{ fontWeight: 600, fontSize: "32px", lineHeight: "100%", margin: 0, color: "white" }}>
          Enrollment Details
        </h1>
      </div>

      {/* Main Flex Container */}
      <div style={{ display: "flex", gap: "25px", alignItems: "flex-start" }}>
        {/* FORM CONTAINER */}
        <div
          style={{
            width: "800px",
            minHeight: "552px",
            borderRadius: "16px",
            background: "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
            boxShadow: "0px 4px 16px 0px #FFFFFF40",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Row 1 - Name & Email */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>Name<span style={{ color: "#FF4D4D" }}> *</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                style={{
                  fontSize: "12px",
                  width: "360px",
                  paddingLeft: "20px",
                  height: "40px",
                  borderRadius: "8px",
                  border: "0.5px solid #FFFFFF",
                  background: "transparent",
                  color: "white",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>E-mail<span style={{ color: "#FF4D4D" }}> *</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                style={{
                  fontSize: "12px",
                  width: "360px",
                  height: "40px",
                  paddingLeft: "20px",
                  borderRadius: "8px",
                  border: "0.5px solid #FFFFFF",
                  background: "transparent",
                  color: "white",
                }}
              />
            </div>
          </div>

          {/* Row 2 - Address */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <label style={{ fontWeight: 500, fontSize: "20px" }}>Address<span style={{ color: "#FF4D4D" }}> *</span></label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Residential address"
              style={{
                fontSize: "12px",
                width: "775px",
                height: "40px",
                borderRadius: "8px",
                border: "0.5px solid #FFFFFF",
                background: "transparent",
                color: "white",
                paddingLeft: "20px",
              }}
            />
          </div>

          {/* Row 3 - State & Zip */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>State<span style={{ color: "#FF4D4D" }}> *</span></label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="eg: Delhi"
                style={{
                  fontSize: "12px",
                  width: "360px",
                  height: "40px",
                  borderRadius: "8px",
                  border: "0.5px solid #FFFFFF",
                  background: "transparent",
                  color: "white",
                  paddingLeft: "20px",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>Zip Code<span style={{ color: "#FF4D4D" }}> *</span></label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="eg: 112223"
                style={{
                  fontSize: "12px",
                  width: "360px",
                  height: "40px",
                  borderRadius: "8px",
                  border: "0.5px solid #FFFFFF",
                  background: "transparent",
                  color: "white",
                  paddingLeft: "20px",
                }}
              />
            </div>
          </div>

          {/* Row 4 - Course & Mode */}
          <div style={{ display: "flex", gap: "23px", position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>Course Name<span style={{ color: "#FF4D4D" }}> *</span></label>
              <input
                type="text"
                value={courseName}
                readOnly
                style={{
                  width: "360px",
                  height: "40px",
                  borderRadius: "8px",
                  padding: "0 20px",
                  border: "0.5px solid #FFFFFF",
                  background: "transparent",
                  color: "white",
                  fontSize: "14px",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px", marginTop: "10px" }}>Mode of Training<span style={{ color: "#FF4D4D" }}> *</span></label>
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                {["Online", "Offline"].map((val) => (
                  <label key={val} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "18px" }}>
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
          <div style={{ display: "flex", justifyContent: "space-between", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>Batch Type<span style={{ color: "#FF4D4D" }}> *</span></label>
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                {["1 on 1", "Group"].map((val) => (
                  <label key={val} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "18px" }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ fontWeight: 500, fontSize: "20px" }}>Phone Number<span style={{ color: "#FF4D4D" }}> *</span></label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="909xxxxxxx"
                style={{
                  fontSize: "12px",
                  width: "360px",
                  height: "40px",
                  borderRadius: "8px",
                  border: "0.5px solid #FFFFFF",
                  background: "transparent",
                  color: "white",
                  paddingLeft: "20px",
                }}
              />
            </div>
          </div>
        </div>

        {/* PRICE DETAILS CONTAINER */}
        <div style={{ width: "400px", minHeight: "557px", borderRadius: "16px", background: "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)", boxShadow: "0px 4px 16px 0px #FFFFFF40", padding: "20px", display: "flex", flexDirection: "column" }}>
          {/* Prices */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "20px", marginBottom: "5px", marginTop: "40px" }}>
            <div style={{ fontSize: "48px", fontWeight: 700, color: "#FFFFFF" }}>₹{price}</div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textDecoration: "line-through" }}>₹{originalPrice}</div>
            <div style={{ marginLeft: "auto", width: "81px", height: "32px", borderRadius: "25px", color: "#0DA745", background: "#0DA74540", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700 }}>{discount}% OFF</div>
          </div>

          <p style={{ fontSize: "16px", fontWeight: 500, color: "#FF6969", marginBottom: "30px" }}>Sale ends in 24 hours!</p>

          {/* Button */}
          <button
            style={{ width: "375px", height: "54px", borderRadius: "8px", border: "1px solid #FFFFFF", background: "transparent", color: "#FFFFFF", fontSize: "28px", fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0px 4px 16px 0px #FFFFFF40"; e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "transparent"; }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Proceed to Payment"}
          </button>

          {/* Divider & Course Includes */}
          <div style={{ width: "377px", borderTop: "1px solid white", opacity: "0.4", marginTop: "40px", marginBottom: "30px" }}></div>
          <p style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>This course includes:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[{ icon: <Award size={25} color="#0DA745" />, text: "Certification of completion" }, { icon: <Clock size={25} color="#0DA745" />, text: "Full time access" }, { icon: <Video size={25} color="#0DA745" />, text: "On-demand videos" }, { icon: <Download size={25} color="#0DA745" />, text: "Downloadable resources" }].map((item, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>{item.icon}<span style={{ fontSize: "12px" }}>{item.text}</span></div>
            ))}
          </div>
        </div>
      </div>

      <PaymentFlow
  open={showPaymentPopup}
  onClose={() => setShowPaymentPopup(false)}
  courseId={courseId}
  price={price}
/>
    </div>
  );
}
