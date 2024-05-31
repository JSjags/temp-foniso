"use client";

import { useUserContext } from "@/context/UserContext";
import { getUserProfileData } from "@/services/api/userService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {};

const VerifyUserProfileByInterval = (props: Props) => {
  const { updateUserData } = useUserContext();

  const userProfileData = useQuery({
    queryKey: ["get-user-profile-data"],
    queryFn: getUserProfileData,
    refetchInterval: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (userProfileData.data?.data?.data?.user) {
      updateUserData(userProfileData.data?.data.data.user);
    }
  }, [userProfileData.dataUpdatedAt]);

  return null;
};

export default VerifyUserProfileByInterval;
