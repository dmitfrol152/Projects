import { Social } from "@components/Social";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[var(--color-gray-50)] p-4 flex justify-between gap items-center max-h-18">
      <span className="text-[var(--color-gray-600)]">
        ©2025 Dmitry Frolkov. All rights reserved.
      </span>
      <Social />
    </footer>
  );
}
