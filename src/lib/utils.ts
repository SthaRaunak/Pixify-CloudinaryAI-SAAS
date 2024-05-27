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
