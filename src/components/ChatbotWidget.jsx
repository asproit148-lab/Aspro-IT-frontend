import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { askChatbot } from "../api/chatbot";
import whatsappLogo from "../assets/whatsapp.webp";
import chatBot from '../assets/chatBot.webp';

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "👋 Hi! How can we help you today?",
      links: []
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input.trim(), links: [] };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await askChatbot({ message: input.trim() });
      
      // Handle the response object {text, links, type}
      const botMsg = { 
        sender: "bot", 
        text: res.text || res.reply || "Sorry, I couldn't understand that.",
        links: res.links || []
      };
      
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chatbot request failed:", err);
      const botMsg = {
        sender: "bot",
        text: "❌ Sorry, something went wrong. Please try again.",
        links: []
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Chat Open Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#3D96E0",
            color: "#fff",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            cursor: "pointer",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <img src={chatBot} alt="Chatbot" style={{ width: "64px", height: "64px" }} />
        </button>
      )}

      {/* WhatsApp Button */}
      {!open && (
        <button
          onClick={() => window.open("https://wa.me/919128444000", "_blank")}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#25D366",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            cursor: "pointer",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <img src={whatsappLogo} alt="WhatsApp" style={{ width: "64px", height: "64px" }} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "350px",
            maxWidth: "92vw",
            height: "500px",
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 6px 22px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px",
              background: "#3D96E0",
              color: "#fff",
              borderTopLeftRadius: "18px",
              borderTopRightRadius: "18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "600",
            }}
          >
            Customer Support 💬
            <X size={20} style={{ cursor: "pointer" }} onClick={() => setOpen(false)} />
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              overflowY: "auto",
              background: "#f7f9fc",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: msg.sender === "user" ? "#3D96E0" : "#E6E6E6",
                    color: msg.sender === "user" ? "white" : "black",
                    fontSize: "14px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {/* Message Text */}
                  <div>{msg.text}</div>
                  
                  {/* Links/Buttons */}
                  {msg.links && msg.links.length > 0 && (
                    <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {msg.links.map((link, linkIdx) => (
                        <a
                          key={linkIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "block",
                            padding: "8px 12px",
                            background: msg.sender === "user" ? "#fff" : "#3D96E0",
                            color: msg.sender === "user" ? "#3D96E0" : "#fff",
                            textAlign: "center",
                            borderRadius: "8px",
                            textDecoration: "none",
                            fontSize: "13px",
                            fontWeight: "600",
                            transition: "all 0.2s",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.02)";
                            e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "none";
                          }}
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "12px" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "#E6E6E6",
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#3D96E0",
                    animation: "bounce 1.4s infinite ease-in-out both",
                  }}></div>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#3D96E0",
                    animation: "bounce 1.4s infinite ease-in-out both",
                    animationDelay: "0.16s",
                  }}></div>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#3D96E0",
                    animation: "bounce 1.4s infinite ease-in-out both",
                    animationDelay: "0.32s",
                  }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              style={{
                flex: 1,
                height: "38px",
                padding: "0 10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                padding: "0 14px",
                background: loading ? "#ccc" : "#3D96E0",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "600",
              }}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
          } 
          40% { 
            transform: scale(1.0);
          }
        }
      `}</style>
    </>
  );
}
