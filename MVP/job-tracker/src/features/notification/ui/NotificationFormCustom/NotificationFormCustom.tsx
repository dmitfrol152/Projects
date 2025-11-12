import { Form } from "@shared/ui/Form";
import { ButtonUi } from "@shared/ui/ButtonUi";
import type { NotificationFormCustomProps } from "./types";
import { InputUi } from "@shared/ui/InputUi";

export function NotificationFormCustom({
  handleSubmit,
  errors,
  register,
  handleSubmitNewNotification,
  handleClearPassed,
  handleClearAll,
}: NotificationFormCustomProps) {
  const formClassName = "gap-3 grid grid-cols-2";

  return (
    <Form
      onSubmit={handleSubmit(handleSubmitNewNotification)}
      className={formClassName}
      buttons={
        <ButtonUi size="md" variant="primary" type="submit">
          Add
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
            Clear passed
          </ButtonUi>
          <ButtonUi
            size="md"
            variant="exit"
            type="button"
            handleClickButton={handleClearAll}
          >
            Clear all
          </ButtonUi>
        </>
      }
    >
      <InputUi
        label="Message"
        type="text"
        placeholder="Enter your notification message"
        error={errors.message?.message}
        {...register("message")}
      />
      <InputUi
        label="Date"
        type="datetime-local"
        placeholder="Enter your date for notification you"
        error={errors.date?.message}
        {...register("date")}
      />
    </Form>
  );
}
