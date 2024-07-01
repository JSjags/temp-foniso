"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { dummyUsers, profileImageplaceholder } from "@/constants";
import UserSuggestionCard from "../reusable/UserSuggestionCard";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getExploreSuggestions } from "@/services/api/explore";
import axios from "axios";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import SportIcon from "../reusable/SportIcon";

type Props = {};

const MessageSearch = (props: Props) => {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [suggQuery] = useState("foniso");

  const debouncedSearchQuery = useDebounce(query ?? "", 500);
  const debouncedSuggQuery = useDebounce(suggQuery ?? "", 500);

  const exploreSuggestions = useQuery({
    queryKey: ["get-explore-suggestions", debouncedSearchQuery],
    queryFn: () =>
      getExploreSuggestions(
        debouncedSearchQuery,
        axios.CancelToken.source().token
      ),
    enabled: query !== "", // Only fetch suggestions when query is not empty
    refetchOnWindowFocus: false, // Disable automatic refetching on window focus
    refetchOnMount: false, // Disable automatic refetching on component mount
  });

  const messageSuggestions = useQuery({
    queryKey: ["get-sugg"],
    queryFn: () =>
      getExploreSuggestions(suggQuery, axios.CancelToken.source().token), // Only fetch suggestions when query is not empty
    refetchOnWindowFocus: false, // Disable automatic refetching on window focus
    refetchOnMount: false, // Disable automatic refetching on component mount
  });

  console.log(messageSuggestions.data?.data.data);

  return (
    <div className="mt-5 min-h-screen bg-background flex flex-col gap-y-2">
      <p className="text-foreground/50 px-4">
        Search for people by username to chat with them
      </p>
      <div className="mt-0 relative px-4">
        <div className="mt-0 relative">
          <Input
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 border border-border rounded-lg pl-10  bg-foreground/10 dark:bg-black"
          />
          <Search className="absolute top-2.5 left-2" />
        </div>
      </div>
      <Separator className="mt-4" />
      {!query ? (
        <div className="px-2 pt-2">
          <p className="font-bold text-lg">Suggestions</p>
          {messageSuggestions.isLoading && (
            <div className="w-full flex justify-center items-center">
              <PageLoadingSpinner spinnerExtraClass="w-6 h-6" />
            </div>
          )}
          <div className="mt-4 space-y-4">
            {Boolean(messageSuggestions.data?.data?.data?.items.length) &&
              messageSuggestions.data?.data.data.items
                .slice(0, 3)
                .map((suggestion: User, i: number) => (
                  <div
                    key={i}
                    className="flex gap-x-3 hover:bg-foreground/20 rounded-md p-2 cursor-pointer"
                    role="button"
                    onClick={() =>
                      router.push(
                        `?tab=conversation&cid=${suggestion.id}&name=${
                          suggestion.usermeta.firstname +
                          "+" +
                          suggestion.usermeta.lastname
                        }&avatar=${suggestion.usermeta.avatar}`
                      )
                    }
                  >
                    <Image
                      width={36}
                      height={36}
                      className="size-[36px] sm:size-[36px] rounded-full object-cover"
                      alt="avatar"
                      src={
                        suggestion?.usermeta?.avatar !== null
                          ? suggestion?.usermeta?.avatar
                          : profileImageplaceholder
                      }
                    />
                    <div>
                      <div className="flex gap-x-2 items-center">
                        <p className="text-foreground font-semibold text-sm line-clamp-1 text-ellipsis">
                          {suggestion?.usermeta.firstname}{" "}
                          {suggestion?.usermeta.lastname}
                        </p>
                        <div className="flex gap-x-1 items-center">
                          {suggestion?.verified && (
                            <Image
                              width={14}
                              height={14}
                              className="size-[16px] rounded-full object-cover"
                              alt="avatar"
                              src={"/assets/app-icons/verified-icon.svg"}
                            />
                          )}
                          <SportIcon
                            category={suggestion?.usermeta?.favorite_sport}
                          />
                        </div>
                      </div>
                      <p className="text-inactive text-xs">
                        @{suggestion?.username}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      ) : (
        <div className="mt-0 p-2">
          <div className="flex flex-col gap-y-3 top-16 left-0 w-full border-none rounded-lg z-20 shadow-lg border bg-background">
            {exploreSuggestions.isLoading && (
              <div className="w-full flex justify-center items-center">
                <PageLoadingSpinner spinnerExtraClass="w-6 h-6" />
              </div>
            )}
            <ScrollArea className="h-full w-full rounded-md border-none bg-transparent">
              {Boolean(exploreSuggestions.data?.data?.data?.items.length) &&
                exploreSuggestions.data?.data.data.items.map(
                  (suggestion: User, i: number) => (
                    <div
                      key={i}
                      className="flex gap-x-3 hover:bg-foreground/20 rounded-md p-2 cursor-pointer"
                      role="button"
                      onClick={() =>
                        router.push(
                          `?tab=conversation&cid=${suggestion.id}&name=${
                            suggestion.usermeta.firstname +
                            "+" +
                            suggestion.usermeta.lastname
                          }&username=${suggestion.username}&avatar=${
                            suggestion.usermeta.avatar
                          }`
                        )
                      }
                    >
                      <Image
                        width={36}
                        height={36}
                        className="size-[36px] sm:size-[36px] rounded-full object-cover"
                        alt="avatar"
                        src={
                          suggestion?.usermeta?.avatar !== null
                            ? suggestion?.usermeta?.avatar
                            : profileImageplaceholder
                        }
                      />
                      <div>
                        <div className="flex gap-x-2 items-center">
                          <p className="text-foreground font-semibold text-sm line-clamp-1 text-ellipsis">
                            {suggestion?.usermeta.firstname}{" "}
                            {suggestion?.usermeta.lastname}
                          </p>
                          <div className="flex gap-x-1 items-center">
                            {suggestion?.verified && (
                              <Image
                                width={14}
                                height={14}
                                className="size-[16px] rounded-full object-cover"
                                alt="avatar"
                                src={"/assets/app-icons/verified-icon.svg"}
                              />
                            )}
                            <SportIcon
                              category={suggestion?.usermeta?.favorite_sport}
                            />
                          </div>
                        </div>
                        <p className="text-inactive text-xs">
                          @{suggestion?.username}
                        </p>
                      </div>
                    </div>
                  )
                )}
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageSearch;
