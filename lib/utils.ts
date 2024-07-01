import { type ClassValue, clsx } from "clsx";
import { format, formatDistanceToNow, isSameDay } from "date-fns";
import dayjs from "dayjs";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import validator from "validator";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { GroupedMessages, TChatMessage } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatString(input: string): string {
  // Capitalize the first letter
  let formattedString = input?.charAt(0).toUpperCase() + input.slice(1);

  // Add a space after each comma
  formattedString = formattedString.replace(/,/g, ", ");

  return formattedString;
}

export const validatePhoneNumber = (number: string) => {
  const isValidPhoneNumber = validator.isMobilePhone(number);
  return isValidPhoneNumber;
};

export function removeBrackets(str: string) {
  return str.replace(/\(|\)/g, "");
}

export const handlePostLikeIncrement = (
  likesCount: number,
  initialLikedByMe: object[],
  likedByMe: boolean
) => {
  if (initialLikedByMe?.length) {
    if (likedByMe) {
      return likesCount;
    } else {
      return likesCount - 1;
    }
  } else {
    if (likedByMe) {
      return likesCount + 1;
    } else {
      return likesCount;
    }
  }
};

export function formatNumberCount(likes: number): string {
  if (likes >= 1e9) {
    return (likes / 1e9).toFixed(1) + "B"; // Convert to billions with 1 decimal place
  } else if (likes >= 1e6) {
    return (likes / 1e6).toFixed(1) + "M"; // Convert to millions with 1 decimal place
  } else if (likes >= 1e3) {
    return (likes / 1e3).toFixed(1) + "K"; // Convert to thousands with 1 decimal place
  }
  return likes.toString(); // Return the number as is if less than 1k
}

export function formatCurrentWeek(): string {
  const today = new Date();
  const firstDay = new Date(today.setDate(today.getDate() - today.getDay())); // Get first day of the week
  const lastDay = new Date(today.setDate(firstDay.getDate() + 6)); // Get last day of the week

  // Format dates in 'YYYY-MM-DD' format
  const formattedFirstDay = formatDate(firstDay);
  const formattedLastDay = formatDate(lastDay);

  // return `${formattedFirstDay} - ${formattedLastDay}`;
  return `${formattedFirstDay}`;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month as it starts from 0
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
// Output: "2024-04-15 - 2024-04-21"

export function formatDateTime(dateTimeString: string) {
  // Parse the input datetime string using Moment.js
  const dateTime = moment(dateTimeString);

  // Format the datetime in the desired format
  const formattedDateTime = dateTime.format("h:mmA, D MMM YYYY");

  return formattedDateTime;
}

/**
 * Formats the given date based on whether it is from the same day or not.
 * @param {Date|string} createdAt - The createdAt date to format.
 * @returns {string} - Formatted date string.
 */
export function formatConversationCreatedAt(createdAt: string) {
  const date = new Date(createdAt);
  const now = new Date();

  if (isSameDay(date, now)) {
    return format(date, "p"); // 'p' represents the time in 'hh:mm a' format
  } else {
    return formatDistanceToNow(date, { addSuffix: true }).replace("about ", "");
  }
}

export const formatTimestamp = (unixTimestamp: number): string => {
  const date = dayjs.unix(unixTimestamp);
  const now = dayjs();

  if (date.isSame(now, "day")) {
    // Today
    return date.format("HH:mm");
  } else if (date.isSame(now.subtract(1, "day"), "day")) {
    // Yesterday
    return `Yesterday ${date.format("HH:mm")}`;
  } else if (date.isAfter(now.subtract(7, "days"))) {
    // Within the last 7 days
    return date.format("dddd HH:mm");
  } else {
    // Older than 7 days
    return date.format("DD/MM/YYYY HH:mm");
  }
};

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrBefore);

export const groupMessagesByTime = (
  messages: TChatMessage[]
): GroupedMessages[] => {
  const groupedMessages = messages.reduce<Record<string, TChatMessage[]>>(
    (acc, message) => {
      const createdAt = dayjs(message.created_at);

      let timeFrame: string;
      if (createdAt.isToday()) {
        timeFrame = "Today";
      } else if (createdAt.isYesterday()) {
        timeFrame = "Yesterday";
      } else if (createdAt.isSameOrBefore(dayjs().subtract(1, "week"))) {
        timeFrame = createdAt.format("MMMM D, YYYY");
      } else {
        timeFrame = "Last Week";
      }

      if (!acc[timeFrame]) {
        acc[timeFrame] = [];
      }

      acc[timeFrame].push(message);

      return acc;
    },
    {}
  );

  return Object.entries(groupedMessages).map(([timeFrame, messages]) => ({
    timeFrame,
    messages,
  }));
};
