import type { SettingsLayoutProps } from "./types";

export function SettingsLayout({ title, paragraph }: SettingsLayoutProps) {
  return (
    <div className="container flex flex-col grow py-6">
      {title}
      {paragraph}
    </div>
  );
}
