import { AnyObject, OptionProp, User } from "@/types";
import moment from "moment";

export const formatNumber = (arg: number | string) => {
  if (!["number", "string"].includes(typeof arg)) return "0";

  const num = parseFloat(arg.toString());
  const parse = (arg: number, type: string) =>
    `${(num / arg).toFixed(1).replace(".0", "")}${type}`;

  switch (true) {
    case num >= 1000000000000:
      return parse(1000000000000, "T");
    case num >= 1000000000:
      return parse(1000000000, "B");
    case num >= 1000000:
      return parse(1000000, "M");
    case num >= 1000:
      return parse(1000, "K");

    default:
      return `${num}k`;
  }
};

/**
 * Converts an image file to a Base64 string.
 * @param file - The image file to convert.
 * @returns A promise that resolves with the Base64 string of the image.
 */
export const readImageAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error("Failed to convert image to Base64"));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export default readImageAsBase64;

export function ensureUniqueItemsByKey<T extends OptionProp>(
  arr: T[],
  key: "label" | "value"
): T[] {
  const seen = new Set<any>();
  const result: T[] = [];

  for (const item of arr) {
    if (item.hasOwnProperty(key)) {
      const keyValue = item[key];
      if (!seen.has(keyValue)) {
        seen.add(keyValue);
        result.push(item);
      }
    } else {
      // If the key doesn't exist in the item, include it by default
      result.push(item);
    }
  }

  return result;
}

export const imageUrlToFile = async (
  imageUrl: string,
  fileName: string
): Promise<File> => {
  // Step 1: Fetch the image data
  const response = await fetch(imageUrl);

  // Check if the request was successful
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  // Step 2: Convert the response to a Blob
  const blob = await response.blob();

  // Step 3: Convert the Blob to a File
  const file = new File([blob], fileName, { type: blob.type });

  return file;
};

export const calculateRelativeTimeLeft = (
  createdAt: string,
  days: string
): string => {
  // Parse the createdAt timestamp
  const createdMoment = moment(createdAt);

  // Parse the number of days and add to the createdMoment
  const daysToAdd = parseInt(days, 10);
  const targetMoment = createdMoment.add(daysToAdd, "days");

  // Calculate the difference in hours and minutes from now to the targetMoment
  const now = moment();
  const duration = moment.duration(targetMoment.diff(now));

  const hoursLeft = Math.floor(duration.asHours());
  const minutesLeft = Math.floor(duration.asMinutes()) % 60;

  // Return the formatted string
  if (hoursLeft > 0) {
    return `${hoursLeft}hr${hoursLeft > 1 ? "s" : ""} ${minutesLeft}min${
      minutesLeft > 1 ? "s" : ""
    } left`;
  } else {
    return `${minutesLeft}min${minutesLeft > 1 ? "s" : ""} left`;
  }
};

export function isTimeLeft(createdAt: string, durationInDays: string): boolean {
  // Parse the createdAt date
  const createdDate = moment(createdAt);

  // Calculate the expiration date by adding the duration to the created date
  const expirationDate = createdDate.add(parseInt(durationInDays, 10), "days");

  // Get the current date and time
  const currentDate = moment();

  // Check if the current date is before the expiration date
  return currentDate.isBefore(expirationDate);
}

/**
 * Conceals part of an email address.
 * For example, "user@example.com" becomes "us***@example.com".
 *
 * @param email - The email address to conceal.
 * @param visibleChars - Number of characters to remain visible at the start and end of the username.
 * @returns The concealed email address.
 */
export function concealEmail(email: string, visibleChars: number = 2): string {
  // Validate the email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new Error("Invalid email format");
  }

  // Split the email into username and domain parts
  const [username, domain] = email.split("@");

  // If the username is shorter than the number of visible characters, do not conceal
  if (username.length <= visibleChars * 2) {
    return email;
  }

  // Create the concealed username
  const concealedUsername = `${username.slice(0, visibleChars)}${"*".repeat(
    username.length - visibleChars * 2
  )}${username.slice(-visibleChars)}`;

  // Return the concealed email
  return `${concealedUsername}@${domain}`;
}

export function filterOutFollowing(
  fetchSuggestionsArray: User[] = [],
  followingArray: any[] = []
): User[] {
  // Debugging: log input arrays
  console.log("fetchSuggestionsArray:", fetchSuggestionsArray);
  console.log("followingArray:", followingArray);

  // Create a Set of IDs that need to be filtered out
  const followingIds = new Set(followingArray.map((item) => item.followerId));

  // Debugging: log the set of IDs to be filtered out
  console.log("followingIds:", followingIds);

  // Filter the fetchSuggestionsArray to remove items with IDs in followingIds
  const filteredArray = fetchSuggestionsArray.filter(
    (item) => !followingIds.has(item.id)
  );

  // Debugging: log the filtered array
  console.log("filteredArray:", filteredArray);

  return filteredArray;
}

// Define the custom function to shorten the relative time suffixes
export const customRelativeTime = (date: string) => {
  const duration = moment.duration(moment().diff(date));

  if (duration.years() > 0) {
    return `${duration.years()}y ago`;
  }
  if (duration.months() > 0) {
    return `${duration.months()}mo ago`;
  }
  if (duration.days() > 0) {
    return `${duration.days()}d ago`;
  }
  if (duration.hours() > 0) {
    return `${duration.hours()}h ago`;
  }
  if (duration.minutes() > 0) {
    return `${duration.minutes()}m ago`;
  }
  if (duration.seconds() > 0) {
    return `${duration.seconds()}s ago`;
  }
  return "just now";
};
