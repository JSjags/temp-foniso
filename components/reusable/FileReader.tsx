import React from "react";

const reduceImageQuality = async (
  files: File[],
  maxSize = 1024 * 1024,
  quality = 0.7
) => {
  const promises = [];

  for (const file of files) {
    if (file.size > maxSize) {
      promises.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.src = (event.target as FileReader).result as string;
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const maxWidth = 800; // Adjust as needed
              const maxHeight = 600; // Adjust as needed
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
                }
              } else {
                if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight;
                }
              }

              canvas.width = width;
              canvas.height = height;

              if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
              }

              canvas.toBlob(
                (blob) => {
                  if (blob === null) {
                    reject(new Error("Failed to create blob from canvas"));
                    return;
                  }
                  const reducedFile = new File([blob], file.name, {
                    type: "image/jpeg",
                    lastModified: Date.now(),
                  });
                  resolve(reducedFile);
                },
                "image/jpeg",
                quality
              );
            };
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        })
      );
    } else {
      promises.push(file);
    }
  }

  const reducedFiles = await Promise.all(promises);
  return reducedFiles;
};

export default reduceImageQuality;
