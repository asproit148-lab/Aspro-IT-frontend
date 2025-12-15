import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { askChatbot } from "../api/chatbot";
import whatsappLogo from "../assets/whatsapp.webp";
import chatBot from '../assets/chatBot.webp';

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! How can we help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg = { sender: "user", text: input.trim() };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");

  try {
    const res = await askChatbot({ message: input.trim() });
    
    let replyText;
    
    if (typeof res.reply === 'object' && res.reply !== null) {
        replyText = res.reply.content || res.reply.text;

        if (!replyText) {
            replyText = `[Error: Reply object received] ${JSON.stringify(res.reply)}`;
        }
    } else {
        replyText = res.reply;
    }
    
    const botMsg = { sender: "bot", text: replyText };
    setMessages((prev) => [...prev, botMsg]);
    
  } catch (err) {
    console.error("Chatbot request failed:", err);
    const botMsg = {
      sender: "bot",
      text: "❌ Sorry, something went wrong. Please try again.",
    };
    setMessages((prev) => [...prev, botMsg]);
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
          <img src={chatBot} alt="WhatsApp" style={{ width: "64px", height: "64px" }} />
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
            height: "450px",
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
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "9px 13px",
                    borderRadius: "12px",
                    background: msg.sender === "user" ? "#3D96E0" : "#E6E6E6",
                    color: msg.sender === "user" ? "white" : "black",
                    fontSize: "14px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
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
              style={{
                padding: "0 14px",
                background: "#3D96E0",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
