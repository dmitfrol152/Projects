import { Form } from "@/components/Form";
import { ButtonUi } from "@/ui/ButtonUi";
import { DashboardFilterColumns } from "@components/DashboardLayout/DashboardForm/DashboardFilterColumns";
import type { DashboardFormCustomProps } from "./types";
import { InputUi } from "@/ui/InputUi";
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
  popularTags,
  handleChangeStatusTags,
  handleDownloadXlsx,
  handleDownloadCsv,
}: DashboardFormCustomProps) {
  const formClassName = "gap-3 grid grid-cols-3";

  return (
    <Form
      onSubmit={handleSubmit(handleSubmitNewFormDashboard)}
      className={formClassName}
      buttons={
        <ButtonUi size="md" variant="primary" type="submit">
          Add
        </ButtonUi>
      }
      buttonsSecondary={
        <DashboardFilterColumns
          columns={columns}
          isOpenFilters={isOpenFilters}
          handleOpenFilters={handleOpenFilters}
          handleChangeStatusColumns={handleChangeStatusColumns}
          valueSort={valueSort}
          setValueSort={setValueSort}
          popularTags={popularTags}
          handleChangeStatusTags={handleChangeStatusTags}
          handleDownloadXlsx={handleDownloadXlsx}
          handleDownloadCsv={handleDownloadCsv}
        />
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
    </Form>
  );
}
