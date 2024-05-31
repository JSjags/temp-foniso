"use client";
import { useState } from "react";
import CreatePostCore from "../post/CreatePostCore";
import { useUserContext } from "@/context/UserContext";

type Props = {};

const CreatePost = (_: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  return (
    <div className="border-b border-border hidden min-[480px]:block">
      <CreatePostCore
        id="default"
        wrapperClassName={"mt-2 pb-0"}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
    </div>
  );
};

export default CreatePost;
