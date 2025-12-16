/**
 * Takes a local datetime string  and returns its UTC timestamp
 * @param date_string Ex. `2025-01-01T00:00:00`
 * @returns Equlivalent UTC timestamp
 */
export function parseDateStringToTime(date_string: string): number {
  const date = new Date(date_string);
  const offset = date.getTimezoneOffset();

  date.setMinutes(date.getMinutes() + offset);

  return date.getTime() / 1000;
}
