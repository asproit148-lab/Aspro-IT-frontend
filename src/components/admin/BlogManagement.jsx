import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import AddBlog from "../../components/admin/AddBlog";

// API (Assumed to be correctly imported)
import { addBlog, updateBlog, deleteBlog, getBlogs } from "../../api/blog";

// Define a mobile breakpoint (Constant, moved outside component for stability)
const MOBILE_BREAKPOINT = 768;

// Helper function to format data from API to UI structure
const formatBlogData = (b) => ({
    _id: b._id,
    title: b.Blog_title,
    description: b.Blog_content,
    image: b.BlogImage || null,
});

export default function BlogManagement() {
    const [blogs, setBlogs] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    
    // OPTIMIZATION: Use state only for the derived boolean value
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
    );

    // --- FUNCTIONAL HANDLERS (using useCallback for stability) ---

    // 1. Data Fetching
    const fetchBlogs = useCallback(async () => {
        try {
            const data = await getBlogs();
            // Use the helper formatter
            const formatted = (data.blogs || []).map(formatBlogData);
            setBlogs(formatted);
        } catch (err) {
            console.error("Fetch blogs failed:", err);
            // Consider showing a user-friendly error message here
        }
    }, []); // Stable function

    // 2. Add Blog
    const handleAddBlog = useCallback(async (blogData) => {
        try {
            const formData = new FormData();
            formData.append("title", blogData.title);
            formData.append("content", blogData.description);
            formData.append("BlogImage", blogData.file);

            const newBlog = await addBlog(formData);
            const b = newBlog.Blog;

            const formatted = formatBlogData(b);

            // OPTIMIZATION: Use functional update form
            setBlogs((prev) => [formatted, ...prev]);
            setShowPopup(false);
        } catch (err) {
            alert("Blog creation failed");
            console.error("Add blog failed:", err);
        }
    }, []);

    // 3. Edit Blog
    const handleEditBlog = useCallback(async (updatedBlog) => {
        try {
            const formData = new FormData();
            formData.append("title", updatedBlog.title);
            formData.append("content", updatedBlog.description);

            if (updatedBlog.file) {
                formData.append("BlogImage", updatedBlog.file);
            }

            const updated = await updateBlog(updatedBlog.id, formData);
            const b = updated.blog;

            const formatted = formatBlogData(b);

            // OPTIMIZATION: Use functional update form
            setBlogs((prev) =>
                prev.map((x) => (x._id === updatedBlog.id ? formatted : x))
            );
            setShowPopup(false);
        } catch (err) {
            alert("Blog update failed");
            console.error("Edit blog failed:", err);
        }
    }, []);

    // 4. Delete Blog
    const handleDeleteBlog = useCallback(async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await deleteBlog(id);
            // OPTIMIZATION: Use functional update form
            setBlogs((prev) => prev.filter((b) => b._id !== id));
        } catch (err) {
            alert("Blog deletion failed");
            console.error("Delete blog failed:", err);
        }
    }, []);

    // 5. Open/Close Popups (using useCallback for stability)
    const openAddPopup = useCallback(() => {
        setEditingBlog(null);
        setShowPopup(true);
    }, []);

    const openEditPopup = useCallback((blog) => {
        setEditingBlog(blog);
        setShowPopup(true);
    }, []);


    // --- EFFECTS ---

    // 1. Initial Data Fetch
    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]); // Dependency is stable fetchBlogs

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


    // --- RENDER START (Using original inline styles for UI consistency) ---

    return (
        <div
            style={{
                // Adjusting overall width/padding to better accommodate responsive layout
                width: "100%",
                position: "relative",
                background: "black",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                minHeight: "100vh",
                paddingTop: isMobile ? "90px" : "130px",
                paddingLeft: isMobile ? "20px" : "140px",
                paddingRight: isMobile ? "20px" : "40px",
                boxSizing: 'border-box', // Ensure padding is inside the width
            }}
        >
            {/* Title and Subtitle */}
            <div style={{ 
                // Adjusted positioning for responsive layout
                padding: isMobile ? '0' : '0 0 0 24px',
                textAlign: isMobile ? 'center' : 'left'
            }}>
                <h1
                    style={{
                        fontWeight: 600,
                        fontSize: isMobile ? "28px" : "36px",
                        color: "#FFFFFF",
                        marginBottom: 0,
                        marginTop: 0,
                    }}
                >
                    Blog Management
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
                    Create and manage Blog Posts
                </p>
            </div>

            {/* Total Blogs Card / Add Button Bar */}
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
                    <p style={{ fontSize: isMobile ? "16px" : "20px", fontWeight: 400, marginBottom: "2px" }}>
                        Total Blogs
                    </p>
                    <p
                        style={{
                            fontSize: isMobile ? "20px" : "24px",
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
                        fontSize: isMobile ? "14px" : "16px",
                        borderRadius: "10px",
                        border: "none",
                        padding: isMobile ? "8px 10px" : "10px 10px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                    }}
                >
                    <Plus size={isMobile ? 16 : 18} />
                    {!isMobile && "Add Blog"}
                </button>
            </div>

            {/* CARDS GRID */}
            <div
                style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                    gap: isMobile ? "20px" : "30px",
                    maxWidth: "1150px",
                    // Adjusted margin to align with the rest of the content
                    margin: isMobile ? '30px auto 100px auto' : '50px auto 100px auto', 
                }}
            >
                {/* Fallback/Empty State */}
                {blogs.length === 0 ? (
                    <div style={{ 
                        gridColumn: '1 / -1', 
                        textAlign: 'center', 
                        padding: '40px', 
                        fontSize: '18px', 
                        color: '#aaa' 
                    }}>
                        No blogs found. Click "Add Blog" to create your first post.
                    </div>
                ) : (
                    blogs.map((blog) => (
                        <div
                            key={blog._id}
                            style={{
                                // Removed fixed width and relied on grid sizing
                                width: "100%", 
                                minHeight: "350px", // Use minHeight for better content flexibility
                                background: "#343434",
                                borderRadius: "20px",
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                                boxSizing: 'border-box',
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
                                        // Existing CSS for truncated text is good
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
                                    gap: isMobile ? '10px' : '15px' // Added gap for better button spacing
                                }}
                            >
                                <button
                                    onClick={() => openEditPopup(blog)}
                                    style={{
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
                                        flexGrow: isMobile ? 1 : 0, // Allow buttons to grow on mobile
                                    }}
                                >
                                    <Edit3 size={isMobile ? 18 : 20} />
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDeleteBlog(blog._id)}
                                    style={{
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
                                        flexGrow: isMobile ? 1 : 0, // Allow buttons to grow on mobile
                                    }}
                                >
                                    <Trash2 size={isMobile ? 18 : 20} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ADD/EDIT POPUP (Modal) */}
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