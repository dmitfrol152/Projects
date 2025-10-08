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
  popularTags,
  handleChangeStatusTags,
  handleDownloadXlsx,
  handleDownloadCsv,
}: DashboardFilterColumnsProps) {
  return (
    <div className="flex items-end gap-3">
      {isOpenFilters && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <SelectUi
              options={OPTIONS_SORTED}
              value={valueSort}
              setValue={setValueSort}
            />
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
          {popularTags.length > 0 && (
            <div className="flex items-center gap-3">
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
  );
}
