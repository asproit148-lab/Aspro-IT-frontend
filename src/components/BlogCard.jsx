import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../api/blog";

const desktopBreakpoint = 992; 

const slugify = (title) =>
  title.trim().toLowerCase().replace(/\s+/g, "-");

export default function BlogCard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  
  const mainContainerStyle = { 
    backgroundColor: "black", 
    color: "white", 
    paddingBottom: isMobile ? "40px" : "80px",
    paddingLeft: isMobile ? "20px" : "0", 
    paddingRight: isMobile ? "20px" : "0", 
  };
  
  const headingStyle = { 
    fontFamily: "Poppins, sans-serif", 
    fontWeight: 600, 
    fontSize: isMobile ? 36 : 48, 
    textAlign: "center", 
    marginTop: isMobile ? 30 : 50, 
    marginBottom: isMobile ? 30 : 50 
  };
  
  const cardsWrapperStyle = { 
    display: "flex", 
    justifyContent: "center", 
    gap: isMobile ? "20px" : "40px", 
    flexWrap: "wrap", 
    maxWidth: "1300px", 
    margin: "0 auto", 
  };

  const blogCardStyle = { 
    cursor: "pointer", 
    width: isMobile ? "100%" : "520px", 
    maxWidth: isMobile ? "none" : "520px", 
    textAlign: "left", 
  };

  const imageStyle = {
    width: "100%",
    height: isMobile ? "200px" : "336px", 
    borderRadius: "16px", 
    objectFit: "cover",
  };
  
  const titleStyle = { 
    fontFamily: "Poppins, sans-serif", 
    fontWeight: 500, 
    fontSize: isMobile ? "28px" : "40px", 
    marginBottom: "10px" 
  };


  return (
    <div style={mainContainerStyle}>
      <h2 style={headingStyle}>
        Blogs
      </h2>

      <div style={cardsWrapperStyle}>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            onClick={() => navigate(`/blogs/${blog._id}`)}
            style={blogCardStyle}
          >
            <img
              src={blog.image || "/fallback.jpg"}
              alt={blog.title}
              style={imageStyle}
            />
            <div style={{ marginTop: "24px" }}>
              <h3 style={titleStyle}>
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