import { InputUi } from "@/ui/InputUi";
import type { SettingInputAvatarInfoProps } from "./types";

export function SettingInputAvatarInfo({
  handleAddAvatar,
}: SettingInputAvatarInfoProps) {
  const classNameLabel =
    "px-4 py-2 border rounded transition-colors border-[var(--color-black)] text-[var(--color-black)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)] focus:tetx-[var(--color-primary)] hover:text-[var(--color-primary)] focus:outline-none cursor-pointer";

  return (
    <InputUi
      classNameLabel={classNameLabel}
      className="hidden"
      label="Выбрать файл"
      type="file"
      accept="image/*"
      onChange={handleAddAvatar}
    />
  );
}
