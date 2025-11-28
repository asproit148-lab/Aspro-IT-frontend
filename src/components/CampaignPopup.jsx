import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styled from "@emotion/styled";
import { getBanners } from "../api/campaign";
// Assuming you have this utility component from our previous conversation
import BodyScrollLock from "./BodyScrollLock"; 

const desktopBreakpoint = 768;

// --- Styled Components ---

const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 15px; /* Add padding for small mobile devices */
`;

const PopupContent = styled.div`
  position: relative;
  background-color: white;
  border: none;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.3);

  /* Web/Desktop Styles */
  width: 548px;
  max-height: 500px; /* Use max-height for better content adaptation */

  /* Mobile Styles (Max-width: 768px) */
  @media (max-width: ${desktopBreakpoint}px) {
    width: 100%;
    max-width: 400px; /* Constrain max width for slightly larger mobiles */
    max-height: 90vh; /* Don't cover the whole screen height */
    border-radius: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.4);
  border: none;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 20;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: ${desktopBreakpoint}px) {
    top: 10px;
    right: 10px;
    padding: 8px; /* Slightly larger tap target */
  }
`;

const BannerImageContainer = styled.div`
  width: 100%;
  /* Desktop Image Height */
  height: 300px;
  
  @media (max-width: ${desktopBreakpoint}px) {
    /* Mobile Image Height (e.g., smaller or aspect ratio based) */
    height: 200px; 
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BottomSection = styled.div`
  width: 100%;
  /* Use flex-grow instead of fixed height for better adaptability */
  flex-grow: 1; 
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: white;

  @media (max-width: ${desktopBreakpoint}px) {
    padding: 15px;
  }
`;

const TitleHeading = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  color: black;
  margin: 0;

  /* Desktop Font Size */
  font-size: 22px;

  /* Mobile Font Size */
  @media (max-width: ${desktopBreakpoint}px) {
    font-size: 18px;
  }
`;

const ActionButton = styled.button`
  margin-top: 20px;
  background-color: #480226;
  color: white;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;

  /* Desktop Button Size */
  width: 121px;
  height: 38px;
  font-size: 14px;

  &:hover {
    background-color: #5d0331; /* Slightly darker on hover */
  }

  /* Mobile Button Size */
  @media (max-width: ${desktopBreakpoint}px) {
    width: 150px;
    height: 45px;
    font-size: 16px;
    margin-top: 15px;
  }
`;

// --- Component Start ---

export default function CampaignPopup() {
  const [show, setShow] = useState(true);
  const [banner, setBanner] = useState(null);

  // 1. Auto-close timer logic
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  // 2. Data fetching logic
  useEffect(() => {
    getBanners()
      .then((res) => {
        if (res.data?.banners?.length > 0) {
          setBanner(res.data.banners[0]);
        }
      })
      .catch((err) => console.error("Banner Fetch Error:", err));
  }, []);

  const handleClose = () => setShow(false);

  if (!show) return null;

  const image = banner?.image;
  const title = banner?.title || "Limited Time Christmas Deal!";

  // Function to handle button click and navigation
  const handleButtonClick = () => {
    if (banner?.url) {
      window.open(banner.url, "_blank", "noopener,noreferrer");
      handleClose(); // Close popup after clicking
    }
  };

  return (
    <>
      {/* 3. SCROLL LOCK FIX */}
      <BodyScrollLock isLocked={show} /> 
      
      <PopupOverlay>
        <PopupContent>
          
          {/* Close Button */}
          <CloseButton onClick={handleClose}>
            <X size={18} color="white" />
          </CloseButton>

          {/* Banner Image */}
          <BannerImageContainer>
            <BannerImage
              src={image}
              alt={title}
            />
          </BannerImageContainer>

          {/* Bottom Section */}
          <BottomSection>
            {/* Heading */}
            <TitleHeading>
              {title}
            </TitleHeading>

            {/* Button */}
            <ActionButton onClick={handleButtonClick}>
              Click Here
            </ActionButton>
          </BottomSection>
        </PopupContent>
      </PopupOverlay>
    </>
  );
}