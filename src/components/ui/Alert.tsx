import { createComponent } from ".";
import { tv } from "tailwind-variants";

const alert = tv({
  base: "p-4 rounded-xl",
  variants: {
    variant: {
      error: "bg-error-100 text-error-700",
    },
  },
});

export const Alert = createComponent("div", alert);
