/**
 *
 * @param date Fecha a formatear
 * @param separator tipo de separador para fecha
 *
 * @return string 1983-11-26
 */
export const dateFormatYYYYMMDD = (date: Date, separator: '-' | '/') => {
  return `${date.getFullYear()}${separator}${(date.getMonth() + 1).toString().padStart(2, '0')}${separator}${date.getDate().toString().padStart(2, '0')}`;
};

/**
 * @description 'Recibo una fecha con el formato en string debe ser DD (/|-) MM (/|-) YYYY'
 * @param date <string>
 * @returns Fecha con horas minutos y segundos en "cero"
 */
export const convertDateFormatToDate = (dateString: string) => {
  // Step 1: Validate the input format using regex
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
  const match = dateString.match(regex);

  if (!match) {
    throw new Error('Invalid date format. Please use DD/MM/YYYY.');
  }

  // Step 2: Extract day, month, and year from the matched groups
  const day = parseInt(match[1], 10); // DD
  const month = parseInt(match[2], 10) - 1; // MM (0-indexed)
  const year = parseInt(match[3], 10); // YYYY

  // Step 3: Create a new Date object
  const dateObject = new Date(year, month, day);

  // Check if the date is valid
  if (dateObject.getDate() !== day || dateObject.getMonth() !== month || dateObject.getFullYear() !== year) {
    throw new Error('Invalid date. Please check the day and month values.');
  }

  return dateObject; // Return the Date object
};

/**
 * @description 'Recibo una fecha del tipo Date y devuelvo un string'
 * @param date <string>
 * @returns Fecha con el formato DD/MM/YYYY
 */
export const formatDateToDDMMYYYY = (date: Date) => {
  // Step 1: Validate the input type
  if (!(date instanceof Date)) {
    throw new Error('Input must be a Date object.');
  }

  // Step 2: Extract day, month, and year
  const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get full year

  // Step 3: Construct the formatted string
  return `${day}/${month}/${year}`;
};