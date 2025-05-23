import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names with Tailwind CSS support
 * @param {...(string|Object)} inputs - Class names or conditional class objects
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Creates an absolute URL from a path
 * @param {string} path - The path to make absolute
 * @returns {string} Absolute URL
 */
export function absoluteUrl(path) {
  return `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${path}`;
}

/**
 * Formats a date string
 * @param {string|number} input - Date string or timestamp
 * @returns {string} Formatted date (e.g., "January 1, 2023")
 */
export function formatDate(input) {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Truncates text with ellipsis
 