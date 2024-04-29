import React, { useEffect } from "react";

/**
 * Hook that checks for clicks outside of the passed ref
 */

export const useClickOutside = (
  ref: any,
  state: boolean,
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref?.current && !ref.current.contains(event.target) && state) {
        setShowPopup(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowPopup, state]);
};
