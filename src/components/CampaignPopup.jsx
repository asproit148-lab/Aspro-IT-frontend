import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getBanners } from "../api/campaign"; 

export default function CampaignPopup() {
  const [show, setShow] = useState(true);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getBanners()
      .then((res) => {
        if (res.data?.banners?.length > 0) {
          setBanner(res.data.banners[0]);
        }
      })
      .catch((err) => console.error("Banner Fetch Error:", err));
  }, []);

  if (!show) return null;

  const image = banner?.image;
  const title = banner?.title || "Limited Time Christmas Deal!";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "548px",
          height: "500px",
          backgroundColor: "white",
          border: "none",
          borderRadius: "32px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 4px 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            backgroundColor: "rgba(0,0,0,0.4)",
            border: "none",
            padding: "6px",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 20,
          }}
        >
          <X size={18} color="white" />
        </button>

        {/* Banner Image */}
        <div style={{ width: "100%", height: "300px" }}>
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Bottom Section */}
        <div
          style={{
            width: "100%",
            height: "249px",
            paddingTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          {/* Heading */}
          <h1
            style={{
              fontFamily: "Poppins",
              fontWeight: 800,
              fontSize: "22px",
              color: "black",
            }}
          >
            {title}
          </h1>

          {/* Subtitle (KEEP COMMENTED AS YOU ASKED) */}
          {/* <p
            style={{
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "12px",
              color: "rgba(0,0,0,0.8)",
              lineHeight: "1.4",
              marginTop: "4px",
            }}
          >
            Invest in yourself this season—enjoy exclusive discounts on top 
            online courses. <br />
            Offer valid for a limited time!
          </p> */}

          {/* Button */}
          <button
          onClick={() => {
    if (banner?.url) {
      window.open(banner.url, "_blank", "noopener,noreferrer");
    }
  }}
            style={{
              marginTop: "20px",
              width: "121px",
              height: "38px",
              backgroundColor: "#480226",
              color: "white",
              borderRadius: "8px",
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Click Here
          </button>
        </div>
      </div>
    </div>
  );
}
