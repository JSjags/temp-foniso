import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "../ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getExploreSuggestions } from "@/services/api/explore";
import axios from "axios";
import PageLoadingSpinner from "../Spinner/PageLoadingSpinner";
import { ScrollArea } from "../ui/scroll-area";
import { User } from "@/types";
import Image from "next/image";
import { profileImageplaceholder } from "@/constants";
import SportIcon from "../reusable/SportIcon";
import { useRouter } from "next/navigation";

type Props = {
  setShowExplore: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchUsers = ({ setShowExplore }: Props) => {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const debouncedSearchQuery = useDebounce(query ?? "", 500);

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

  return (
    <div className="px-2">
      <div className="flex gap-x-2 items-center">
        <Button
          onClick={() => setShowExplore(false)}
          className="p-0 size-8 rounded-full bg-transparent hover:bg-foreground/20 !text-foreground"
        >
          <ArrowLeft />
        </Button>
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2 text-foreground/50" />
          <Input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="w-full bg-foreground/20 dark:bg-black border border-border pl-10 placeholder:text-foreground/40"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="mt-4">
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
    </div>
  );
};

export default SearchUsers;
