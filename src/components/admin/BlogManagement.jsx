import React, { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import AddBlog from "../../components/admin/AddBlog";
import blog1 from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.jpg";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const handleAddBlog = (newBlog) => {
    setBlogs((prev) => [...prev, newBlog]);
  };

  const handleEditBlog = (updatedBlog) => {
    setBlogs((prev) =>
      prev.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    }
  };

  const openAddPopup = () => {
    setEditingBlog(null);
    setShowPopup(true);
  };

  const openEditPopup = (blog) => {
    setEditingBlog(blog);
    setShowPopup(true);
  };

  return (
    <div
      style={{
        left: "100px",
        background: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        paddingTop: "140px",
        paddingLeft: "120px",
        minHeight: "100vh",
      }}
    >
      {/* Heading */}
      <div>
        <h1
          style={{
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "100%",
            color: "#FFFFFF",
            marginLeft: "24px",
          }}
        >
          Blog Management
        </h1>
        <p
          style={{
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "10%",
            color: "#FFFFFF",
            opacity: 0.9,
            marginTop: "4px",
            marginLeft: "24px",
          }}
        >
          Create and manage Blog Posts
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
          <p style={{ fontSize: "20px", fontWeight: 400, marginBottom: "2px" }}>Total Blogs</p>
          <p style={{ fontSize: "24px", fontWeight: 500, marginTop: "0",
              marginBottom: "10px", }}>{blogs.length}</p>
        </div>

        <button
          onClick={openAddPopup}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#525252",
            color: "#FFFFFF",
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            padding: "10px 12px",
            cursor: "pointer",
          }}
        >
          <Plus size={18} />
          Add Blog
        </button>
      </div>

      {/* Blog Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          marginLeft: "50px",
          marginTop: "50px",
          marginBottom: "100px",
        }}
      >
        {blogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              width: "340px",
              height: "360px",
              background: "#343434",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              style={{
                width: "100%",
                height: "179px",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />
            <div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  marginTop: "12px",
                  marginBottom: "8px",
                }}
              >
                {blog.title}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#C9C9C9",
                  marginBottom: "10px",
                  lineHeight: "18px",
                }}
              >
                {blog.description}
              </p>
            </div>

            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(255,255,255,0.1)",
                marginBottom: "10px",
              }}
            ></div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={() => openEditPopup(blog)}
                style={{
                  width: "80px",
                  height: "34px",
                  borderRadius: "10px",
                  background: "#373D48",
                  color: "#E3E3E3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Edit3 size={20} />
                Edit
              </button>

              <button
                onClick={() => handleDeleteBlog(blog.id)}
                style={{
                  width: "80px",
                  height: "34px",
                  borderRadius: "10px",
                  background: "#373D48",
                  color: "#E3E3E3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={20} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup for Add/Edit */}
      {showPopup && (
        <AddBlog
          onClose={() => setShowPopup(false)}
          onSave={(blogData) => {
            if (editingBlog) {
              handleEditBlog({ ...blogData, id: editingBlog.id });
            } else {
              handleAddBlog(blogData);
            }
            setShowPopup(false);
          }}
          existingBlog={editingBlog}
        />
      )}
    </div>
  );
}
