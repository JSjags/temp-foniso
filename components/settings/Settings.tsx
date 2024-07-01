"use client";

import HeaderWithBackBtn from "@/components/reusable/HeaderWithBackBtn";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PiStackSimpleBold, PiUserCirclePlusLight } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import { PiGearLight } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { GiThorHammer } from "react-icons/gi";
// import ManageCommunitySidebar from "./ManageCommunitySidebar";
// import { FaArrowLeft } from "react-icons/fa6";
// import MemberRequest from "./MemberRequest";
// import CommunitySettings from "./CommunitySettings";
// import NavList from "./NavList";
// import CommunityMembers from "./CommunityMembers";
// import ManageCommunityRules from "./ManageCommunityRules";
// import HiddenPosts from "./HiddenPosts";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  communityMembers,
  communityMembersv2,
  communityModerators,
  getOneCommunity,
  singleCommunityPendingRequests,
  updateCommunity,
} from "@/services/api/community";
import NavList from "./NavList";
import SettingsSidebar from "./SettingsSidebar";
import { FaArrowLeft } from "react-icons/fa6";
import Notifications from "./sub-pages/Notifications";
import AdditionalInformation from "./sub-pages/AdditionalInformation";
import Privacy from "./sub-pages/Privacy";
import Display from "./sub-pages/Display";
import YourAccount from "./sub-pages/YourAccount";
import { CircleHelp, Lock, LogOut, SquareUserRound } from "lucide-react";
import { IoNotificationsOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/context/UserContext";
import Support from "./sub-pages/Support";
import DirectMessages from "./sub-pages/DirectMessages";
import BlockedAccounts from "./sub-pages/BlockedAccounts";

const item_list = [
  {
    icon: SquareUserRound,
    count: 5,
    label: "Your account",
    desc: "Manage your account information, change your password, enable 2FA authentication",
    href: "your-account",
  },
  {
    icon: Lock,
    count: 5,
    label: "Privacy",
    desc: "Manage accounts you’ve blocked and who can message you directly",
    href: "privacy",
  },
  { divider: true, label: "divider" },
  {
    icon: IoNotificationsOutline,
    count: 0,
    label: "Notification",
    desc: `Customize which notifications you receive and how you receive them.`,
    href: "notification",
  },
  {
    icon: PiStackSimpleBold,
    count: 0,
    label: "Display and Language",
    desc: "Manage how content are displayed to you",
    href: "display-and-language",
  },
  {
    icon: CircleHelp,
    count: 0,
    label: "Additional Information",
    desc: "Support, About Foniso, Privacy policy and Terms of use",
    href: "additional-information",
  },
];

const SettingsPage = () => {
  const searchParams = useSearchParams();
  const { back } = useRouter();

  const { logoutUser } = useUserContext();

  const handleLogout = () => {
    logoutUser();
    // router.push("/login", { scroll: true });
    window.location.assign("/login");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1fr] lg:grid-cols-[0.7fr_1fr] gap-[8px] items-stretch">
      {/* <div className="bg-background">
        <HeaderWithBackBtn title="Settings" />

        <div className="mt-0 min-h-screen bg-background">
          {item_list.map(({ icon, desc, divider, href, label }) =>
            divider ? (
              <hr key={label} className="my-4 hidden" />
            ) : (
              <NavList
                key={label}
                icon={icon as unknown as keyof JSX.IntrinsicElements}
                label={label}
                href={href as string}
                desc={desc}
              />
            )
          )}
          <div
            role="button"
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-4 duo:gap-5 py-5 px-4 duo:px-5 text-red-500"
            )}
          >
            <LogOut />
            <p className="font-medium">Log out</p>
          </div>
        </div>
      </div>

      {Boolean(searchParams.get("tab")) && (
        <SettingsSidebar className="border-l h-[100dvh] overflow-y-auto hide-scrollbar border-[#D9D9D9] dark:border-[#222522] px-5">
          <div className="flex items-center h-[66px] md:h-20 md:mt-3 gap-[28px]">
            <FaArrowLeft className="text-2xl md:hidden" onClick={back} />

            <p className="text-xl md:text-2xl font-bold text-center flex-1">
              {searchParams
                .get("tab")
                ?.replace(/-/g, " ")
                ?.replace(/\b\w/, (c) => c.toUpperCase())}
            </p>
          </div>
          {searchParams.get("tab") === "your-account" && <YourAccount />}
          {searchParams.get("tab") === "notification" && <Notifications />}
          {searchParams.get("tab") === "additional-information" && (
            <AdditionalInformation />
          )}
          {searchParams.get("tab") === "privacy" && <Privacy />}
          {searchParams.get("tab") === "display-and-language" && <Display />}

          
          {searchParams.get("tab") === "support" && <Support />}
          {searchParams.get("tab") === "direct-messages" && <DirectMessages />}
          {searchParams.get("tab") === "blocked-accounts" && (
            <BlockedAccounts />
          )}
        </SettingsSidebar>
      )} */}
      <div>Settings</div>
    </div>
  );
};

export default SettingsPage;
