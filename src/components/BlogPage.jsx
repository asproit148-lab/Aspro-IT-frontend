import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import IndividualBlog from "../components/IndividualBlog";
import { getBlog } from "../api/blog";

const SERVER_URL = "http://localhost:3000";

export default function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

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
      <IndividualBlog
        title={blog.title}
        image={blog.image}
        content={<div dangerouslySetInnerHTML={{ __html: blog.description }} />}
      />
    </div>
  );
}
