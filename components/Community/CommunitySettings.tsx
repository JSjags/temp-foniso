"use client";

import Image from "next/image";
import NavList from "./NavList";
import { CiGlobe } from "react-icons/ci";
import { CreateCommunityForm } from "@/types/community";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MobileDesktopOverlay from "../Modal/MobileDesktopOverlay";
import CreateCommunity from "./CreateCommunity";
import { useState } from "react";

const tab_params = [
  "community-settings-name",
  "community-settings-desc",
  "community-settings-type",
];

const settings_list = [
  {
    count: 0,
    label: "Community name",
    href: tab_params[0],
    desc: "Manchester united",
  },
  {
    count: 0,
    label: "Description",
    href: tab_params[1],
    desc: "Welcome to the Red Devils' Haven! Join our...",
  },
  {
    count: 0,
    label: "Community type",
    href: tab_params[2],
    desc: (
      <span className="flex gap-[2px] items-center">
        <CiGlobe />
        Public
      </span>
    ),
  },
];

const CommunitySettings = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const [image, setImage] = useState<{
    file: File | undefined;
    preview: string;
  }>({
    file: undefined,
    preview: "",
  });

  const handleGoBack = () => {
    push(`${pathname}?tab=community-settings`);
  };

  const onSubmit = (arg: CreateCommunityForm) => {
    console.log(arg, "from main component");
    handleGoBack();
  };

  const handleUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.style.opacity = "0";
    input.style.visibility = "hidden";
    input.style.width = "0";
    input.style.height = "0";
    input.addEventListener("change", (event: Event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      console.log({ file });
      if (file) {
        setImage({ file, preview: URL.createObjectURL(file) });
      }
      document.body.removeChild(input);
    });
    document.body.appendChild(input);
    input.click();
  };

  return (
    <div>
      <div className="h-[140px] md:h-[231px] center-item relative overflow-hidden">
        <Image
          src={
            image.preview ||
            "https://source.unsplash.com/random/1050x730/?white"
          }
          alt="background"
          fill
          className="object-cover object-center"
        />

        <div
          className="size-[60px] cursor-pointer rounded-full absolute bg-[#222623CC] center-item"
          onClick={handleUpload}
        >
          <div className="size-10 relative">
            <Image src="/assets/filled/camera-plus.svg" alt="camera" fill />
          </div>
        </div>
      </div>

      <div className="mt-5">
        {settings_list.map(({ count, desc, href, label }) => (
          <NavList
            key={label}
            label={label}
            href={href as string}
            count={count}
            desc={desc}
          />
        ))}
      </div>

      <MobileDesktopOverlay
        title="Edit Settings"
        open={Boolean(tab_params.includes(searchParams.get("tab") as string))}
        handleClose={handleGoBack}
      >
        <CreateCommunity
          onSubmit={onSubmit}
          defaultValues={{
            community_name: "Manchester United",
            description: "The red devils",
            community_type: "public",
          }}
          btnText="Save changes"
        />
      </MobileDesktopOverlay>
    </div>
  );
};

export default CommunitySettings;
