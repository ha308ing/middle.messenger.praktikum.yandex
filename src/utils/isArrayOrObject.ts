import { isPlainObject } from "@/utils/isPlainObject";
import { isArray } from "@/utils/isArray";
import { type PlainObject } from "@/types/types";

/**
 * Check if the value is an object or an array
 */
export default function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isArray(value) || isPlainObject(value);
}
