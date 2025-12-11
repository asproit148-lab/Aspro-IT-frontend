import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../api/blog";
import Footer from '../components/Footer';

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
        // --- START OF FIX: Reverse the array to display LIFO (Newest First) on the cards ---
        // Using [...array] to create a shallow copy before reversing, ensuring the original data object isn't mutated.
        const rawBlogs = data.blogs || []; 
        const formatted = [...rawBlogs].reverse().map((b) => ({
          _id: b._id,
          title: b.Blog_title,
          description: b.Blog_content,
          image: b.BlogImage || "/fallback.jpg",
          slug: slugify(b.Blog_title, { lower: true, strict: true }),
        }));
        // --- END OF FIX ---
        setBlogs(formatted);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    })();
  }, []);
  
  const mainContainerStyle = { 
    backgroundColor: "black", 
    marginTop: isMobile ? "70px" : "120px", 
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
    marginBottom: isMobile ? 30 : 20 
  };
  
  const cardsWrapperStyle = { 
    // Increased maxWidth to accommodate four cards
    display: "flex", 
    justifyContent: "left", 
    paddingLeft: "60px",
    gap: isMobile ? "20px" : "30px", // Reduced gap slightly to fit four cards
    flexWrap: "wrap", 
    maxWidth: "1600px", // Increased max width
    margin: "0 auto", 
  };

  const blogCardStyle = { 
    cursor: "pointer", 
    width: isMobile ? "100%" : "300px", // New width to fit 4 in a row
    maxWidth: isMobile ? "none" : "350px", // New max width
    textAlign: "left", 
  };

  const imageStyle = {
    width: "100%",
    height: isMobile ? "200px" : "200px", // Adjusted desktop height to look better with smaller width
    borderRadius: "16px", 
    objectFit: "cover",
  };
  
  const titleStyle = { 
    fontFamily: "Poppins, sans-serif", 
    fontWeight: 500, 
    fontSize: isMobile ? "28px" : "28px", // Reduced desktop font size for smaller card width
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
            onClick={() => navigate(`/blogs/${blog.slug}/${blog._id}`)}
            style={blogCardStyle}
          >
            <img
  src={blog.image || "/fallback.jpg"}
  alt={blog.title || "Blog thumbnail"}
  loading="lazy"
  style={imageStyle}
/>
            <div style={{ marginTop: "24px" }}>
              <h3 style={titleStyle}>
                {blog.title}
              </h3>
              <p style={{ fontSize: "16px", color: "#ccc" }}>
  {blog.description?.slice(0, 100)}...
</p>
<p style={{ fontSize: "14px", opacity: 0.8 }}>2 min read</p>

            </div>
          </div>
        ))}

      </div>
<Footer />
    </div>
  );
}