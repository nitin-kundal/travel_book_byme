import { format } from 'date-fns';

/**
 * Generates a random integer between the specified minimum and maximum values.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} - A random integer between min (inclusive) and max (exclusive).
 */
const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + min;
  };
  

/**
 * Formats a date object into a string based on the given format.
 *
 * @param {Date | string | number} date - The date to format. Can be a Date object, a date string, or a timestamp.
 * @param {string} fmt - The format string (default is 'yyyy-MM-dd').
 * @returns {string} - The formatted date string.
 */
const formatDate = (date, fmt = 'yyyy-MM-dd') => {
    return format(date, fmt);
  };

/**
 * Function to format a date according to the specified locale and options.
 *
 * @param {Date | string | number} date - The date to format. Can be a Date object, a date string, or a timestamp.
 * @param {string} locale - The locale string (e.g., 'en-GB', 'en-US').
 * @param {Object} options - An object specifying the formatting options for the date.
 * @returns {string} - The formatted date string.
 */
const formatDateLocale = (date, locale = 'en-GB', options = {}) => {
    // Convert the input to a Date object if it is not already.
    const dateObj = new Date(date);

    // Default options for date formatting.
    const defaultOptions = {
        weekday: 'short',  // 'short' for abbreviated weekday name, e.g., 'Mon'
        day: 'numeric',    // 'numeric' for day of the month, e.g., 1, 2, 3
        month: 'short',    // 'short' for abbreviated month name, e.g., 'Jan'
        year: 'numeric'    // 'numeric' for four-digit year, e.g., 2024
    };

    // Merge the default options with the provided options.
    const formatOptions = { ...defaultOptions, ...options };

    // Format the date using toLocaleDateString with the specified locale and options.
    return dateObj.toLocaleDateString(locale, formatOptions);
}

export { getRandomInteger, formatDate, formatDateLocale };
