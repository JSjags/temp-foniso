import React, { MutableRefObject } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  textRef: MutableRefObject<HTMLParagraphElement | null>;
  isShowingMore: boolean;
  contentId: number;
  type?: string;
}

const ContentText = ({
  text,
  contentId,
  isShowingMore,
  textRef,
  type = "post",
}: Props): React.ReactNode => {
  const urlRegex = /https?:\/\/\S+/g;

  // const router = useRouter();
  let urls: string[] = [];

  // Function to extract URLs from a string
  const extractUrls = (text: string): string[] => {
    let urlMatch;
    while ((urlMatch = urlRegex.exec(text)) !== null) {
      urls.push(urlMatch[0]);
    }
    return urls;
  };

  extractUrls(text);

  // Regular expression to match words starting with @ or #
  const regex = /(@|#)\w+|(https?:\/\/\S+)/g;

  // Process each match in the text
  let lastIndex = 0;
  const formattedText: React.ReactNode[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    // Extract the matched word
    const word = match[0];
    // Extract the index of the match
    const matchIndex = match.index;
    // Extract the text between the last match and the current match
    const nonMatchText = text.slice(lastIndex, matchIndex);
    // Add the non-match text to the formattedText array
    formattedText.push(nonMatchText);
    // Increment the lastIndex to the end of the current match
    lastIndex = matchIndex + word.length;

    if (word.startsWith("@") || word.startsWith("#")) {
      // Remove any quotes around the word
      const cleanedWord = word.replace(/['"]+/g, "");

      // Check if it starts with @ or #
      const type = cleanedWord.charAt(0);

      // Extract the word without the @ or #
      const linkText = cleanedWord.slice(1);

      // Generate the link based on the type
      const link =
        type === "@" ? `/profile/${linkText}` : `/explore?search=${linkText}`;

      // Add the link component to the formattedText array
      formattedText.push(
        <Link key={lastIndex} href={link} className={cn("text-colorPrimary")}>
          {cleanedWord} {/* Add a space after the formatted word */}
        </Link>
      );
    } else if (word.startsWith("http")) {
      // Add URL as a link
      formattedText.push(
        <Link
          key={lastIndex}
          href={word}
          rel="noopener noreferrer"
          className={cn("text-colorPrimary")}
        >
          {word} {/* Add a space after the formatted word */}
        </Link>
      );
    }
  }

  // Add the remaining text after the last match
  formattedText.push(text.slice(lastIndex));

  return (
    <>
      <p
        ref={textRef}
        className={cn(
          "text-foreground text-ellipsis hover:cursor-pointer",
          !isShowingMore && "line-clamp-5"
        )}
      >
        {formattedText}
      </p>
      <div>
        {Boolean(urls.length && urls.length === 1) && URLPreview(urls[0])}
      </div>
    </>
  );
};

const URLPreview = (url: string) => {
  return <div></div>;
};

export default ContentText;
