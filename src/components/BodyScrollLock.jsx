import { useEffect } from "react";

export default function BodyScrollLock({ isLocked }) {
  useEffect(() => {
    const target = document.documentElement; 
    
    if (isLocked) {
      target.style.overflow = "hidden";
    } else {
      target.style.overflow = "auto";
    }

    return () => {
      target.style.overflow = "auto"; 
    };
  }, [isLocked]);

  return null;
}
