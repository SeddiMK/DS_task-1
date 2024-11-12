export function formatPhoneNumber(number: string): string {
  const cleaned: string = number.replace(/\D/g, "");

  if (cleaned.length === 12) {
    // Format as "+52 55 9225-2629"
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 8)}-${cleaned.slice(8, 12)}`;
  } else {
    return number;
  }
}
