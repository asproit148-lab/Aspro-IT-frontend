import { BookOpen, Clock, MessageCircle, Briefcase, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LearningExperience() {
  const navigate = useNavigate();

  const featureItems = [
    {
      icon: <BookOpen size={36} color="white" />,
      label: "Courses",
      bg: "#8139E6",
      width: "112px",
      onClick: () => {
        document.getElementById("live-learning")?.scrollIntoView({
          behavior: "smooth",
        });
      },
    },
    {
      icon: <Clock size={36} color="white" />,
      label: "Self Material",
      bg: "#A539E6",
      width: "129px",
      onClick: () => navigate("/resources"),
    },
    {
      icon: <MessageCircle size={36} color="white" />,
      label: "Mock Interview",
      bg: "#E65C5C",
      width: "135px",
      onClick: () => navigate("/mock-interview"),
    },
    {
      icon: <UserCheck size={36} color="white" />,
      label: "Internship",
      bg: "#C539E6",
      width: "112px",
      onClick: () => navigate("/internships"),
    },
    {
      icon: <Briefcase size={36} color="white" />,
      label: "Jobs",
      bg: "#E63971",
      width: "90px",
      onClick: () => navigate("/jobs"),
    },
  ];

  return (
    <section
      style={{
        position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "50px 20px", // responsive horizontal padding
  gap: "30px",
      }}
    >
      {/* Container */}
      <div
        style={{
          maxWidth: "850px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  textAlign: "center",
  position: "relative",
  opacity: 1,
        }}
      >
        {/* Title */}
        <h2
          style={{
            margin: 0,
  fontFamily: "Poppins, sans-serif",
  fontWeight: 600,
  fontSize: "42px",
  lineHeight: "1.2",
          }}
        >
          The Ultimate{" "}
          <span style={{ color: "#00A8FF", fontWeight: 900 }}>Learning </span>
          Experience
        </h2>

        {/* Subtitle */}
        <p
          style={{
            margin: 0,
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "1.5",
  color: "grey",
          }}
        >
          Beyond Learning: Your All-in-One Pathway to a New Career.
        </p>
      </div>

      {/* Feature Cards */}
      <div
        style={{
          display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "50px",
  flexWrap: "wrap",
  width: "100%",
  maxWidth: "1000px",
        }}
      >
        {featureItems.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            style={{
              minWidth: "90px",
  maxWidth: "135px",
  height: "120px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  borderRadius: "35px",
  cursor: "pointer",
  transition: "transform 0.3s ease",
            }}
          >
            <div
              style={{
                width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: item.bg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0px 4px 20px 2px ${item.bg}`,
  padding: "12px",
              }}
            >
              {item.icon}
            </div>
            <span
              style={{
                color: "white",
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "16px",
  textAlign: "center",
  marginTop: "4px",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
