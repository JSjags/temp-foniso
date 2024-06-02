"use client";

import useDebounce from "@/hooks/useDebounce";
import axiosInstance from "@/services/api/axiosInstance";
import { User } from "@/types";
import axios from "axios";
import {
  MutableRefObject,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react";
import {
  MentionsInput,
  Mention,
  MentionItem,
  SuggestionDataItem,
  MentionsInputComponent,
} from "react-mentions";
import SportIcon from "./SportIcon";
import Image from "next/image";
import { profileImageplaceholder } from "@/constants";
import { ScrollArea } from "../ui/scroll-area";
import { Container } from "../ui/container";
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu";
import CustomRenderer from "./CustomRenderer";

type Props = {
  value: string;
  height?: number;
  paddingTop?: number;
  placeholder: string;
  commentType?: string;
  readOnly?: boolean;
  fontSize?: number;
  inputRef?: RefObject<HTMLInputElement>;
  handleChange: (
    e: { target: { value: string } },
    newValue: string,
    newPlainTextValue: string,
    mentions: MentionItem[]
  ) => {};
};

type ExtraData = {
  name: string;
  avatar: string | null;
  verified: boolean;
  favorite_sport: string;
};

const requestTag = () => {
  return [
    {
      id: "jesse",
      display: "#Jesse",
    },
    {
      id: "taiwo",
      display: "#Taiwo",
    },
    {
      id: "sunday",
      display: "#Sunday",
    },
    {
      id: "david",
      display: "#David",
    },
  ];
};

const MessageBox = ({
  value,
  handleChange,
  placeholder,
  height,
  fontSize,
  commentType,
  paddingTop,
  readOnly = false,
  inputRef,
}: Props) => {
  const [query, setQuery] = useState("");
  const [isFetchingUsernameMention, setIsFetchingUsernameMention] =
    useState(false);

  const debouncedSearchQuery = useDebounce(query ?? "", 500);

  const defaultStyle = {
    control: {
      backgroundColor: "transparent",
      fontSize: fontSize ?? 16,
      fontWeight: "normal",
    },

    "&multiLine": {
      control: {
        fontFamily: "inherit",
        minHeight: height ?? 24,
      },
      highlighter: {
        padding: 9,
        border: "1px solid transparent",
        color: "#188C43",
        position: "relative",
        zIndex: 10,
        pointerEvents: "none",
      },
      input: {
        padding: 9,
        paddingTop: paddingTop ?? 0,
        fontSize: fontSize ?? 16,
        border: "1px solid transparent",
        minHeight: height ?? 24,
      },
    },

    "&singleLine": {
      display: "inline-block",
      width: 180,

      highlighter: {
        padding: 1,
        border: "1px inset transparent",
        color: "#188C43",
      },
      input: {
        padding: 1,
        border: "1px inset",
      },
    },

    suggestions: {
      zIndex: 100,
      backgroundColor: "hsl(var(--background))",
      borderRadius: 8,
      list: {
        backgroundColor: "hsl(var(--background))",
        fontSize: 14,
        borderRadius: 8,
      },
      item: {
        padding: "5px 15px",
        borderBottom: "1px solid hsl(var(--border))",
        "&focused": {
          backgroundColor: "#188C4330",
        },
      },
    },
  };

  useEffect(() => {}, [commentType]);

  // const searchUsername = useQuery({
  //   queryKey: ["search-username", debouncedSearchQuery],
  //   queryFn: () =>
  //     getExploreSuggestions(
  //       debouncedSearchQuery,
  //       axios.CancelToken.source().token
  //     ),
  //   enabled: query !== "", // Only fetch suggestions when query is not empty
  //   refetchOnWindowFocus: false, // Disable automatic refetching on window focus
  //   refetchOnMount: false, // Disable automatic refetching on component mount
  // });

  // searchUsername.data?.data.data.items.map((item: User) => ({
  //   id: item.username,
  //   label: `${item.usermeta.firstname} ${item.usermeta.lastname}`,
  //   avatar: item.usermeta.avatar,
  // }));

  const getUsernames = async (
    query: string,
    callback: (data: (SuggestionDataItem & ExtraData)[]) => void
  ) => {
    setIsFetchingUsernameMention(true);

    try {
      const data = await axiosInstance.get<any>(`/users/search/${query}`, {
        cancelToken: axios.CancelToken.source().token,
      });
      console.log(data);
      if (data.data.success) {
        const filteredData = data?.data.data.map((item: User) => ({
          id: item.username,
          name: `${item.usermeta.firstname} ${item.usermeta.lastname}`,
          display: `@${item.username}`,
          avatar: item.usermeta.avatar,
          verified: item.verified,
          favorite_sport: item.usermeta.favorite_sport,
        }));

        callback(filteredData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingUsernameMention(false);
    }
  };

  const renderUserSuggestion = (
    suggestion: SuggestionDataItem & ExtraData,
    search: string,
    highlightedDisplay: ReactNode,
    index: number,
    focused: boolean
  ): ReactNode => {
    return (
      <div key={index}>
        <div className="flex gap-x-3">
          <Image
            width={30}
            height={30}
            className="size-[30px] sm:size-[30px] rounded-full object-cover"
            alt="avatar"
            src={
              suggestion?.avatar !== null
                ? suggestion?.avatar
                : profileImageplaceholder
            }
          />
          <div>
            <div className="flex gap-x-2 items-center">
              <p className="text-foreground text-sm hover:underline cursor-pointer font-semibold line-clamp-1 text-ellipsis">
                {suggestion.name}
              </p>
              <div className="flex gap-x-1 items-center">
                {suggestion?.verified && (
                  <Image
                    width={14}
                    height={14}
                    className="size-[14px] rounded-full object-cover"
                    alt="avatar"
                    src={"/assets/app-icons/verified-icon.svg"}
                  />
                )}
                <SportIcon category={suggestion?.favorite_sport} />
              </div>
            </div>
            <p className="text-foreground/50 text-xs">@{suggestion.id}</p>
          </div>
        </div>
      </div>
    );
  };

  const customContainerRenderer = (children: ReactNode) => {
    return (
      // <DropdownMenu>
      //   <DropdownMenuContent className="w-56 h-72">
      <CustomRenderer>
        <ScrollArea className="max-h-72 w-full rounded-md border border-border bg-transparent">
          {children}
        </ScrollArea>
      </CustomRenderer>
      //   </DropdownMenuContent>
      // </DropdownMenu>
    );
  };

  return (
    <MentionsInput
      style={defaultStyle}
      readOnly={readOnly}
      customSuggestionsContainer={customContainerRenderer}
      maxLength={280}
      inputRef={inputRef}
      placeholder={placeholder}
      className="w-full text-foreground min-h-10 text-base border-none outline-none ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:outline-[transparent_!important]"
      value={value}
      onChange={(e, newValue, newPlainTextValue, mentions) => {
        setQuery(mentions[mentions.length - 1]?.id);
        handleChange(e, newValue, newPlainTextValue, mentions);
      }}
    >
      <Mention
        trigger="@"
        data={getUsernames as any}
        appendSpaceOnAdd
        markup="@[__display__](id:__id__)"
        displayTransform={(id, display) => `${display}`}
        style={{ color: "#188C43" }}
        isLoading={isFetchingUsernameMention}
        renderSuggestion={renderUserSuggestion as any}
        className="text-[#188C43_!important] bg-red-500"
      />
      {/* hashtag feature to be implemented when clarified */}
      {/* <Mention
        trigger="#"
        data={requestTag}
        renderSuggestion={this.renderTagSuggestion}
      /> */}
    </MentionsInput>
  );
};

export default MessageBox;
