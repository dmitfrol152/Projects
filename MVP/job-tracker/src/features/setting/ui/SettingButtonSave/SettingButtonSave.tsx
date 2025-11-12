import { ButtonUi } from "@shared/ui/ButtonUi";
import type { SettingButtonSaveProps } from "./types";

export function SettingButtonSave({ handleSave }: SettingButtonSaveProps) {
  return (
    <ButtonUi
      size="md"
      variant="primary"
      type="button"
      handleClickButton={handleSave}
    >
      Save
    </ButtonUi>
  );
}
