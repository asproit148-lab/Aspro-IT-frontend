import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import IndividualBlog from "../components/IndividualBlog"; // 🔥 REQUIRED IMPORT
import { getBlog } from "../api/blog";
import { ArrowLeft } from "lucide-react";
import Footer from '../components/Footer';

// 🔥 Pick correct server URL based on environment
const SERVER_URL =
  import.meta.env.VITE_API_URL || "https://aspro-it-frontend.vercel.app";

const mobileBreakpoint = 768;

export default function BlogPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isMobile = screenWidth < mobileBreakpoint;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBlog(id); // slug or ID → confirm backend
        const b = data.blog;

        setBlog({
          title: b.Blog_title,
          description: b.Blog_content,
          image: b.BlogImage
            ? b.BlogImage.startsWith("http")
              ? b.BlogImage
              : `${SERVER_URL}/uploads/${b.BlogImage}` // Proper fix
            : "/fallback.jpg",
        });
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setBlog(null);
      }
    })();
  }, [id]);

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

      {/* Back Button */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "20px 15px 0" : "40px 40px 0" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            padding: 0,
            transition: "opacity .2s",
          }}>
          <ArrowLeft size={isMobile ? 24 : 32} />
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
          </div>
        }
        image={blog.image}
        content={
          <div
            style={{
              maxWidth: isMobile ? "360px" : "1200px",
              margin: "0 auto",
              lineHeight: "1.8",
              color: "#ccc",
              textAlign: "justify",
              padding: isMobile ? "20px 15px" : "20px 40px",
              fontSize: isMobile ? "16px" : "20px",
            }}>
            {blog.description.split(/\n\n|\. /).map((p, i) => (
              <p key={i} style={{ marginBottom: isMobile ? "14px" : "18px" }}>
                {p.trim()}
              </p>
            ))}
          </div>
        }
      />
      <Footer />
    </div>
  );
}
