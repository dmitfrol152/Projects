import { Form } from "@shared/ui/Form";
import { OPTIONS } from "@shared/lib/constants/options";
import { ButtonUi } from "@shared/ui/ButtonUi";
import { InputUi } from "@shared/ui/InputUi";
import { SelectUi } from "@shared/ui/SelectUi";
import type { DashboardFormModalProps } from "./types";
import { TextareaUi } from "@shared/ui/TextareaUi";
import { DashboardTags } from "@features/dashboard/ui/DashboardModal/DashboardTags";

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
  return (
    <Form
      onSubmit={handleSubmit(handleSubmitEditFormDashboard)}
      buttons={
        <ButtonUi size="md" variant="primary" type="submit">
          Edit
        </ButtonUi>
      }
    >
      <InputUi
        label="Position"
        type="text"
        placeholder="Enter your position"
        error={errors.position?.message}
        {...register("position")}
      />
      <InputUi
        label="Company"
        type="text"
        placeholder="Enter your company"
        error={errors.company?.message}
        {...register("company")}
      />
      <SelectUi
        label="Status"
        options={OPTIONS}
        error={errors.status?.message}
        {...register("status")}
      />
      <TextareaUi
        label="Notes"
        error={errors.notes?.message}
        rows={4}
        placeholder="Enter your notes"
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
