"use client";

import { useEffect } from "react";

const TawkToScript = () => {
  useEffect(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/65f967baa0c6737bd1226ca9/1hpb3qdj3";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    if (s0?.parentNode) {
      s0?.parentNode.insertBefore(s1, s0);
    }
  }, []);

  return null;
};

export default TawkToScript;
