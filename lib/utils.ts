import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import validator from "validator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatString(input: string): string {
  // Capitalize the first letter
  let formattedString = input.charAt(0).toUpperCase() + input.slice(1);

  // Add a space after each comma
  formattedString = formattedString.replace(/,/g, ", ");

  return formattedString;
}

export const validatePhoneNumber = (number: string) => {
  const isValidPhoneNumber = validator.isMobilePhone(number);
  return isValidPhoneNumber;
};
