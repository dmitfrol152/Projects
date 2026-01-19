import { InputUi } from "@shared/ui/InputUi";
import type { DashboardTagsProps } from "./types";
import { ButtonUi } from "@shared/ui/ButtonUi";
import IconAdd from "@shared/assets/svg/icon-add.svg?react";
import IconCloseX from "@shared/assets/svg/icon-close-x.svg?react";
import { AnimatedContainer } from "@shared/ui/AnimatedContainer";
import { useTranslation } from "react-i18next";

export function DashboardTags({
  job,
  newTagValue,
  setNewTagValue,
  arrayTagValue,
  handleAddTag,
  handleDeleteTag,
  isErrorAddTag,
}: DashboardTagsProps) {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex flex-col relative mb-3">
          <InputUi
            value={newTagValue}
            setValue={setNewTagValue}
            label={t("dashboardEditLabelTags")}
            type="text"
            placeholder={t("dashboardEditPlaceholderTags")}
          />
          {newTagValue && (
            <AnimatedContainer>
              <ButtonUi
                className="absolute bottom-2 right-3 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                type="button"
                size="icon"
                variant="icon"
                handleClickButton={() => handleAddTag(job)}
              >
                <IconAdd className="w-5 h-5" />
              </ButtonUi>
            </AnimatedContainer>
          )}
        </div>
        <div className="flex gap-1 items-center">
          {arrayTagValue &&
            arrayTagValue.length > 0 &&
            arrayTagValue.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-2 py-1 pr-0 text-xs rounded bg-[var(--color-blue-light)] text-[var(--color-blue-dark)]"
              >
                {tag}
                <ButtonUi
                  className="text-[var(--color-danger)] hover:text-[var(--color-danger-hover)]"
                  type="button"
                  size="icon"
                  variant="icon"
                  handleClickButton={() => handleDeleteTag(tag)}
                >
                  <IconCloseX className="w-3 h-3" />
                </ButtonUi>
              </span>
            ))}
        </div>
      </div>
      {isErrorAddTag && (
        <AnimatedContainer transformAnimation={3}>
          <span className="text-[var(--color-danger)]">
            {t("dashboardEditErrorTags")}
          </span>
        </AnimatedContainer>
      )}
    </div>
  );
}
