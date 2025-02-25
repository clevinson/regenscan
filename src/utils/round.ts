export function roundToDecimalPlaces(
  value: number,
  decimalPlaces: number
): string {
  const factor = Math.pow(10, decimalPlaces);
  return (Math.round(value * factor) / factor).toString();
}
