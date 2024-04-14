/**
 * Check if the value is an array
 * @param value unknown
 * @returns boolean
 */
export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}
