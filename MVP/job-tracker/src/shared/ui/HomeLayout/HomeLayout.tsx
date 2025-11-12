import type { HomeLayoutProps } from "./types";

export function HomeLayout({ header, children, footer }: HomeLayoutProps) {
  const HomeLayoutClasses = "flex flex-col grow";

  return (
    <div className={HomeLayoutClasses}>
      {header}
      <main className={HomeLayoutClasses}>{children}</main>
      {footer}
    </div>
  );
}
