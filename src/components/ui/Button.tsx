import { createComponent } from ".";
import { tv } from "tailwind-variants";

const button = tv({
  base: "inline-flex justify-center items-center tracking-wide text-gray-950 rounded-xl active:opacity-90 transition-colors disabled:cursor-default disabled:opacity-50",
  variants: {
    color: {
      ghost: "hover:bg-[rgba(0,0,0,.05)]",
      default: "bg-gray-100 hover:bg-gray-200 text-gray-900",
      primary: "bg-primary-600 text-white hover:bg-primary-700",
    },
    size: {
      sm: "p-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
      icon: ["px-1 py-1 w-8 h-8"],
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

export const Button = createComponent("button", button);
