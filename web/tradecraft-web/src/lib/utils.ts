import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const defualtShimmerColor = "oklch(from var(--foreground) l c h / 0.1)"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { defualtShimmerColor, cn };
