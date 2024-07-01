"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  position: "top" | "bottom";
};

const PublicActions = ({ position }: Props) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [logoPath, setLogoPath] = useState("/assets/logo-dark.svg");

  useEffect(() => {
    setLogoPath(
      theme === "light" || theme === "undefined"
        ? "/assets/logo-dark.svg"
        : "/assets/logo.svg"
    );
  }, [theme]);
  return (
    <div
      className={cn(
        "fixed left-0 w-screen z-50 h-20 bg-transparent backdrop-blur-md flex justify-center",
        position === "bottom" ? " bottom-0" : "top-0"
      )}
    >
      <div className="max-w-[1231px] flex justify-between items-center w-full">
        <div className="h-60% flex flex-col gap-y-1">
          <div>
            <Image
              alt="logo"
              src={logoPath}
              className="w-full max-w-[140px]"
              width={140}
              height={46}
            />
          </div>
          <p className="text-foreground/80">
            Where the conversation never stops
          </p>
        </div>
        <div className="flex-1 flex justify-end gap-x-6">
          <Button
            onClick={() => router.push("/signup")}
            className="rounded-full text-white bg-background border border-white h-9 hover:bg-white/10"
          >
            Sign up
          </Button>
          <Button
            onClick={() => router.push("/login")}
            className="rounded-full h-9"
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublicActions;
