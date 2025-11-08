import { useState } from "react";
import { motion } from "framer-motion";

export default function SubtleScroll() {
  const [isAwake, setIsAwake] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => {
        if (!isAwake) {
          setTimeout(() => setIsAwake(true), 200);
        }
      }}
      animate={{
        boxShadow: isAwake
          ? "inset 0px 4px 8px #4EA34740, inset 0px -4px 8px #4EA34740"
          : "inset 0px 4px 8px #7956A380, inset 0px -4px 8px #7956A380",
      }}
      transition={{
        type: "spring",
        mass: 1,
        stiffness: 80,
        damping: 20,
        duration: 1.2,
      }}
      style={{
        width: "1440px",
        height: "536px",
        background: "#101010",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: isAwake ? "flex-start" : "center",
      }}
    >
      {isAwake && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            mass: 1,
            stiffness: 150,
            damping: 30,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            paddingLeft: "86px",
            gap: "40px",
          }}
        >
          <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(circle at 95% 5%, #4BDA43 50px, #A078D7 80px, #F29B9B 50px, transparent 20px), " +
            "radial-gradient(circle at 5% 95%, #4BDA43 50px, #A078D7 80px, #F29B9B 50px, transparent 320px)",
          filter: "blur(100px)",
        }}
      />
          {/* Left Image */}
          <img
            src="/src/assets/gemini.png"
            alt="Gemini"
            style={{
              width: "514px",
              height: "488px",
              borderRadius: "36px",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />

          {/* Right Text */}
          <div
            style={{
              width: "619px",
              color: "white",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <h2
              style={{
                fontWeight: 600,
                fontSize: "36px",
                lineHeight: "130%",
                marginBottom: "16px",
              }}
            >
              Summer Training and Internship <br /> Opportunity for College
              Students
            </h2>
            <p
              style={{
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "150%",
                color: "#E0E0E0",
              }}
            >
              ✨ Kickstart Your Career This Summer! 
              <br />Are you a college student eager to turn your summer break 
              <br />into a career-defining opportunity? Join our Summer Training
              <br />& Internship Program, carefully crafted for ambitious learners
              <br />who want more than just classroom knowledge. Over the 
              <br />course of the program, you’ll gain real-world skills, practical 
              <br />hands-on experience, and valuable industry exposure, while 
              <br />collaborating with professionals and peers on projects that 
              <br />truly make an impact. By the end, you won’t just complete a 
              <br />program — you’ll walk away with the confidence, portfolio, 
              <br /> andexpertise to stand out in your future career journey.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
