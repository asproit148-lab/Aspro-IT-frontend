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
        const rawBlogs = data.blogs || []; 
        const formatted = [...rawBlogs].reverse().map((b) => ({
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
    marginTop: isMobile ? "70px" : "80px", 
    color: "white", 
    padding: 0, 
  };
  
  const headingStyle = { 
    fontFamily: "Poppins, sans-serif", 
    fontWeight: 600, 
    fontSize: isMobile ? 36 : 48, 
    textAlign: "center", 
    paddingTop: isMobile ? 30 : 50, 
    marginBottom: isMobile ? 30 : 50 
  };
  
  const cardsWrapperStyle = { 
    display: "flex", 
    justifyContent: isMobile ? "center" : "space-between", 
    
    gap: isMobile ? "20px" : "30px",
    flexWrap: "wrap", 
    maxWidth: "1280px",
    margin: "0 auto", 
  };
    
  const desktopCardWidth = `calc(25% - 22.5px)`;

  const blogCardStyle = { 
    cursor: "pointer", 
    width: isMobile ? "90%" : desktopCardWidth, 
    maxWidth: isMobile ? "none" : "none", 
    textAlign: "left", 
    // Ensure card scales down if the screen is narrow but above the mobile breakpoint
    minWidth: isMobile ? 'unset' : '280px',
  };

  const imageStyle = {
    width: "100%",
    height: isMobile ? "200px" : "200px", 
    borderRadius: "16px", 
    objectFit: "cover",
  };
  
  const titleStyle = { 
    fontFamily: "Poppins, sans-serif", 
    fontWeight: 500, 
    // Adjusted font size to fit dynamically sized card
    fontSize: isMobile ? "28px" : "22px", 
    marginBottom: "10px" ,
    lineHeight: 1.3,
  };
    
  // Separate style for the desktop card wrapper to handle the remaining space if fewer than 4 items are in the last row
  const desktopCardContainerStyle = {
    ...cardsWrapperStyle,
    // When using space-between, we need a gap/margin/padding on the items themselves or use a different layout strategy (like flex-grow)
    // To ensure cards always start from the left on desktop and wrap cleanly, we'll revert to 'justifyContent: "flex-start"' and rely on the margin/gap between them.
    justifyContent: isMobile ? "center" : "flex-start", 
    // Add margin bottom to ensure footer is separated
    marginBottom: "40px",
  }


  return (
    <div style={mainContainerStyle}>
      <h2 style={headingStyle}>
        Blogs
      </h2>

      <div style={desktopCardContainerStyle}>
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