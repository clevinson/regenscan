import dayjs from "dayjs";

export function roundToDecimalPlaces(
  value: number,
  decimalPlaces: number
): string {
  const factor = Math.pow(10, decimalPlaces);
  return (Math.round(value * factor) / factor).toString();
}

export function formatTimestamp(timestamp: string | null): string | null {
  return timestamp ? dayjs(timestamp).format("MMMM D, YYYY h:mm A") : null;
}
