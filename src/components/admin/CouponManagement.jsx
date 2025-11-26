import React, { useEffect, useState } from "react";
import { Edit3, Trash2, Plus } from "lucide-react";
import AddCoupon from "../../components/admin/AddCoupon";
import { getAllCoupons, deleteCoupon } from "../../api/coupon";

export default function CouponManagement() {
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);

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
            marginBottom: 0,
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
          width: "90%",
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
            setEditingData(null);
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
          width: "80%",
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
        {coupons.map((coupon) => (
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
            }}
          >
            <span style={{ color: "#3D7EFF", fontWeight: 500 }}>
              {coupon.Code}
            </span>
            <span>{coupon.Discount}</span>
            <span>{coupon.Expiry_date?.split("T")[0]}</span>

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
        ))}
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
