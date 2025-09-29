import { Form } from "@/components/Form";
import { Button } from "@/ui/Button";
import { DashboardFilterColumns } from "./DashboardFilterColumns";
import type { DashboardFormCustomProps } from "./types";
import { Input } from "@/ui/Input";
import { SelectUi } from "@/ui/SelectUi/SelectUi";
import { OPTIONS } from "@/constants/options";

export function DashboardFormCustom({
  columns,
  isOpenFilters,
  handleOpenFilters,
  handleChangeStatusColumns,
  handleSubmit,
  handleSubmitNewFormDashboard,
  errorDataBase,
  errors,
  register,
  valueSort,
  setValueSort,
}: DashboardFormCustomProps) {
  const formClassName = "gap-3 grid grid-cols-3";

  return (
    <Form
      onSubmit={handleSubmit(handleSubmitNewFormDashboard)}
      className={formClassName}
      buttons={
        <Button size="md" variant="primary" type="submit">
          Add
        </Button>
      }
      buttonsSecondary={
        <DashboardFilterColumns
          columns={columns}
          isOpenFilters={isOpenFilters}
          handleOpenFilters={handleOpenFilters}
          handleChangeStatusColumns={handleChangeStatusColumns}
          valueSort={valueSort}
          setValueSort={setValueSort}
        />
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
