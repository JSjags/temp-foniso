import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import ErrorToast from "../reusable/toasts/ErrorToast";
import toast from "react-hot-toast";

interface FileDropBoxProps {
  onFilesSelected: (files: File[]) => void;
  maxSizeInMB?: number;
}

const FileDropBox: React.FC<FileDropBoxProps> = ({
  onFilesSelected,
  maxSizeInMB = 5,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const validExtensions = ["application/pdf", "image/jpeg", "image/png"];
    const validFiles = files.filter(
      (file) =>
        file.size <= maxSizeInBytes && validExtensions.includes(file.type)
    );

    if (validFiles.length !== files.length) {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          message={`Some files exceed the ${maxSizeInMB}MB size limit or have unsupported formats (only PDF, JPG, and PNG are allowed) and were not added.`}
        />
      ));
    } else {
      setErrorMessage("");
    }

    setSelectedFiles(validFiles);
    onFilesSelected(validFiles);
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed border-colorPrimary/20 p-5 text-center cursor-pointer rounded-lg",
        dragOver
          ? "bg-colorPrimary/50 border-colorPrimary/50"
          : "bg-colorPrimary/20 border-colorPrimary/20"
      )}
      onClick={handleBrowseFiles}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".pdf, .jpg, .jpeg, .png"
      />
      <Image
        src="/assets/app-icons/select-file.svg"
        alt="file picker"
        width={30}
        height={32.31}
        className="block mx-auto"
      />
      <p className="text-sm text-foreground/50 mt-4">
        Supported file formats: JPG, PNG.
      </p>
      <p className="text-sm text-foreground/50">PDF Maximum file size: 5MB</p>
      <p className="mt-6 text-colorPrimary underline font-medium brightness-150">
        Browse files
      </p>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {selectedFiles.length > 0 && (
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index} className="text-foreground/80">
              {file.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileDropBox;
