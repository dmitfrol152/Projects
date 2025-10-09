import { InputUi } from "@/ui/InputUi";
import type { SettingInputFullNameInfoProps } from "./types";

export function SettingInputFullNameInfo({
  fullName,
  setFullName,
}: SettingInputFullNameInfoProps) {
  return (
    <InputUi
      label="Your full name is:"
      placeholder={fullName ? fullName : "Type your fullname"}
      type="text"
      value={fullName}
      setValue={setFullName}
    />
  );
}
