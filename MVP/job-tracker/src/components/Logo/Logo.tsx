import LogoIcon from "@assets/svg/logo.svg?react";
import type { LogoProps } from "./types";

export function Logo({ profileSrc, user }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      {user ? (
        <div className="flex flex-col h-10 w-10 overflow-hidden justify-center items-center rounded-full border border-[var(--color-green-600)]">
          <img src={profileSrc} alt="Avatar" />
        </div>
      ) : (
        <LogoIcon className="w-10" />
      )}
      <p className="text-xl font-bold">Job Tracker</p>
    </div>
  );
}
