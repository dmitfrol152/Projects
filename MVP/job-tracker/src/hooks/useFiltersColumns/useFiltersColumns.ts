import { COLUMNS } from "@/constants/columns";
import type { ColumnsProps } from "@/constants/types";
import { useMemo, useState } from "react";

export function useFiltersColumns() {
  const [columns, setColumns] = useState<ColumnsProps[]>(COLUMNS);
  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);

  function handleOpenFilters() {
    setIsOpenFilters((prev) => !prev);
  }

  function handleChangeStatusColumns(columnKey: ColumnsProps) {
    const newColumns = columns.map((column) =>
      column.key === columnKey.key
        ? { ...column, active: !column.active }
        : column
    );
    setColumns(newColumns);
  }

  const filtredColumnsJobs = useMemo(() => {
    return columns.filter((column) => {
      return column.active;
    });
  }, [columns]);

  return {
    columns,
    setColumns,
    isOpenFilters,
    setIsOpenFilters,
    handleOpenFilters,
    handleChangeStatusColumns,
    filtredColumnsJobs,
  };
}
