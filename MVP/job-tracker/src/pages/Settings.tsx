import { SettingsLayout } from "@/components/SettingsLayout";
import { SettingsParagraph } from "@/components/SettingsLayout/SettingsParagraph";
import { SettingsTitle } from "@/components/SettingsLayout/SettingsTitle";

export default function Settings() {
  return (
    <SettingsLayout
      title={<SettingsTitle />}
      paragraph={<SettingsParagraph />}
    />
  );
}
