import type { HomeLayoutProps } from "./types";

export function HomeLayout({ header, children, footer }: HomeLayoutProps) {
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
