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
        width: "1440px",
        height: "550px",
        marginTop: "0",
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "0 80px",
        opacity: 1,
        boxShadow: "0px -4px 8px 2px #00508A inset",
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
          backgroundColor: "rgba(0,0,0,0.10)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "754px",
          height: "267px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "36px",
        }}
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              width: "754px",
              height: "112px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "48px",
              lineHeight: "56px",
              color: "#FFFFFF",
              margin: 0,
              verticalAlign: "middle",
              background: "transparent",
          }}
        >
          "Future-Ready Skills, On Your <br /> Schedule."
        </motion.h1>

        {/* Description */}
        <p
          style={{
            width: "754px",
              height: "54px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "100%",
              color: "#FFFFFF",
              margin: 0,
              verticalAlign: "middle",
              background: "transparent",
          }}
        >
          Join thousands of students and trusted companies worldwide who choose Aspro IT 
          <br /> to learn, grow, and succeed.
        </p>

        {/* CTA Button */}
        <a
          href="#"
          style={{
            width: "238px",
            height: "60px",
            borderRadius: "36px",
            border: "3px solid #FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "18px 8px 18px 8px",
            gap: "10px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "100%",
            color: "#FFFFFF",
            textDecoration: "none",
            opacity: 1,
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
