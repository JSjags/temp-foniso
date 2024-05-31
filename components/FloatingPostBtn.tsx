"use client";

import { EditIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useUserContext } from "@/context/UserContext";

const FloatingPostBtn = () => {
  const { setShowCreatePost } = useUserContext();
  return (
    <Button
      onClick={() => setShowCreatePost(true)}
      className="fixed z-50 min-[480px]:hidden right-4 shadow-xl bottom-[72px] p-0 size-12 bg-gradient-to-br from-[#0B953B] to-[#0F4E25] hover:bg-colorPrimary hover:brightness-90 rounded-full flex items-center justify-center"
    >
      <EditIcon color="white" size={25} className="size-[26px]" />
    </Button>
  );
};

export default FloatingPostBtn;
