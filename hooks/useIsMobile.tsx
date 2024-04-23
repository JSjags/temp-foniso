import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [is_mobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 760px)");

    if (isMobile.matches) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    window.addEventListener("resize", () => {
      if (isMobile.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (isMobile.matches) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      });
    };
  }, []);

  return is_mobile;
};

export default useIsMobile;
