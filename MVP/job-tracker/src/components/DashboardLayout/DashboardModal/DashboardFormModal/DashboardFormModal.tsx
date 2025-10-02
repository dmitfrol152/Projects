import { Form } from "@/components/Form";
import { OPTIONS } from "@/constants/options";
import { ButtonUi } from "@/ui/ButtonUi";
import { InputUi } from "@/ui/InputUi";
import { SelectUi } from "@/ui/SelectUi/SelectUi";
import type { DashboardFormModalProps } from "./types";
import { TextareaUi } from "@/ui/TextareaUi/TextareaUi";
import { DashboardTags } from "@components/DashboardLayout/DashboardModal/DashboardTags";

export function DashboardFormModal({
  handleSubmit,
  handleSubmitEditFormDashboard,
  errorDataBase,
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
      error={errorDataBase}
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
