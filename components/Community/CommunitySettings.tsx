"use client";

import Image from "next/image";
import NavList from "./NavList";
import { CiGlobe } from "react-icons/ci";
import { CommunityContext, CreateCommunityForm } from "@/types/community";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import MobileDesktopOverlay from "../Modal/MobileDesktopOverlay";
import CreateCommunity from "./CreateCommunity";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommunity } from "@/services/api/community";
import toast from "react-hot-toast";
import SuccessToast from "../reusable/toasts/SuccessToast";
import { all } from "axios";
import ErrorToast from "../reusable/toasts/ErrorToast";

const tab_params = [
  "community-settings-name",
  "community-settings-desc",
  "community-settings-type",
];

const CommunitySettings = ({ community }: { community: CommunityContext }) => {
  const queryClient = useQueryClient();
  const { community_id } = useParams();
  const settings_list = [
    {
      count: 0,
      label: "Community name",
      href: tab_params[0],
      desc: community?.name,
    },
    {
      count: 0,
      label: "Description",
      href: tab_params[1],
      desc: community.description,
    },
    {
      count: 0,
      label: "Community type",
      href: tab_params[2],
      desc: (
        <span className="flex gap-[2px] items-center capitalize">
          <CiGlobe />
          {community.type}
        </span>
      ),
    },
  ];
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

  const updateCommunityAction = useMutation({
    mutationKey: ["community-moderators"],
    mutationFn: (data: FormData) =>
      updateCommunity(community_id as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-info"] });
      toast.custom((t) => (
        <SuccessToast t={t} message="Community details updated successfully" />
      ));
      handleGoBack();
    },
    onError: () => {
      toast.custom((t) => (
        <ErrorToast t={t} message="Couldn't update community at the moment" />
      ));
    },
  });

  const handleGoBack = () => {
    push(`${pathname}?tab=community-settings`);
  };

  const onSubmit = (arg: CreateCommunityForm) => {
    console.log(arg, "from main component");
    const formData = new FormData();

    formData.append("name", arg.name);
    formData.append("description", arg.description);
    formData.append("type", arg.type);

    if (image.file) {
      formData.append("coverImage", image.file);
    }

    updateCommunityAction.mutate(formData);
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
            community.coverImage ||
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
          community={community}
          defaultValues={{
            name: community?.name,
            description: community?.description,
            type: community?.type?.toLowerCase(),
          }}
          btnText="Save changes"
        />
      </MobileDesktopOverlay>
    </div>
  );
};

export default CommunitySettings;
