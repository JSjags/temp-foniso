"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
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
    <div className="w-full bg-bgEffect h-dvh bg-background center-item">
      <div className="px-2 flex flex-col gap-y-6 justify-center items-center">
        <div className="flex justify-center items-center">
          <Image
            alt="logo"
            src={logoPath}
            className="w-[231px]"
            width={231}
            height={46}
          />
        </div>
        <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
      </div>
    </div>
  );
};

export default Loading;
