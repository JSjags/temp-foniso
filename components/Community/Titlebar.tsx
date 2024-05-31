"use client";

import { titleBarItems, userPlaceholderImage } from "@/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import MobileDesktopOverlay from "../Modal/MobileDesktopOverlay";
import { CreateCommunityForm } from "@/types/community";
import CreateCommunity from "./CreateCommunity";
import useCustomMutation from "@/hooks/useCustomMutation";

const Titlebar = ({ title }: { title: string }) => {
  const { theme } = useTheme();
  const { push, back, replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openModal = () => {
    push(`${pathname}?create=new`);
  };

  const { mutateAsync, isPending } = useCustomMutation<
    CreateCommunityForm,
    { id: number }
  >("/community", "POST");

  const onSubmit = (arg: CreateCommunityForm) => {
    mutateAsync(arg).then(({ id }) => {
      replace(`/community/${id}/grow-community`);
    });
  };

  const icons = [
    {
      icon: "/assets/app-icons/explore-inactive.svg",
      onClick: () => {
        push("/community/search");
      },
    },
    {
      icon: "/assets/outline/add-users.svg",
      onClick: openModal,
    },
  ];

  return (
    <div className="flex items-center justify-between px-4 h-12 duo:h-20 sticky top-0 z-50 bg-background border-b border-border">
      <Link
        href={titleBarItems[0].path}
        className="flex flex-col gap-y-2 items-center max-h-12 justify-between min-[480px]:hidden"
      >
        <Image
          width={36}
          height={36}
          className="size-[36px] rounded-full object-cover"
          alt="user head shot"
          src={userPlaceholderImage}
        />
      </Link>

      <div className="flex-1">
        <p className="text-xl duo:text-2xl font-bold duo:text-left text-center">
          {title}
        </p>
      </div>
      <div className="flex items-center justify-end gap-x-4">
        {icons.map((item, i) => (
          <Image
            key={i}
            width={24}
            height={24}
            className={cn(
              "size-[24px] cursor-pointer",
              theme === "light" ? "invert" : ""
            )}
            alt="icon"
            src={item.icon}
            onClick={item.onClick}
          />
        ))}
      </div>

      <MobileDesktopOverlay
        title=" Create new community"
        open={searchParams.get("create") === "new"}
        handleClose={() => back()}
      >
        <CreateCommunity onSubmit={onSubmit} isLoading={isPending} />
      </MobileDesktopOverlay>
    </div>
  );
};

export default Titlebar;
