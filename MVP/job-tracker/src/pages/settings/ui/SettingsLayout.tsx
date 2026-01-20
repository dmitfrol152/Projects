import clsx from "clsx";
import type {
  SettingsButtonsContainerProps,
  SettingsLayoutProps,
} from "./types.ts";
import AvatarEmpty from "@shared/assets/png/avatar-empty.png";
import { useTranslation } from "react-i18next";

export function SettingsLayout({
  loadingSave,
  loadingProfile,
  theme,
  toggleTheme,
  pagination,
  togglePagination,
  title,
  paragraph,
  fullnameInput,
  avatarInput,
  avatarDelete,
  srcImage,
  avatarName,
  avatarAddError,
  buttonLight,
  buttonDark,
  buttonSave,
  buttonDeleteProfile,
  modal,
  buttonPaginationScroll,
  buttonPaginationButtons,
  buttonLanguageEn,
  buttonLanguageRu,
  currentLanguage,
  toggleLanguage,
}: SettingsLayoutProps) {
  const { t: tCommon } = useTranslation("common");
  const { t: tSettings } = useTranslation("settings");

  const loadingContainer = (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-100 bg-[var(--color-black-05)]">
      {tCommon("loading")}
    </div>
  );

  return (
    <div className="flex flex-col gap-3 grow">
      {title}
      {paragraph}
      <div className="grid gap-3 grid-coles-1 md:grid-cols-[300px_1fr]">
        <div className="flex flex-col gap-3 items-center">
          <div className="flex flex-col h-75 w-75 overflow-hidden justify-center items-center rounded border border-[var(--color-primary)]">
            {loadingProfile ? (
              tCommon("loading")
            ) : (
              <img src={srcImage ? srcImage : AvatarEmpty} alt="Avatar" />
            )}
          </div>
          <div className="flex items-center gap-3">
            {avatarInput}
            {avatarDelete}
          </div>
          <div className="flex flex-col gap items-center">
            <span className="text-sm text-[var(--color-gray-500)]">
              {avatarName ?? tSettings("settingsImageNoFile")}
            </span>
            <span
              className={clsx(
                "text-sm",
                `${
                  avatarAddError
                    ? "text-[var(--color-danger)]"
                    : "text-[var(--color-gray-500)]"
                }`,
              )}
            >
              {tSettings("settingsImageMaxSize")}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-[var(--color-white-modify)] rounded p-4 justify-between">
          <div className="flex flex-col gap-3">
            {fullnameInput}
            <div className="flex flex-col gap-3">
              <span>{tSettings("settingsLabelTheme")}</span>
              <ButtonsContainer
                buttonOne={buttonLight}
                buttonTwo={buttonDark}
                toggleAction={toggleTheme}
                toggleState={theme}
                description={tSettings("settingsButtonTheme")}
              />
              <span>{tSettings("settingsLabelPagination")}</span>
              <ButtonsContainer
                buttonOne={buttonPaginationButtons}
                buttonTwo={buttonPaginationScroll}
                toggleAction={togglePagination}
                toggleState={pagination}
                description={tSettings("settingsButtonPagination")}
              />
              <span>{tSettings("settingsLabelLanguage")}</span>
              <ButtonsContainer
                buttonOne={buttonLanguageRu}
                buttonTwo={buttonLanguageEn}
                toggleAction={toggleLanguage}
                toggleState={currentLanguage}
                description={tSettings("settingsButtonLanguage")}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 justify-between">
            {buttonSave}
            <div className="flex items-center gap-3">{buttonDeleteProfile}</div>
          </div>
        </div>
      </div>
      {modal}
      {(loadingSave || loadingProfile) && loadingContainer}
    </div>
  );
}

export function ButtonsContainer({
  buttonOne,
  buttonTwo,
  toggleAction,
  toggleState,
  description,
}: SettingsButtonsContainerProps) {
  return (
    <div className="flex items-center gap-3">
      {buttonOne}
      {buttonTwo}
      <span>{description}</span>
      <div
        onClick={toggleAction}
        className={clsx(
          `relative w-14 h-8 rounded-full transition-colors cursor-pointer`,
          toggleState === "scroll"
            ? "bg-[var(--color-primary)]"
            : "bg-gray-300",
        )}
      >
        <span
          className={clsx(
            `absolute top-1 left-1 w-6 h-6 bg-[var(--color-white)] rounded-full shadow transition-transform`,
            toggleState === "scroll" ? "translate-x-6" : "translate-x-0",
          )}
        />
      </div>
    </div>
  );
}
