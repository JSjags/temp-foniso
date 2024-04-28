"use client";

import MainFooter from "@/components/MainFooter";
import { PersonalDetails } from "@/components/sub-pages/registration";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
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
    <div className="bg-bgEffect min-h-screen p-2">
      <div className="max-w-[1812px] flex flex-col min-h-screen">
        <div className="mt-20">
          <div className="max-w-[188px] flex justify-center items-center sm:px-10">
            <Image
              alt="logo"
              src={logoPath}
              className="w-full max-w-[231px] -translate-y-[120%]"
              width={165.65}
              height={23}
            />
          </div>
          <div className="w-full flex flex-col items-center mt-10">
            <h1 className="text-[1.5rem] md:text-[2.5rem] md:leading-[3rem] font-bold text-foreground">
              Your All-in-One Sports Platform
            </h1>
            <PersonalDetails />
          </div>
        </div>
        <MainFooter />
      </div>
    </div>
  );
};

export default Page;
