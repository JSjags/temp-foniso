// src/components/FullScreenContent.tsx
import React from "react";

interface FullScreenContentProps {
  url: string;
}

const FullScreenContent: React.FC<FullScreenContentProps> = ({ url }) => {
  const isImage = /\.(jpeg|jpg|gif|png)$/.test(url);
  const isVideo = /\.(mp4|ogg|webm)$/.test(url);

  console.log(url);

  const renderContent = () => {
    if (isImage) {
      return (
        <div className="fixed  top-0 left-0 w-screen h-screen flex justify-center items-center bg-black">
          <img
            src={url}
            alt="FullScreenImage"
            className="max-w-full max-h-full"
          />
        </div>
      );
    } else if (isVideo) {
      return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black">
          <video controls autoPlay className="max-w-full max-h-full">
            <source src={url} type={`video/${url.split(".").pop()}`} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {
      return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black">
          <p className="text-white">Unsupported URL type.</p>
        </div>
      );
    }
  };

  return renderContent();
};

export default FullScreenContent;
