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

export function VacanciesFormFilters({
  handleSubmit,
  handleSubmitFilters,
  handleClearFilter,
  errors,
  register,
  emptyValuesFilter,
}: VacanciesFormFiltersProps) {
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
            Save
          </ButtonUi>
          <ButtonUi
            size="md"
            variant="secondary"
            type="button"
            handleClickButton={handleClearFilter}
            disabled={emptyValuesFilter}
          >
            Clear
          </ButtonUi>
        </>
      }
    >
      <InputUi
        label="Salery from:"
        type="number"
        error={errors.salary?.message}
        {...register("salary")}
        placeholder="Enter salery from..."
      />
      <SelectUi
        label="Experience is:"
        options={OPTIONS_EXPERIENSE}
        error={errors.experience?.message}
        {...register("experience")}
      />
      <SelectUi
        label="Location is:"
        options={OPTIONS_CITIES_HH}
        error={errors.city?.message}
        {...register("city")}
      />
      <SelectUi
        label="Sorted by:"
        options={OPTIONS_SORTED_HH}
        error={errors.orderBy?.message}
        {...register("orderBy")}
      />
    </Form>
  );
}
