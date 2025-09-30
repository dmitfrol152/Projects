import { ButtonUi } from "@/ui/ButtonUi";
import IconFilter from "@assets/svg/icon-filter.svg?react";
import type { DashboardFilterColumnsProps } from "./types";
import { SelectUi } from "@/ui/SelectUi/SelectUi";
import { OPTIONS_SORTED } from "@/constants/options";

export function DashboardFilterColumns({
  isOpenFilters,
  columns,
  handleChangeStatusColumns,
  handleOpenFilters,
  valueSort,
  setValueSort,
}: DashboardFilterColumnsProps) {
  return (
    <>
      {isOpenFilters && (
        <SelectUi
          options={OPTIONS_SORTED}
          value={valueSort}
          setValue={setValueSort}
        />
      )}
      {isOpenFilters &&
        columns.map((column, index) => {
          return (
            <ButtonUi
              key={index}
              size="md"
              variant={column.active ? "secondary" : "primary"}
              type="button"
              handleClickButton={() => handleChangeStatusColumns(column)}
            >
              {column.title}
            </ButtonUi>
          );
        })}
      <ButtonUi
        size="icon"
        variant="icon"
        type="button"
        className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        handleClickButton={handleOpenFilters}
      >
        <IconFilter className="w-5 h-5" />
      </ButtonUi>
    </>
  );
}
