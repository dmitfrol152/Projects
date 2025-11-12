import { ButtonUi } from "@shared/ui/ButtonUi";
import type { SettingButtonDeleteProfileProps } from "./types";

export function SettingButtonDeleteProfile({
  handleConfirmDeleteProfile,
}: SettingButtonDeleteProfileProps) {
  return (
    <ButtonUi
      type="button"
      size="md"
      variant="exit"
      handleClickButton={handleConfirmDeleteProfile}
    >
      Delete profile
    </ButtonUi>
  );
}
