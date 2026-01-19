import { Form } from "@shared/ui/Form";
import { ButtonUi } from "@shared/ui/ButtonUi";
import type { VacanciesFormFiltersProps } from "./types";
import { InputUi } from "@shared/ui/InputUi";
import { SelectUi } from "@shared/ui/SelectUi";
import {
  OPTIONS_CITIES_HH,
  OPTIONS_EXPERIENSE,
  OPTIONS_SORTED_HH,
} from "@shared/lib/constants/options";
import { useTranslation } from "react-i18next";

export function VacanciesFormFilters({
  handleSubmit,
  handleSubmitFilters,
  handleClearFilter,
  errors,
  register,
  emptyValuesFilter,
}: VacanciesFormFiltersProps) {
  const { t } = useTranslation("hh");

  const formClassName = "gap-3 grid grid-cols-1 md:grid-cols-4";

  return (
    <Form
      onSubmit={handleSubmit(handleSubmitFilters)}
      className={formClassName}
      buttons={
        <>
          <ButtonUi
            size="md"
            variant="primary"
            type="submit"
            disabled={emptyValuesFilter}
          >
            {t("hhFormButtonSave")}
          </ButtonUi>
          <ButtonUi
            size="md"
            variant="secondary"
            type="button"
            handleClickButton={handleClearFilter}
            disabled={emptyValuesFilter}
          >
            {t("hhFormButtonClear")}
          </ButtonUi>
        </>
      }
    >
      <InputUi
        label={t("hhFormLabelSalary")}
        type="number"
        error={errors.salary?.message}
        {...register("salary")}
        placeholder={t("hhFormPlaceholderSalary")}
      />
      <SelectUi
        label={t("hhFormLabelExperience")}
        options={OPTIONS_EXPERIENSE}
        error={errors.experience?.message}
        translation="hh"
        {...register("experience")}
      />
      <SelectUi
        label={t("hhFormLabelLocation")}
        options={OPTIONS_CITIES_HH}
        error={errors.city?.message}
        translation="hh"
        {...register("city")}
      />
      <SelectUi
        label={t("hhFormLabelSorted")}
        options={OPTIONS_SORTED_HH}
        error={errors.orderBy?.message}
        translation="hh"
        {...register("orderBy")}
      />
    </Form>
  );
}
