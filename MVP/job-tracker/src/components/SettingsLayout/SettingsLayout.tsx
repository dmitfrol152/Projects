import type { SettingsLayoutProps } from "./types";

export function SettingsLayout({ title, paragraph }: SettingsLayoutProps) {
  return (
    <>
      {title}
      {paragraph}
    </>
  );
}
