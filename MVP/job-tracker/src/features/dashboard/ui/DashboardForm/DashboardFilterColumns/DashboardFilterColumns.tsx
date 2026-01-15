import { ButtonUi } from "@shared/ui/ButtonUi";
import IconFilter from "@shared/assets/svg/icon-filter.svg?react";
import type { DashboardFilterColumnsProps } from "./types";
import { SelectUi } from "@shared/ui/SelectUi";
import { OPTIONS_SORTED } from "@shared/lib/constants/options";

export function DashboardFilterColumns({
  isOpenFilters,
  columns,
  handleChangeStatusColumns,
  handleOpenFilters,
  valueSort,
  setValueSort,
  popularTags,
  handleChangeStatusTags,
  handleDownloadXlsx,
  handleDownloadCsv,
}: DashboardFilterColumnsProps) {
  return (
    <div className="flex flex-col items-end gap-3 w-full sm:flex-row sm:w-auto">
      {isOpenFilters && (
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <div className="flex flex-col items-center gap-3 xl:flex-row">
            <div className="w-full xl:w-auto">
              <SelectUi
                options={OPTIONS_SORTED}
                value={valueSort}
                setValue={setValueSort}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {columns.map((column, index) => {
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
            </div>
          </div>
          {popularTags.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <span>Sorted by popular tags: </span>
              {popularTags.map((tag, index) => {
                if (index > 2) return null;

                return (
                  <ButtonUi
                    key={index}
                    size="md"
                    variant={tag.active ? "primary" : "secondary"}
                    type="button"
                    handleClickButton={() =>
                      handleChangeStatusTags({ ...tag, active: !tag.active })
                    }
                  >
                    {tag.tagName}
                  </ButtonUi>
                );
              })}
            </div>
          )}
        </div>
      )}
      <div className="flex items-end gap-3">
        <ButtonUi
          size="icon"
          variant="icon"
          type="button"
          className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          handleClickButton={handleOpenFilters}
        >
          <IconFilter className="w-5 h-5" />
        </ButtonUi>
        <ButtonUi
          size="icon"
          variant="icon"
          type="button"
          className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          handleClickButton={handleDownloadXlsx}
        >
          xlsx
        </ButtonUi>
        <ButtonUi
          size="icon"
          variant="icon"
          type="button"
          className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          handleClickButton={handleDownloadCsv}
        >
          csv
        </ButtonUi>
      </div>
    </div>
  );
}
