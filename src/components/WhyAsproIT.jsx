// src/components/WhyAsproIT.jsx
import IndustryExperts from "../assets/IndustryExperts.png";
import HandsOnProjects from "../assets/HandsOnProjects.png";
import FlexibleLearning from "../assets/FlexibleLearning.png";
import CareerSupport from "../assets/CareerSupport.png";


export default function WhyAsproIT() {
  const cards = [
    {
      img: IndustryExperts,
      title: "Industry Trained Experts",
      desc: "Learn from industry professionals who bring real-world experiences into the classroom.",
    },
    {
      img: HandsOnProjects,
      title: "Hands-On Project",
      desc: "Gain insights and practical skills that go beyond textbooks and let you brainstorm.",
    },
    {
      img: FlexibleLearning,
      title: "Flexible Learning",
      desc: "Flexible learning tailored to your schedule, empowering growth at your own pace.",
    },
    {
      img: CareerSupport,
      title: "Career Support",
      desc: "Career support designed to guide your journey and unlock lasting professional success.",
    },
  ];

  return (
    <section
      style={{
        width: "1440px",
        height: "576px",
        background:
          "radial-gradient(149.8% 402.76% at 29.09% 23.7%, #101010 11.88%, #595959 100%)",
        boxShadow:
          "-4px -4px 16px 0px #FFFFFF0D inset, 4px 4px 16px 0px #FFFFFF0D inset",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background:
              "radial-gradient(circle at 5% 5%, rgba(180,180,180,0.9) 0px, rgba(180,180,180,0.55) 80px, rgba(180,180,180,0.25) 250px, transparent 320px)",
            filter: "blur(60px)",
          }}
        />

      {/* Heading */}
      <h2
        style={{
          width: "478px",
          height: "72px",
          margin: "36px 0 0 0",
          marginTop: "50px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "40px",
          lineHeight: "100%",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        Why Choose{" "}
        <span
        style={{
          background: "linear-gradient(90deg, #FAAD4F, #CB46DB)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "48px",
          fontWeight: 700,
        }}
        >
        AsproIT
        </span>

        ?
      </h2>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "25px",
          marginTop: "30px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              width: "299px",
              height: "360px",
              borderRadius: "24px",
              background: "#1C1C1C",
              boxShadow: "0px 4px 16px 0px #FFFFFF40",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              textAlign: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
          >
            <img
              src={card.img}
              alt={card.title}
              style={{
                width: "299px",
                height: "215px",
                objectFit: "cover",
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
              }}
            />
            <h3
              style={{
                width: "100%",
                margin: "16px 0 8px 0",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "22px",
                color: "#FFFFFF",
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                width: "266px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "120%",
                color: "#FFFFFF",
              }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
