// BodyScrollLock.jsx

import { useEffect } from 'react';

export default function BodyScrollLock({ isLocked }) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLocked]); 

  return null; 
}