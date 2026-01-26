import type { ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "small" | "big";
type Type = "button" | "submit";

export interface ButtonProps {
  variant: Variant;
  size: Size;
  type: Type;
  children: ReactNode;
}
