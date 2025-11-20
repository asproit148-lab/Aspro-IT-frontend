import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../api/blog";
const slugify = (title) =>
  title.trim().toLowerCase().replace(/\s+/g, "-");

export default function BlogCard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBlogs(); // fetch blogs
        const formatted = (data.blogs || []).map((b) => ({
          _id: b._id,
          title: b.Blog_title,
          description: b.Blog_content,
          image: b.BlogImage || "/fallback.jpg",
          slug: slugify(b.Blog_title, { lower: true, strict: true }),
        }));
        setBlogs(formatted);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    })();
  }, []);

  return (
    <div style={{ backgroundColor: "black", color: "white", paddingBottom: "80px" }}>
      <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 48, textAlign: "center", marginTop: 50, marginBottom: 50 }}>
        Blogs
      </h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 150, flexWrap: "wrap" }}>
        {blogs.map((blog) => (
  <div
    key={blog._id}
    onClick={() => navigate(`/blogs/${blog._id}`)}
    style={{ cursor: "pointer", width: "519px", textAlign: "left" }}
  >
    <img
      src={blog.image || "/fallback.jpg"}
      alt={blog.title}
      style={{
        width: "514px",
        height: "336px",
        borderRadius: "36px",
        border: "1px solid #000",
        objectFit: "cover",
      }}
    />
    <div style={{ marginTop: "24px" }}>
      <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "40px", marginBottom: "10px" }}>
        {blog.title}
      </h3>
      <p style={{ fontSize: "16px", color: "white" }}>2 min read</p>
    </div>
  </div>
))}

      </div>
    </div>
  );
}
