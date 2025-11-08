import logo from "../assets/logo.png";
import facebook from "../assets/facebook.png";
import whatsapp from "../assets/whatsapp.png";
import instagram from "../assets/instagram.png";
import x from "../assets/x.png";
import linkedin from "../assets/linkedin.png";

export default function Footer() {
  return (
    <footer
      style={{
        width: "1440px",
        height: "480px",
        background: "#101010",
        boxShadow: "inset 0px -8px 12px #2A292940, inset 0px 8px 12px #2A292940",
        display: "flex",
        alignItems: "flex-start",
        padding: "50px 80px",
        position: "relative",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        margin: "0px",
      }}
    >
      {/* LEFT SIDE (Company, Subscribe) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "48px",
          width: "407px",
        }}
      >
        {/* Company Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <img
            src={logo}
            alt="AsproIT Logo"
            style={{
              width: "221px",
              height: "63px",
              mixBlendMode: "lighten",
            }}
          />
          <p
            style={{
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "160%",
              color: "#FFFFFF",
            }}
          >
            “AsproIT is an IT training and internship company dedicated to
            empowering students and professionals with practical skills in
            Python, Generative AI, and Data Analytics. With hands-on projects,
            expert mentors, and strong career support, we help learners
            confidently step into the future of technology.”
          </p>
        </div>

        {/* Subscribe */}
        <div
          style={{
            width: "410px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h3
            style={{
              fontWeight: 600,
              fontSize: "24px",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Subscribe to Newsletter
          </h3>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "10px",
                padding: "0 20px",
                fontSize: "16px",
                border: "3px solid #FFFFFF40",
                background: "transparent",
                color: "#FFFFFF",
                outline: "none",
              }}
            />
            <button
              style={{
                width: "105px", 
                height: "40px", 
                borderRadius: "36px", 
                marginTop: "10px",
                padding: "8px 12px", 
                border: "1px solid #FFFFFF", background: "transparent", color: "#FFFFFF", fontWeight: 500, cursor: "pointer", transition: "all 0.3s ease",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Address, Company, Contacts) */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "60px",
          alignItems: "flex-start",
          marginTop: "0px",
        }}
      >
        {/* Address */}
        <div
          style={{
            width: "235px",
            display: "flex",
            flexDirection: "column",
            marginLeft: "120px",
            gap: "18px",
          }}
        >
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "36px",
              margin: 0,
            }}
          >
            Address
          </h3>
          <p
            style={{
              fontWeight: 500,
              fontSize: "24px",
              lineHeight: "32px",
              color: "#FFFFFF99",
            }}
          >
            1st Floor, Pratiksha,
            <br />
            Bhawan khajpura,
            <br />
            Patna, India-800014
          </p>
        </div>

        {/* Company */}
        <div
          style={{
            width: "167px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "36px",
              margin: 0,
            }}
          >
            Company
          </h3>
          {["Home", "Courses", "About", "Contact", "FAQ"].map((item, i) => (
            <a
              key={i}
              href="#"
              style={{
                textDecoration: "none",
                color: "#FFFFFF99",
                fontSize: "24px",
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Contacts */}
        <div
          style={{
            width: "229px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "36px",
              margin: 0,
            }}
          >
            Contacts
          </h3>
          {["+91-9128444000", "admin@asproit.com"].map((item, i) => (
            <a
              key={i}
              href="#"
              style={{
                textDecoration: "none",
                color: "#FFFFFF99",
                fontSize: "24px",
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Social Media Icons Section */}
      <div
        style={{
          position: "absolute",
          left: "1008px",
          top: "443px",
          width: "346px",
          height: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {[facebook, instagram, x, whatsapp, linkedin].map((icon, i) => (
          <img
            key={i}
            src={icon}
            alt="social-icon"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "contain",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          />
        ))}
      </div>
    </footer>
  );
}
