import { format, parseISO } from 'date-fns';

/**
 * Formats a date string to a human-readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  const date = parseISO(dateString);
  return format(date, 'MMMM dd, yyyy');
}

/**
 * Gets the year from a date string
 * @param {string} dateString - ISO date string
 * @returns {number} Year
 */
export function getYear(dateString) {
  const date = parseISO(dateString);
  return date.getFullYear();
}
