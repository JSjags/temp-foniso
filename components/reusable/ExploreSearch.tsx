"use client";

import { SearchIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getExploreSuggestions } from "@/services/api/explore";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import Image from "next/image";
import { User } from "@/types";
import { profileImageplaceholder } from "@/constants";
import SportIcon from "./SportIcon";
import { ScrollArea } from "../ui/scroll-area";
import { useClickOutside } from "@/hooks/useClickOutside";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  inputStyle?: string;
};

const ExploreSearch = ({ inputStyle }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(
    searchParams.get("search") !== null ? searchParams.get("search") : ""
  );
  const [showQuerySearchResults, setShowQuerySearchResults] = useState(false);

  const debouncedSearchQuery = useDebounce(query ?? "", 500);

  useClickOutside(ref, showQuerySearchResults, setShowQuerySearchResults);

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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Call your function here
      handleEnterKeyPress();
    }
  };

  const handleEnterKeyPress = () => {
    // Your function logic here
    if (pathname.includes("explore")) {
      setShowQuerySearchResults(false);
      router.push(`?search=${debouncedSearchQuery}&tab=posts`);
    } else {
      setShowQuerySearchResults(false);
      router.push(`/explore?search=${debouncedSearchQuery}&tab=posts`);
    }
  };

  useEffect(() => {
    setShowQuerySearchResults(
      exploreSuggestions.isLoading ||
        Boolean(exploreSuggestions.data?.data?.data?.items.length)
    );
  }, [
    exploreSuggestions.isLoading,
    exploreSuggestions.data?.data?.data?.items,
  ]);

  //   hide search results on load
  useEffect(() => {
    if (
      searchParams.get("search") !== null &&
      inputRef.current !== document.activeElement
    ) {
      setShowQuerySearchResults(false);
    }
  }, [searchParams]);

  return (
    <div className="relative">
      <SearchIcon
        size={18}
        color="#888888"
        className="absolute left-4 top-[15px] sm:top-[18px]"
      />
      <Input
        id="search"
        ref={inputRef}
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        value={query ?? ""}
        className={cn(
          "bg-foreground/10 mt-2 pl-10 text-white border-border h-[48px] sm:h-[54px] text-base placeholder:text-foreground/50 rounded-xl",
          inputStyle
        )}
      />
      {/* results container */}

      {showQuerySearchResults &&
        inputRef.current === document.activeElement && (
          <div
            ref={ref}
            className="absolute flex flex-col gap-y-3 top-16 left-0 w-full p-1 border-border rounded-lg z-20 shadow-lg border bg-background"
          >
            {exploreSuggestions.isLoading && (
              <div className="w-full flex justify-center items-center">
                <PageLoadingSpinner spinnerExtraClass="w-6 h-6" />
              </div>
            )}
            <ScrollArea className="h-72 w-full rounded-md border-none bg-transparent">
              {Boolean(exploreSuggestions.data?.data?.data?.items.length) &&
                exploreSuggestions.data?.data.data.items.map(
                  (suggestion: User, i: number) => (
                    <div
                      key={i}
                      className="flex gap-x-3 hover:bg-foreground/20 rounded-md p-2 cursor-pointer"
                      role="button"
                      onClick={() => {
                        if (pathname.includes("explore")) {
                          setShowQuerySearchResults(false);
                          router.push(
                            `?search=${debouncedSearchQuery}&tab=people`
                          );
                        } else {
                          setShowQuerySearchResults(false);
                          router.push(
                            `/explore?search=${debouncedSearchQuery}&tab=people`
                          );
                        }
                      }}
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
        )}
    </div>
  );
};

export default ExploreSearch;
