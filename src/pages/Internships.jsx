import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { getInternships } from "../api/job"; 

export default function Internships() {
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getInternships();
        setInternships(data);
      } catch (err) {
        console.error("Failed to fetch internships:", err);
      }
    })();
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "black" }}>
      <Header />

      <div
        style={{
          width: "100%",
          padding: "20px 80px",
          color: "white",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "100%",
            marginBottom: "10px",
          }}
        >
          Internships
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "100%",
            color: "white",
            opacity: 0.9,
            marginBottom: "40px",
          }}
        >
          From learning to earning  -  Start here
        </p>

        {/* internship Cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          {internships.map((job, index) => (
            <div
              key={index}
              style={{
                width: "350px",
                height: "210px",
                borderRadius: "12px",
                border: "1px solid #FFFFFF33",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "radial-gradient(196.17% 302.03% at 6.35% 24.96%, #101010 0%, #595959 100%)",
              }}
            >
              <div>
                {/* Role */}
                <h2
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                    marginBottom: "10px",
                  }}
                >
                  {job.roleTitle}
                </h2>

                {/* Company */}
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: "16px",
                    marginBottom: "10px",
                  }}
                >
                  {job.companyName}
                </p>

                {/* Package */}
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: "16px",
                  }}
                >
                  {job.ctcOrStipend}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid #FFFFFF33",
                  marginTop: "15px",
                }}
              ></div>

              {/* Apply Button */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => window.open(job.companyWebsite, "_blank")}
                  style={{
                    width: "97px",
                    height: "34px",
                    background: "#2B6EF0",
                    borderRadius: "10px",
                    border: "none",
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
