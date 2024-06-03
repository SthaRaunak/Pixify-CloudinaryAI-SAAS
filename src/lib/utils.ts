import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// error handler

export function handleError(error: unknown) {
  if (error instanceof Error) {
    //This is native Javascript error(e.h Type Error , Range Error)
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    //This is a string error message
    console.log(error);
    throw new Error(`Error: ${error}`);
  } else {
    //This is unknown type
    console.log(error);
    throw new Error(`Unkown Error: ${JSON.stringify(error)}`);
  }
}

//Debounce

export function Debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

// Deep Merge Objects (Recursion)
export const deepMergeObjects = (obj1: any, obj2: any) => {
  if (obj2 === null || obj2 === undefined) return obj1;

  let output = { ...obj2 };

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        obj2[key] &&
        typeof obj2[key] === "object"
      ) {
        deepMergeObjects(obj1[key], obj2[key]);
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};
