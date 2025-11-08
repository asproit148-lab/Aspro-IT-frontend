export default function Qualities() {
  return (
    <section
      style={{
        width: "1268px",
        margin: "80px auto 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "60px",
        color: "white",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "24px",
          justifyContent: "center",
        }}
      >
        {/* Box 1 */}
        <div
          style={{
            width: "407px",
            height: "200px",
            borderRadius: "36px",
            background: "#BB93EF40",
            border: "2px solid #BB97E9",
            color: "#E5BBF4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
        <p style={{ fontSize: "40px", fontWeight: "700", lineHeight: "1" }}>
          1500+ <br />
          <span style={{ fontSize: "24px", fontWeight: "700" }}> Students Trained </span>
        </p>
        </div>

        {/* Box 2 */}
        <div
          style={{
            width: "407px",
            height: "200px",
            borderRadius: "36px",
            background: "#B8159540",
            border: "2px solid #CD60CC",
            color: "#F8A1E8",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "40px", fontWeight: "700", lineHeight: "1" }}>
          10+ <br />
          <span style={{ fontSize: "24px", fontWeight: "700" }}> Hiring Partners </span>
        </p>
        </div>

        {/* Box 3 */}
        <div
          style={{
            width: "407px",
            height: "200px",
            borderRadius: "36px",
            background: "#CB0E6040",
            border: "2px solid #F64E9D",
            color: "#E66896",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
        <p style={{ fontSize: "40px", fontWeight: "700", lineHeight: "1" }}>
          150+ <br />
          <span style={{ fontSize: "24px", fontWeight: "700" }}> Courses Delivered </span>
        </p>
        </div>
      </div>

      {/* Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "1268px",
          gap: "60px",
        }}
      >
        {/* Left Text */}
        <div
          style={{
            width: "622px",
            height: "440px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "64px",
            fontWeight: 600,
            lineHeight: "125%",
          }}
        >
          Ready to Transform Your Career with AsproIT?
        </div>

        {/* Right Form Box */}
        <div
          style={{
            width: "622px",
            height: "440px",
            borderRadius: "36px",
            background: "#6325B8",
            boxShadow: `
              0px 4px 8px 0px #00000040 inset,
              0px -4px 8px 0px #00000040 inset,
              -4px 0px 8px 0px #00000040 inset,
              4px 0px 8px 0px #00000040 inset
            `,
            padding: "5px 30px 0",
            marginBottom: "50px",
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "32px",
              fontWeight: 600,
              marginBottom: "25px",
              marginLeft: "28px",
            }}
          >
            Enroll Now & Kickstart Your Career
          </h3>

          {/* Inputs */}
          <div style={{ display: "flex", gap: "18px" }}>
            
            <input
              type="text"
              placeholder="Name:"
              style={{
                width: "257px",
                height: "45px",
                borderRadius: "18px",
                padding: "0 15px",
                border: "none",
                outline: "none",
              }}
            />
            <input
              type="email"
              placeholder="Email:"
              style={{
                width: "263px",
                height: "45px",
                borderRadius: "18px",
                padding: "0 15px",
                border: "none",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <input
              type="text"
              placeholder="Mobile No:"
              style={{
                width: "257px",
                height: "45px",
                borderRadius: "18px",
                padding: "0 15px",
                border: "none",
                outline: "none",
              }}
            />
            <input
              type="text"
              placeholder="Course Name:"
              style={{
                width: "263px",
                height: "45px",
                borderRadius: "18px",
                padding: "0 15px",
                border: "none",
                outline: "none",
              }}
            />
          </div>

          <input
            type="text"
            placeholder="Mode of Training:"
            style={{
              width: "555px",
              height: "45px",
              borderRadius: "18px",
              padding: "0 15px",
              border: "none",
              outline: "none",
            }}
          />

          <button
            style={{
              width: "238px",
              height: "60px",
              borderRadius: "36px",
              marginTop: "20px",
              border: "3px solid #FFFFFF",
              background: "transparent",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
              alignSelf: "center",
              transition: "all 150ms linear",
              padding: "18px 36px",
            }}
            onMouseEnter={(e) => {
              e.target.style.width = "250px";
              e.target.style.height = "68px";
              e.target.style.fontSize = "18px";
              e.target.style.padding = "22px 40px";
              e.target.style.border = "3px solid #A86AFF";
              e.target.style.boxShadow = "0px 0px 20px 0px #494949";
            }}
            onMouseLeave={(e) => {
              e.target.style.width = "238px";
              e.target.style.height = "60px";
              e.target.style.fontSize = "16px";
              e.target.style.padding = "18px 36px";
              e.target.style.border = "3px solid #FFFFFF";
              e.target.style.boxShadow = "none";
            }}
          >
          Join Free Trial Class
          </button>
        </div>
      </div>
    </section>
  );
}
