import React, { useState } from "react";
import { Edit3, Trash2, Plus } from "lucide-react";
import AddCoupon from "./AddCoupon";

export default function CouponManagement() {
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // ✅ Add / Edit Save
  const handleSaveCoupon = (couponData) => {
    if (editingIndex !== null) {
      const updated = [...coupons];
      updated[editingIndex] = couponData;
      setCoupons(updated);
    } else {
      setCoupons([...coupons, couponData]);
    }
    setShowModal(false);
    setEditingIndex(null);
  };

  // ✅ Delete Coupon
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      const updatedCoupons = coupons.filter((_, i) => i !== index);
      setCoupons(updatedCoupons);
    }
  };

  // ✅ Edit Coupon
  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowModal(true);
  };

  return (
    <div
      style={{
        left: "100px",
        background: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        paddingTop: "130px",
        paddingLeft: "120px",
        minHeight: "100vh",
        marginBottom: "50px",
      }}
    >
      {/* Heading */}
      <div>
        <h1
          style={{
            fontWeight: 600,
            fontSize: "36px",
            color: "#FFFFFF",
            marginLeft: "24px",
          }}
        >
          Coupon Management
        </h1>
        <p
          style={{
            fontWeight: 400,
            fontSize: "16px",
            color: "#FFFFFF",
            opacity: 0.9,
            marginTop: "4px",
            marginLeft: "24px",
          }}
        >
          Create and manage discount coupons for your courses
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
          padding: "0px 32px",
        }}
      >
        <div>
          <p style={{ fontSize: "20px", fontWeight: 400, marginBottom: "2px" }}>
            Total Coupons
          </p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 500,
              marginTop: "0",
              marginBottom: "10px",
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
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            padding: "10px 10px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={() => {
            setEditingIndex(null);
            setShowModal(true);
          }}
        >
          <Plus size={18} />
          Add Coupon
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          marginTop: "50px",
          marginLeft: "50px",
          width: "1050px",
          background: "#282727",
          borderRadius: "10px",
          padding: "10px 50px",
        }}
      >
        {/* Header */}
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

        {/* Rows */}
        {coupons.map((coupon, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr 1.5fr 1.5fr",
              alignItems: "center",
              justifyItems: "center",
              padding: "20px 0px",
              color: "#FFFFFF",
              fontSize: "16px",
            }}
          >
            <span style={{ color: "#3D7EFF", fontWeight: 500 }}>
              {coupon.code}
            </span>
            <span>{coupon.discount}</span>
            <span>{coupon.expiry}</span>

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
                onClick={() => handleEdit(index)}
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
                onClick={() => handleDelete(index)}
              >
                <Trash2 size={14} color="#E3E3E3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Coupon Modal */}
      {showModal && (
        <AddCoupon
          onClose={() => {
            setShowModal(false);
            setEditingIndex(null);
          }}
          onSave={handleSaveCoupon}
          existingData={editingIndex !== null ? coupons[editingIndex] : null}
        />
      )}
    </div>
  );
}
