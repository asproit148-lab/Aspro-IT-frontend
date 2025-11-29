import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getBlog } from "../api/blog";
import { ArrowLeft } from "lucide-react";

const SERVER_URL = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://aspro-it-frontend.vercel.app"
];

// Define a mobile breakpoint
const mobileBreakpoint = 768;

export default function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isMobile = screenWidth < mobileBreakpoint;

  // Effect to track screen size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBlog(slug);
        const b = data.blog;
        setBlog({
          title: b.Blog_title,
          description: b.Blog_content,
          image: b.BlogImage
            ? b.BlogImage.startsWith("http")
              ? b.BlogImage
              : `${SERVER_URL}/uploads/${b.BlogImage}`
            : "/fallback.jpg",
        });
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setBlog(null);
      }
    })();
  }, [slug]);

  if (!blog) {
    return (
      <div className="bg-black min-h-screen text-white font-[Poppins] flex items-center justify-center">
        <p>Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-[Poppins]">
      <Header />
      {/* ⬅️ BACK BUTTON (Minimalist Icon) */}
      <div style={{ 
            maxWidth: "1200px", 
            margin: "0 auto", 
            padding: isMobile ? "20px 15px 0" : "40px 40px 0" 
        }}>
        <button
          // navigate(-1) is generally safer than hardcoding '/blogs'
          onClick={() => navigate(-1)} 
          style={{
            background: "none",
            border: "none", // No border
            color: "#FFFFFF",
            cursor: "pointer",
            padding: "0",
            outline: 'none',
            display: 'block', // Ensures it takes up space for clicking
            transition: 'opacity 0.2s',
          }}
        >
          <ArrowLeft size={isMobile ? 24 : 32} /> {/* Larger icon size for tap targets */}
        </button>
      </div>
      <IndividualBlog
        title={
          <div
            style={{
              maxWidth: isMobile ? "360px" : "1200px",
              margin: "0 auto",
              lineHeight: "1.8",
              color: "#ccc",
              textAlign: "center",
              fontSize: isMobile ? "22px" : "28px",
            }}>
            {blog.title}
          </div>}
        image={blog.image}
        content={
          <div
            style={{
              // Desktop styles: maxWidth, centered
              maxWidth: isMobile ? "360px" : "1200px",
              margin: "0 auto",
              lineHeight: "1.8",
              color: "#ccc",
              textAlign: "justify",
              
              // ⬅️ CRUCIAL: Responsive adjustments
              padding: isMobile ? "20px 15px" : "20px 40px",
              fontSize: isMobile ? "16px" : "20px",
            }}
          >
            {blog.description
              .split(/\n\n|\. /)
              .map((p, i) => (
                <p key={i} style={{ marginBottom: isMobile ? "14px" : "18px" }}>
                  {p.trim()}
                </p>
              ))}
          </div>
        }
      />
    </div>
  );
}