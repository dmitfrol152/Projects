import { Form } from "@shared/ui/Form";
import { ButtonUi } from "@shared/ui/ButtonUi";
import type { NotificationFormCustomProps } from "./types";
import { InputUi } from "@shared/ui/InputUi";
import { useTranslation } from "react-i18next";

export function NotificationFormCustom({
  handleSubmit,
  errors,
  register,
  handleSubmitNewNotification,
  handleClearPassed,
  handleClearAll,
}: NotificationFormCustomProps) {
  const { t } = useTranslation("reminders");

  const formClassName = "gap-3 grid grid-cols-1 md:grid-cols-2";

  return (
    <Form
      onSubmit={handleSubmit(handleSubmitNewNotification)}
      className={formClassName}
      buttons={
        <ButtonUi size="md" variant="primary" type="submit">
          {t("remindersButtonAdd")}
        </ButtonUi>
      }
      buttonsSecondary={
        <>
          <ButtonUi
            size="md"
            variant="secondary"
            type="button"
            handleClickButton={handleClearPassed}
          >
            {t("remindersButtonClearPassed")}
          </ButtonUi>
          <ButtonUi
            size="md"
            variant="exit"
            type="button"
            handleClickButton={handleClearAll}
          >
            {t("remindersButtonClearAll")}
          </ButtonUi>
        </>
      }
    >
      <InputUi
        label={t("remindersFormLabelMessage")}
        type="text"
        placeholder={t("remindersFormPlaceholderMessage")}
        error={errors.message?.message}
        {...register("message")}
      />
      <InputUi
        label={t("remindersFormLabelDate")}
        type="datetime-local"
        placeholder={t("remindersFormPlaceholderDate")}
        error={errors.date?.message}
        {...register("date")}
      />
    </Form>
  );
}
