import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import AddBlog from "../../components/admin/AddBlog";

// API
import { addBlog, updateBlog, deleteBlog, getBlogs } from "../../api/blog";

// Define a mobile breakpoint
const mobileBreakpoint = 768;

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isMobile = screenWidth < mobileBreakpoint;

  // 1. Screen size tracking for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Data Fetching (Unchanged)
  useEffect(() => {
    (async () => {
      try {
        const data = await getBlogs();

        // Map backend fields to frontend UI fields
        const formatted = (data.blogs || []).map((b) => ({
          _id: b._id,
          title: b.Blog_title,
          description: b.Blog_content,
          image: b.BlogImage || null,
        }));

        setBlogs(formatted);
      } catch (err) {
        console.error("Fetch blogs failed:", err);
      }
    })();
  }, []);

  // ADD BLOG (Unchanged)
  const handleAddBlog = async (blogData) => {
    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("content", blogData.description);
      formData.append("BlogImage", blogData.file);

      const newBlog = await addBlog(formData);
      const b = newBlog.Blog;

      // Convert backend → frontend format
      const formatted = {
        _id: b._id,
        title: b.Blog_title,
        description: b.Blog_content,
        image: b.BlogImage,
      };

      setBlogs((prev) => [...prev, formatted]);
      setShowPopup(false);
    } catch (err) {
      alert("Blog creation failed");
    }
  };

  // EDIT BLOG (Unchanged)
  const handleEditBlog = async (updatedBlog) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedBlog.title);
      formData.append("content", updatedBlog.description);

      if (updatedBlog.file) {
        formData.append("BlogImage", updatedBlog.file);
      }

      const updated = await updateBlog(updatedBlog.id, formData);
      const b = updated.blog;

      const formatted = {
        _id: b._id,
        title: b.Blog_title,
        description: b.Blog_content,
        image: b.BlogImage,
      };

      setBlogs((prev) =>
        prev.map((x) => (x._id === updatedBlog.id ? formatted : x))
      );
      setShowPopup(false);
    } catch (err) {
      alert("Blog update failed");
    }
  };

  // DELETE BLOG (Unchanged)
  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert("Blog deletion failed");
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
        width: isMobile ? "80%" : "100%" ,
        position: "relative",
        background: "black",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        // ⬅️ RESPONSIVE: Main container padding
        paddingTop: isMobile ? "90px" : "130px",
        paddingLeft: isMobile ? "20px" : "140px",
        paddingRight: isMobile ? "20px" : "40px",
      }}
    >
      {/* Title and Subtitle */}
      <div style={{ 
            // ⬅️ RESPONSIVE: Center on mobile
            margin: isMobile ? '0 auto' : '0' 
        }}>
        <h1
          style={{
            fontWeight: 600,
            // ⬅️ RESPONSIVE: Font size and spacing
            fontSize: isMobile ? "28px" : "36px",
            lineHeight: "100%",
            color: "#FFFFFF",
            marginLeft: isMobile ? "0px" : "24px",
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
            marginLeft: isMobile ? "0px" : "24px",
          }}
        >
          Create and manage Blog Posts
        </p>
      </div>

      {/* Total Blogs Card / Add Button Bar */}
      <div
        style={{
          width: "100%",
          maxWidth: "1150px",
          height: "72px",
          marginTop: "40px",
          borderRadius: "12px",
          background: "linear-gradient(90.19deg, #323232 0%, #0F0F0F 59.13%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 15px" : "0 24px", // ⬅️ RESPONSIVE: Padding
        }}
      >
        <div>
          <p style={{ fontSize: isMobile ? "16px" : "20px", fontWeight: 400, marginBottom: "2px" }}>
            Total Blogs
          </p>
          <p
            style={{
              fontSize: isMobile ? "20px" : "24px", // ⬅️ RESPONSIVE: Font size
              fontWeight: 500,
              marginTop: 0,
              marginBottom: "10px",
            }}
          >
            {blogs.length}
          </p>
        </div>

        <button
          onClick={openAddPopup}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#525252",
            color: "#FFFFFF",
            fontSize: isMobile ? "14px" : "16px", // ⬅️ RESPONSIVE: Font size
            borderRadius: "10px",
            border: "none",
            padding: isMobile ? "8px 10px" : "10px 12px", // ⬅️ RESPONSIVE: Padding
            cursor: "pointer",
          }}
        >
          <Plus size={isMobile ? 16 : 18} />
          {!isMobile && "Add Blog"} {/* Hide text on small mobile */}
        </button>
      </div>

      {/* CARDS GRID */}
      <div
        style={{
          width: "100%",
          display: "grid",
          // ⬅️ CRUCIAL RESPONSIVE CHANGE: 1 column on mobile, 3 on desktop
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? "20px" : "30px", // ⬅️ RESPONSIVE: Gap
          marginLeft: isMobile ? "0px" : "50px", // ⬅️ RESPONSIVE: Remove fixed margin
          maxWidth: isMobile ? "100%" : "1150px",
          margin: isMobile ? '30px auto 100px auto' : '50px 0 100px 50px', 
        }}
      >
        {blogs.map((blog) => (
          <div
            key={blog._id}
            style={{
              // ⬅️ RESPONSIVE: Use 100% width on mobile cards
              width: isMobile ? "100%" : "90%",
              height: "350px",
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
              src={blog.image || "/fallback.jpg"}
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
                  whiteSpace: "normal",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
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
              {/* EDIT BUTTON - Uncommented and given responsive styles */}
              <button
                onClick={() => openEditPopup(blog)}
                style={{
                  // ⬅️ RESPONSIVE: Width adjustment for mobile layout
                  width: isMobile ? "48%" : "80px",
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
                  fontSize: isMobile ? "14px" : "16px",
                }}
              >
                <Edit3 size={isMobile ? 18 : 20} />
                Edit
              </button>

              <button
                onClick={() => handleDeleteBlog(blog._id)}
                style={{
                  // ⬅️ RESPONSIVE: Width adjustment for mobile layout
                  width: isMobile ? "48%" : "80px",
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
                  fontSize: isMobile ? "14px" : "16px",
                }}
              >
                <Trash2 size={isMobile ? 18 : 20} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <AddBlog
          onClose={() => setShowPopup(false)}
          onSave={(blogData) => {
            if (editingBlog) {
              handleEditBlog({ ...blogData, id: editingBlog._id });
            } else {
              handleAddBlog(blogData);
            }
          }}
          existingBlog={editingBlog}
        />
      )}
    </div>
  );
}