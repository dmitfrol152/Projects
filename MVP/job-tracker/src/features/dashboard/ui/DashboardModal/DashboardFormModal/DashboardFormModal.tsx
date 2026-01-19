import { Form } from "@shared/ui/Form";
import { OPTIONS } from "@shared/lib/constants/options";
import { ButtonUi } from "@shared/ui/ButtonUi";
import { InputUi } from "@shared/ui/InputUi";
import { SelectUi } from "@shared/ui/SelectUi";
import type { DashboardFormModalProps } from "./types";
import { TextareaUi } from "@shared/ui/TextareaUi";
import { DashboardTags } from "@features/dashboard/ui/DashboardModal/DashboardTags";
import { useTranslation } from "react-i18next";

export function DashboardFormModal({
  handleSubmit,
  handleSubmitEditFormDashboard,
  errors,
  register,
  isOpenModal,
  newTagValue,
  setNewTagValue,
  arrayTagValue,
  handleAddTag,
  handleDeleteTag,
  isErrorAddTag,
}: DashboardFormModalProps) {
  const { t } = useTranslation("dashboard");

  return (
    <Form
      onSubmit={handleSubmit(handleSubmitEditFormDashboard)}
      buttons={
        <ButtonUi size="md" variant="primary" type="submit">
          {t("dashboardEditButton")}
        </ButtonUi>
      }
    >
      <InputUi
        label={t("dashboardEditLabelPosition")}
        type="text"
        placeholder={t("dashboardEditPlaceholderPosition")}
        error={errors.position?.message}
        {...register("position")}
      />
      <InputUi
        label={t("dashboardEditLabelCompany")}
        type="text"
        placeholder={t("dashboardEditPlaceholderCompany")}
        error={errors.company?.message}
        {...register("company")}
      />
      <SelectUi
        label={t("dashboardEditLabelStatus")}
        options={OPTIONS}
        error={errors.status?.message}
        {...register("status")}
      />
      <TextareaUi
        label={t("dashboardEditLabelNotes")}
        error={errors.notes?.message}
        rows={4}
        placeholder={t("dashboardEditPlaceholderNotes")}
        {...register("notes")}
      />
      <DashboardTags
        job={isOpenModal}
        newTagValue={newTagValue}
        setNewTagValue={setNewTagValue}
        arrayTagValue={arrayTagValue}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
        isErrorAddTag={isErrorAddTag}
      />
    </Form>
  );
}
