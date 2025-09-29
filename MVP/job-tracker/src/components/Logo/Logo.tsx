import LogoIcon from "@assets/svg/logo.svg?react";

export function Logo() {
  return (
    <div className="flex items-center gap-1">
      <LogoIcon className="w-10" />
      <p className="text-xl font-bold">Job Tracker</p>
    </div>
  );
}
