"use client";

import FollowUnfollowTile from "@/components/reusable/FollowUnfollowTile";
import SportIcon from "@/components/reusable/SportIcon";
import SubTabs from "@/components/reusable/SubTabs";
import RightSideBar from "@/components/RightSideBar";
import {
  SearchCommunities,
  SearchPeople,
  SearchPost,
} from "@/components/sub-pages/explore";
import { Button } from "@/components/ui/button";
import { profileStatsTab } from "@/constants";
import { useUserContext } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { followUserQuery } from "@/services/api/explore";
import { getFollowers, getFollowing } from "@/services/api/userService";
import { User, UserData } from "@/types";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { list } from "postcss";
import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";

type Props = {};
type FollowersProps = {
  isLoading: boolean;
  list: { user: User }[];
};
type FollowingProps = {
  isLoading: boolean;
  list: { follower: User }[];
};
type VerifiedProps = {
  isLoading: boolean;
  list: User[];
};

const FollowersList = (props: FollowersProps) => {
  const router = useRouter();
  return (
    <div>
      {props.isLoading && (
        <div className="mt-10 flex justify-center">
          {/* <PageLoadingSpinner /> */}
          <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
        </div>
      )}
      {Boolean(!props.isLoading && props.list && Boolean(props.list.length)) &&
        props.list.map((user: { user: User }, i: number) => (
          <FollowUnfollowTile key={i} user={user.user} />
        ))}
      {Boolean(!props.isLoading) && Boolean(!props.list.length) && (
        <div className="flex justify-center items-center">
          <div className="my-10 px-6">
            <p className="font-bold text-foreground text-center">
              No followers
            </p>
            <p className="text-foreground/50 mt-2 text-sm text-center">
              It&apos;s empty in here. No one's following you.
            </p>
            <div className="flex justify-center items-center">
              <Button
                onClick={() => router.push("/explore")}
                className="h-12 mt-5 px-5 pl-5 bg-gradient-to-br w-fit from-[#0B953B] to-[#0F4E25] hover:bg-colorPrimary hover:brightness-90 rounded-full flex gap-2 items-center justify-start"
              >
                <SearchIcon color="white" size={25} className="size-[25px]" />
                <span className={cn("text-white text-lg font-semibold")}>
                  Explore
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const FollowingList = (props: FollowingProps) => {
  const router = useRouter();
  return (
    <div className="">
      {props.isLoading && (
        <div className="mt-10 flex justify-center">
          {/* <PageLoadingSpinner /> */}
          <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
        </div>
      )}
      {Boolean(!props.isLoading && props.list && Boolean(props.list.length)) &&
        props.list.map((user: { follower: User }, i: number) => (
          <FollowUnfollowTile key={i} user={user?.follower} />
        ))}
      {Boolean(!props.isLoading) && Boolean(!props.list.length) && (
        <div className="flex justify-center items-center">
          <div className="my-10 px-6">
            <p className="font-bold text-foreground text-center">
              No following
            </p>
            <p className="text-foreground/50 mt-2 text-sm text-center">
              It&apos;s empty in here. Try following someone.
            </p>
            <div className="flex justify-center items-center">
              <Button
                onClick={() => router.push("/explore")}
                className="h-12 mt-5 px-5 pl-5 bg-gradient-to-br w-fit from-[#0B953B] to-[#0F4E25] hover:bg-colorPrimary hover:brightness-90 rounded-full flex gap-2 items-center justify-start"
              >
                <SearchIcon color="white" size={25} className="size-[25px]" />
                <span className={cn("text-white text-lg font-semibold")}>
                  Explore
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const VerifiedList = (props: VerifiedProps) => {
  const router = useRouter();
  return (
    <div>
      {props.isLoading && (
        <div className="mt-10 flex justify-center">
          {/* <PageLoadingSpinner /> */}
          <ImSpinner2 className="size-10 animate-spin text-[#4ED17E]" />
        </div>
      )}
      {Boolean(
        !props.isLoading &&
          props.list &&
          Boolean(
            props.list.filter((user: any) => user.user.verified === true).length
          )
      ) &&
        props.list
          .filter((user: any) => user.user.verified === true)
          .map((user: any, i: number) => (
            <FollowUnfollowTile key={i} user={user.user} />
          ))}
      {Boolean(!props.isLoading) &&
        Boolean(
          !props.list.filter((user: any) => user.user.verified === true).length
        ) && (
          <div className="flex justify-center items-center">
            <div className="my-10 px-6">
              <p className="font-bold text-foreground text-center">
                No followers
              </p>
              <p className="text-foreground/50 mt-2 text-sm text-center">
                It&apos;s empty in here. No one's following you.
              </p>
              <div className="flex justify-center items-center">
                <Button
                  onClick={() => router.push("/explore")}
                  className="h-12 mt-5 px-5 pl-5 bg-gradient-to-br w-fit from-[#0B953B] to-[#0F4E25] hover:bg-colorPrimary hover:brightness-90 rounded-full flex gap-2 items-center justify-start"
                >
                  <SearchIcon color="white" size={25} className="size-[25px]" />
                  <span className={cn("text-white text-lg font-semibold")}>
                    Explore
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

const Page = (props: Props) => {
  const router = useRouter();
  const { userData } = useUserContext();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  const followers = useQuery({
    queryKey: ["followers"],
    queryFn: getFollowers,
  });

  const following = useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
  });

  const handleCurrentView = () => {
    switch (tab) {
      case "followers":
        return (
          <FollowersList
            isLoading={followers.isLoading}
            list={followers.data?.data.data}
          />
        );
      case "following":
        return (
          <FollowingList
            isLoading={following.isLoading}
            list={following.data?.data.data}
          />
        );
      case "verified-followers":
        return (
          <VerifiedList
            isLoading={followers.isLoading}
            list={followers.data?.data.data}
          />
        );
      default:
        return (
          <FollowersList
            isLoading={followers.isLoading}
            list={followers.data?.data.data}
          />
        );
    }
  };
  return (
    <div className="flex gap-0 min-[480px]:gap-2">
      <div className="relative mt-2 min-[480px]:mt-0 flex-1 bg-background min-h-screen">
        <div className="flex gap-x-4 items-center p-4">
          <Button
            onClick={() => router.back()}
            className="size-8 p-1 flex justify-center items-center bg-black/50 hover:bg-foreground/10 rounded-full"
          >
            <IoArrowBack className="text-foreground size-6" />
          </Button>
          <div className="">
            <div className="flex gap-x-2 items-center">
              <p className="text-foreground hover:underline cursor-pointer font-bold line-clamp-1 text-ellipsis text-xl">
                {userData?.user?.usermeta.firstname}{" "}
                {userData?.user?.usermeta.lastname}
              </p>
              <div className="flex gap-x-1 items-center">
                {/* {userData?.user.verified && (
                  <Image
                    width={14}
                    height={14}
                    className="size-[16px] rounded-full object-cover"
                    alt="avatar"
                    src={"/assets/app-icons/verified-icon.svg"}
                  />
                )} */}
                <SportIcon
                  category={userData?.user?.usermeta?.favorite_sport!}
                  size={20}
                />
              </div>
            </div>
            <p className="text-inactive">@{userData?.user?.username}</p>
          </div>
        </div>
        <div className="">
          <SubTabs tabs={profileStatsTab} showBorder />
          {handleCurrentView()}
        </div>
      </div>
      <RightSideBar
        className={
          "min-w-[200px] w-[40%] max-w-[480px] gap-0 min-[480px]:gap-2"
        }
      />
    </div>
  );
};

export default Page;
