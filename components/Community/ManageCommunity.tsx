"use client";

import HeaderWithBackBtn from "@/components/reusable/HeaderWithBackBtn";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PiUserCirclePlusLight } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import { PiGearLight } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { GiThorHammer } from "react-icons/gi";
import ManageCommunitySidebar from "./ManageCommunitySidebar";
import { FaArrowLeft } from "react-icons/fa6";
import MemberRequest from "./MemberRequest";
import CommunitySettings from "./CommunitySettings";
import NavList from "./NavList";
import CommunityMembers from "./CommunityMembers";
import ManageCommunityRules from "./ManageCommunityRules";
import HiddenPosts from "./HiddenPosts";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  communityMembers,
  communityMembersv2,
  communityModerators,
  getOneCommunity,
  singleCommunityPendingRequests,
  updateCommunity,
} from "@/services/api/community";

const item_list = [
  {
    icon: PiUserCirclePlusLight,
    count: 5,
    label: "Member requests",
    href: "member-request",
  },
  {
    icon: CiTrash,
    count: 5,
    label: "Hidden/Deleted post",
    href: "hidden-post",
  },
  { divider: true, label: "divider" },
  {
    icon: PiGearLight,
    count: 0,
    label: "Community settings",
    desc: "Edit community name,type and more",
    href: "community-settings",
  },
  {
    icon: HiOutlineUserGroup,
    count: 0,
    label: "Members",
    desc: `${24} members`,
    href: "members",
  },
  {
    icon: GiThorHammer,
    count: 0,
    label: "Rules",
    desc: "Add,delete,edit or reorder rules",
    href: "rules",
  },
];

const ManageCommunity = () => {
  const searchParams = useSearchParams();
  const { back } = useRouter();

  const { community_id } = useParams();

  const communityInfo = useQuery({
    queryKey: ["community-info"],
    queryFn: () => getOneCommunity(community_id as string),
  });

  const singleCommunityRequests = useQuery({
    queryKey: ["single-community"],
    queryFn: () =>
      singleCommunityPendingRequests(parseInt(community_id as string)),
  });

  const communityMembersList = useQuery({
    queryKey: ["community-members"],
    queryFn: () => communityMembersv2(community_id as string),
  });

  const communityModeratorsList = useQuery({
    queryKey: ["community-moderators"],
    queryFn: () => communityModerators(community_id as string),
  });

  console.log(communityMembersList);

  const generateCount = (href: string) => {
    if (href === "member-request") {
      return singleCommunityRequests.data?.data.data.length ?? 0;
    } else if (href === "hidden-post") {
      return singleCommunityRequests.data?.data.data.length ?? 0;
    } else {
      return 0;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1fr] lg:grid-cols-[0.7fr_1fr] gap-[8px] items-stretch">
      <div className="bg-background">
        <HeaderWithBackBtn title="Manage community" />

        <div className="mt-5 min-h-screen bg-background">
          <p className="text-[1.25rem] mb-3 font-bold px-4 duo:px-5">
            Up for review
          </p>

          {item_list.map(({ icon, count, desc, divider, href, label }) =>
            divider ? (
              <hr key={label} className="my-4" />
            ) : (
              <NavList
                key={label}
                icon={icon as unknown as keyof JSX.IntrinsicElements}
                label={label}
                href={href as string}
                count={generateCount(href ?? "")}
                desc={
                  href === "members"
                    ? `${communityMembersList.data?.data.data.items.length} members`
                    : desc
                }
              />
            )
          )}
        </div>
      </div>

      {Boolean(searchParams.get("tab")) && (
        <ManageCommunitySidebar className="border-l h-[100dvh] overflow-y-auto hide-scrollbar border-[#D9D9D9] dark:border-[#222522] px-5">
          <div className="flex items-center h-[66px] md:h-20 md:mt-3 gap-[28px] border-b border-border">
            <FaArrowLeft className="text-2xl md:hidden" onClick={back} />

            <p className="text-xl md:text-2xl font-bold">
              {searchParams
                .get("tab")
                ?.replace(/-/g, " ")
                ?.replace(/\b\w/, (c) => c.toUpperCase())}
            </p>
          </div>
          {searchParams.get("tab") === "member-request" && (
            <MemberRequest
              requests={singleCommunityRequests.data?.data.data ?? []}
            />
          )}
          {searchParams.get("tab")?.includes("community-settings") &&
            communityInfo.isSuccess && (
              <CommunitySettings community={communityInfo.data?.data.data} />
            )}
          {searchParams.get("tab") === "members" && (
            <CommunityMembers
              members={communityMembersList.data?.data.data.items ?? []}
              moderators={communityModeratorsList.data?.data.data.items ?? []}
            />
          )}
          {searchParams.get("tab") === "rules" && <ManageCommunityRules />}
          {searchParams.get("tab") === "hidden-post" && <HiddenPosts />}
        </ManageCommunitySidebar>
      )}
    </div>
  );
};

export default ManageCommunity;
