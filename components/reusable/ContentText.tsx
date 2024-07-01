import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  contentId: number;
  type?: string;
}

const ContentText = ({
  text,
  contentId,
  type = "post",
}: Props): React.ReactNode => {
  const urlRegex = /https?:\/\/\S+/g;
  const ref = useRef<HTMLDivElement | null>(null);

  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  const isJsonString = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Function to extract URLs from a string

  const parsedString = isJsonString(text) ? JSON.parse(text) : text;
  const extractUrls = (text: string): string[] => {
    let urls: string[] = [];
    let urlMatch;
    while ((urlMatch = urlRegex.exec(text)) !== null) {
      urls.push(urlMatch[0]);
    }
    return urls;
  };

  extractUrls(parsedString);

  // Regular expression to match words starting with @ or #
  const regex = /(@|#)\w+|(https?:\/\/\S+)/g;

  // Remove leading and trailing escaped quotes
  const removeLeadingTrailingQuotes = (text: string): string => {
    if (text.startsWith('\\"') && text.endsWith('\\"')) {
      return text.slice(2, -2);
    }
    return text;
  };

  // Replace escaped quotes with normal quotes and remove unnecessary escape characters
  const processedText = removeLeadingTrailingQuotes(parsedString)
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");

  // Split text by new lines first
  const lines = processedText.split("\n");

  // Process each match in the text
  const formattedText: React.ReactNode[] = [];
  lines.forEach((line, lineIndex) => {
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(line)) !== null) {
      const word = match[0];
      const matchIndex = match.index;
      const nonMatchText = line.slice(lastIndex, matchIndex);
      formattedText.push(nonMatchText);
      lastIndex = matchIndex + word.length;

      if (word.startsWith("@") || word.startsWith("#")) {
        const cleanedWord = word.replace(/['"]+/g, "");
        const type = cleanedWord.charAt(0);
        const linkText = cleanedWord.slice(1);
        const link =
          type === "@" ? `/profile/${linkText}` : `/explore?search=${linkText}`;

        formattedText.push(
          <Link
            key={`${lineIndex}-${lastIndex}`}
            href={link}
            className={cn("text-colorPrimary")}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {cleanedWord}
          </Link>
        );
      } else if (word.startsWith("http")) {
        formattedText.push(
          <Link
            key={`${lineIndex}-${lastIndex}`}
            href={word}
            rel="noopener noreferrer"
            className={cn("text-colorPrimary text-wrap break-words")}
          >
            {word}
          </Link>
        );
      }
    }
    formattedText.push(line.slice(lastIndex));
    if (lineIndex < lines.length - 1) {
      formattedText.push(<br key={`br-${lineIndex}`} />);
    }
  });

  // Check if the text is truncated
  const checkIfTruncated = () => {
    const currentRef = ref.current;
    if (currentRef) {
      const { offsetHeight, scrollHeight } = currentRef;
      setIsTruncated(offsetHeight < scrollHeight);
    }
  };

  useLayoutEffect(() => {
    checkIfTruncated();
  }, [processedText]);

  useEffect(() => {
    window.addEventListener("resize", checkIfTruncated);
    return () => {
      window.removeEventListener("resize", checkIfTruncated);
    };
  }, []);

  return (
    <div>
      <div
        ref={ref}
        className={cn(
          "text-foreground hover:cursor-pointer text-sm min-[480px]:text-base min-[480px]:w-auto w-[calc(100vw-16px)]",
          !isShowingMore && "line-clamp-5"
        )}
      >
        {/* {console.log(text)}
        {console.log(formattedText)} */}
        {formattedText}
      </div>
      {isTruncated && !isShowingMore && (
        <button
          onClick={() => setIsShowingMore(true)}
          className="text-colorPrimary mt-2"
        >
          Show more
        </button>
      )}
      {isShowingMore && (
        <button
          onClick={() => setIsShowingMore(false)}
          className="text-colorPrimary mt-2"
        >
          Show less
        </button>
      )}
    </div>
  );
};

export default ContentText;
