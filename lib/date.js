import { format, parseISO } from "date-fns";

/**
 * Formats a date string to a human-readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  // Add defensive checks
  if (!dateString) {
    console.warn("Empty date string provided to formatDate");
    return "Unknown date";
  }

  try {
    // Make sure the date string is properly formatted
    // Ensure it's a string and trim any whitespace
    const cleanDateString = String(dateString).trim();

    // Parse the date string
    const date = parseISO(cleanDateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${cleanDateString}`);
      return "Invalid date";
    }

    // Format the date
    return format(date, "MMMM dd, yyyy");
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return "Date error";
  }
}

/**
 * Gets the year from a date string
 * @param {string} dateString - ISO date string
 * @returns {number} Year
 */
export function getYear(dateString) {
  try {
    if (!dateString) {
      return new Date().getFullYear();
    }

    const date = parseISO(String(dateString).trim());

    if (isNaN(date.getTime())) {
      return new Date().getFullYear();
    }

    return date.getFullYear();
  } catch (error) {
    console.error(`Error getting year from date: ${dateString}`, error);
    return new Date().getFullYear();
  }
}
