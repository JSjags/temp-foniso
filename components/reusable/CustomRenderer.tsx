import React, { useEffect, useRef, ReactNode } from "react";

interface CustomRendererProps {
  children: ReactNode;
}

const CustomRenderer: React.FC<CustomRendererProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const { innerWidth, innerHeight } = window;

        if (rect.right > innerWidth) {
          container.style.left = `${innerWidth - rect.width}px`;
        }
        if (rect.bottom > innerHeight) {
          container.style.top = `${innerHeight - 48 - rect.height}px`;
        }
        if (rect.left < 0) {
          container.style.left = "0px";
        }
        if (rect.top < 0) {
          container.style.top = "0px";
        }
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "fixed" }}>
      {children}
    </div>
  );
};

export default CustomRenderer;
