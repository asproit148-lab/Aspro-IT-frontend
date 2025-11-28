// BodyScrollLock.jsx

import { useEffect } from 'react';

/**
 * Custom component to lock/unlock body scrolling.
 * @param {boolean} isLocked - If true, locks scrolling (overflow: hidden).
 */
export default function BodyScrollLock({ isLocked }) {
  useEffect(() => {
    if (isLocked) {
      // Lock the body scroll
      document.body.style.overflow = 'hidden';
      // Optional: Add padding-right to compensate for the scrollbar width if needed
      // document.body.style.paddingRight = '17px'; 
    } else {
      // Unlock the body scroll
      document.body.style.overflow = 'unset';
      // document.body.style.paddingRight = '0';
    }

    // Cleanup function to ensure scroll is restored when the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      // document.body.style.paddingRight = '0';
    };
  }, [isLocked]); // Reruns whenever the lock state changes

  return null; // This component renders nothing
}