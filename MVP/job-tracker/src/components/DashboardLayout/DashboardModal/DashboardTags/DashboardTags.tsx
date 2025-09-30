import { InputUi } from "@/ui/InputUi";
import type { DashboardTagsProps } from "./types";
import { ButtonUi } from "@/ui/ButtonUi";
import IconAdd from "@assets/svg/icon-add.svg?react";
import IconCloseX from "@assets/svg/icon-close-x.svg?react";
import { AnimatedContainer } from "@/shared/AnimatedContainer";

export function DashboardTags({
  job,
  newTagValue,
  setNewTagValue,
  arrayTagValue,
  handleAddTag,
  handleDeleteTag,
  isErrorAddTag,
}: DashboardTagsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex flex-col relative mb-3">
          <InputUi
            value={newTagValue}
            setValue={setNewTagValue}
            label="Tags"
            type="text"
            placeholder="Enter your tag"
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
                className="flex items-center gap-2 px-2 py-1 pr-0 text-xs rounded bg-blue-100 text-blue-700"
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
            Max tags count is 3
          </span>
        </AnimatedContainer>
      )}
    </div>
  );
}
