import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import styled from "@emotion/styled";
import { getBanners } from "../api/campaign";
import BodyScrollLock from "./BodyScrollLock"; 

const desktopBreakpoint = 768;

const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 15px; 
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
  max-height: 500px; 

  /* Mobile Styles) */
  @media (max-width: ${desktopBreakpoint}px) {
    width: 100%;
    max-width: 400px; 
    max-height: 90vh; 
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
    padding: 8px; 
  }
`;

const BannerImageContainer = styled.div`
  width: 100%;
  /* Desktop Image Height */
  height: 300px;
  
  @media (max-width: ${desktopBreakpoint}px) {
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
    background-color: #5d0331; 
  }

  /* Mobile Button Size */
  @media (max-width: ${desktopBreakpoint}px) {
    width: 150px;
    height: 45px;
    font-size: 16px;
    margin-top: 15px;
  }
`;

// Function to add Cloudinary URL transformation parameters
const optimizeCloudinaryUrl = (url) => {
  // Check if the URL is from Cloudinary
  if (url && url.includes("res.cloudinary.com")) {
    const pathIndex = url.indexOf("/upload/");
    if (pathIndex !== -1) {
      const baseUrl = url.substring(0, pathIndex + 8); // .../upload/
      const pathAndResource = url.substring(pathIndex + 8);

      const transformation = `c_fill,g_auto,w_550,h_300,f_auto`; 
      
      return `${baseUrl}${transformation}/${pathAndResource}`;
    }
  }
  return url;
};

export default function CampaignPopup() {
  const [show, setShow] = useState(true);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 15000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getBanners()
      .then((res) => {
        if (res.data?.banners?.length > 0) {
          const allBanners = res.data.banners;
          const newestBanner = [...allBanners].reverse()[0]; 

          setBanner(newestBanner);
        }
      })
      .catch((err) => console.error("Banner Fetch Error:", err));
  }, []);

  const handleClose = () => setShow(false);

  if (!show) return null;

  const urlToOptimize = banner?.image?.startsWith("http")
  ? banner.image
  : `${import.meta.env.VITE_API_URL}/uploads/${banner?.image}`;

const image = optimizeCloudinaryUrl(urlToOptimize); // Use the optimization function

const title = banner?.title || "Limited Time Christmas Deal!";

  const handleButtonClick = () => {
    if (banner?.url) {
      window.open(banner.url, "_blank", "noopener,noreferrer");
      handleClose(); 
    }
  };

  return (
  <>
    <BodyScrollLock isLocked={show} />

    {show && (
      <PopupOverlay as={motion.div}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: .25 }}
      >
        <PopupContent
          as={motion.div}
          initial={{ scale: .85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >

          <CloseButton onClick={handleClose} aria-label="Close popup">
            <X size={18} color="white" />
          </CloseButton>

          <BannerImageContainer>
            <BannerImage 
    src={image} 
    alt={title} 
    // ADDED: Explicit dimensions to reserve space and fix CLS
    width="548" 
    height="300" 
  />
          </BannerImageContainer>

          <BottomSection>
            <TitleHeading>{title}</TitleHeading>

            <ActionButton 
              onClick={handleButtonClick}
              style={{ width: "150px" }}
            >
              Click Here
            </ActionButton>
          </BottomSection>

        </PopupContent>
      </PopupOverlay>
    )}
  </>
);

}