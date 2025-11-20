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
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      {/* Container */}
      <div
        style={{
          width: "829px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1px",
          opacity: 1,
          position: "relative",
        }}
      >
        {/* Title */}
        <h2
          style={{
            margin: 0,
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "48px",
            lineHeight: "100%",
          }}
        >
          The Ultimate{" "}
          <span style={{ color: "#00A8FF", fontWeight: 900 }}>Learning </span>
          Experience
        </h2>

        {/* Subtitle */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "100%",
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
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {featureItems.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            style={{
              width: item.width,
              height: "108px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              borderRadius: "35px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50px",
                background: item.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0px 4px 20px 2px ${item.bg}`,
                padding: "17px",
              }}
            >
              {item.icon}
            </div>
            <span
              style={{
                color: "white",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "20px",
                marginTop: "8px",
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
