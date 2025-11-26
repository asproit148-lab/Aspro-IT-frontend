// src/components/Hero.jsx
import { motion } from "framer-motion";
import bg from "../assets/homeBg.jpg";

export default function Hero() {
  return (
    <section
      style={{
        backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100%",
  height: "580px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  boxShadow: "0px -4px 8px 2px #00508A inset",
  overflow: "hidden",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
  zIndex: 10,
  maxWidth: "750px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "24px",
        }}
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              fontFamily: "Poppins, sans-serif",
  fontWeight: 600,
  fontSize: "42px",
  lineHeight: "1.2",
  color: "#FFFFFF",
  margin: 0,
  marginLeft: "20px",
  background: "transparent",
          }}
        >
          "Future-Ready Skills, On Your <br /> Schedule."
        </motion.h1>

        {/* Description */}
        <p
          style={{
            width: "754px",
              fontFamily: "Poppins, sans-serif",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#FFFFFF",
  margin: 0,
  marginLeft: "20px",
  background: "transparent",
          }}
        >
          Join thousands of students and trusted companies worldwide who choose Aspro IT 
          <br /> to learn, grow, and succeed.
        </p>

        {/* CTA Button */}
        <a
          onClick={() => {
            document.getElementById("live-learning")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          style={{
            width: "fit-content",
  minWidth: "200px",
  padding: "14px 24px",
  marginLeft: "20px",
  height: "25px",
  borderRadius: "36px",
  border: "3px solid #FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  fontFamily: "Poppins, sans-serif",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "1",
  color: "#FFFFFF",
  textDecoration: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.border = "3px solid #00A8FF";
            e.target.style.boxShadow = "0 0 5px #00A8FF";
          }}
          onMouseLeave={(e) => {
            e.target.style.border = "3px solid white";
            e.target.style.boxShadow = "none";
          }}
        >
          Start Learning Today
        </a>
      </div>
    </section>
  );
}
