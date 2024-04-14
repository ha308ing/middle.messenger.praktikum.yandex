import { type PlainObject } from "@/types/types";

/**
 * Check if the value is an object, excluding null
 */
export function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}
