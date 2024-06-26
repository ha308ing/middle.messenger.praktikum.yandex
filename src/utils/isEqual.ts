import { type PlainObject } from "@/types/types";
import isArrayOrObject from "./isArrayOrObject";

export function isEqual(lhs: PlainObject | [], rhs: PlainObject | []) {
  if (lhs == null && rhs == null) return true;
  if (lhs != null && rhs == null) return false;
  if (lhs == null && rhs != null) return false;

  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = (rhs as PlainObject)[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
