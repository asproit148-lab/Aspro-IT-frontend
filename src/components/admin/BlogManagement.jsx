import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import AddBlog from "../../components/admin/AddBlog";

// API
import { addBlog, updateBlog, deleteBlog, getBlogs } from "../../api/blog";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

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

  // ADD BLOG
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

  // EDIT BLOG
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

  // DELETE BLOG
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
        position: "relative",
    background: "black",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    paddingTop: "130px",
    paddingLeft: "140px",
    paddingRight: "40px",
    minHeight: "100vh",
      }}
    >
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
    padding: "0 24px",
        }}
      >
        <div>
          <p style={{ fontSize: "20px", fontWeight: 400, marginBottom: "2px" }}>
            Total Blogs
          </p>
          <p
            style={{
              fontSize: "24px",
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

      {/* CARDS */}
      <div
        style={{
          width: "100px",
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
            key={blog._id}
            style={{
              width: "340px",
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
              {/* <button
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
              </button> */}

              <button
                onClick={() => handleDeleteBlog(blog._id)}
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
