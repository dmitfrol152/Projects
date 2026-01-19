import { Form } from "@shared/ui/Form";
import { ButtonUi } from "@shared/ui/ButtonUi";
import { DashboardFilterColumns } from "@features/dashboard/ui/DashboardForm/DashboardFilterColumns";
import type { DashboardFormCustomProps } from "./types";
import { InputUi } from "@shared/ui/InputUi";
import { SelectUi } from "@shared/ui/SelectUi";
import { OPTIONS } from "@shared/lib/constants/options";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("dashboard");

  const formClassName = "gap-3 grid grid-cols-1 xl:grid-cols-3";

  return (
    <Form
      onSubmit={handleSubmit(handleSubmitNewFormDashboard)}
      className={formClassName}
      buttons={
        <ButtonUi size="md" variant="primary" type="submit">
          {t("dashboardFormButtonAdd")}
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
        label={t("dashboardFormLabelPosition")}
        type="text"
        placeholder={t("dashboardFormPlaceholderPosition")}
        error={errors.position?.message}
        {...register("position")}
      />
      <InputUi
        label={t("dashboardFormLabelCompany")}
        type="text"
        placeholder={t("dashboardFormPlaceholderCompany")}
        error={errors.company?.message}
        {...register("company")}
      />
      <SelectUi
        label={t("dashboardFormLabelStatus")}
        options={OPTIONS}
        error={errors.status?.message}
        translation="dashboard"
        {...register("status")}
      />
    </Form>
  );
}
