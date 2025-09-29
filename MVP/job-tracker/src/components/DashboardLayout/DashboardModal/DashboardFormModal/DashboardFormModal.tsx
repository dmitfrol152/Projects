import { Form } from "@/components/Form";
import { OPTIONS } from "@/constants/options";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { SelectUi } from "@/ui/SelectUi/SelectUi";
import type { DashboardFormModalProps } from "./types";

export function DashboardFormModal({
  handleSubmit,
  handleSubmitEditFormDashboard,
  errorDataBase,
  errors,
  register,
}: DashboardFormModalProps) {
  return (
    <Form
      onSubmit={handleSubmit(handleSubmitEditFormDashboard)}
      buttons={
        <Button size="md" variant="primary" type="submit">
          Edit
        </Button>
      }
      error={errorDataBase}
    >
      <Input
        label="Position"
        type="text"
        placeholder="Enter your position"
        error={errors.position?.message}
        {...register("position")}
      />
      <Input
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
    </Form>
  );
}
