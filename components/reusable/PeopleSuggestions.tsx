import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { profileImageplaceholder, suggestedUsers } from "@/constants";
import Image from "next/image";
import axiosInstance from "@/services/api/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { peopleSuggestions } from "@/services/api/explore";
import { User } from "@/types";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import UserSuggestionCard from "./UserSuggestionCard";

type Props = {};

const PeopleSuggestions = (props: Props) => {
  const [people, setPeople] = useState<any[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState<boolean>(false);

  const fetchSuggestions = useQuery({
    queryKey: ["suggested-follows"],
    queryFn: peopleSuggestions,
  });

  return (
    <div className="text-white py-5 pb-6 pt-2 relative font-bold border-b border-border mt-7">
      <p className="px-6 text-xl text-foreground">People you may like</p>
      <div className="p-6 flex flex-col gap-y-6">
        {(fetchSuggestions.isLoading || fetchSuggestions.isPending) && (
          <div className="mt-10 flex justify-center">
            <PageLoadingSpinner spinnerExtraClass="w-7 h-7" />
          </div>
        )}
        {Boolean(
          fetchSuggestions.data?.data.data &&
            fetchSuggestions.data?.data.data.length
        ) &&
          fetchSuggestions.data.data.data
            .slice(0, 5)
            .map((user: User, i: number) => (
              <UserSuggestionCard user={user} key={i} />
            ))}
      </div>
      <div className="px-6">
        <Button
          variant={"link"}
          className="text-colorPrimary mt-3 p-0 text-base"
        >
          Show more
        </Button>
      </div>
    </div>
  );
};

export default PeopleSuggestions;
