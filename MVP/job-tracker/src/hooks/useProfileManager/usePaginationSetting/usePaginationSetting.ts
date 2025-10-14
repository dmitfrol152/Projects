import { useState, useEffect } from "react";

export function usePaginationSetting() {
  const [paginationModel, setPagintaionModel] = useState<string>(() => {
    try {
      const data = localStorage.getItem("jobtracker:pagination");
      return data ? data : "scroll";
    } catch {
      return "buttons";
    }
  });

  useEffect(() => {
    localStorage.setItem("jobtracker:pagination", paginationModel);
  }, [paginationModel]);

  const togglePaginationModel = () =>
    setPagintaionModel((prev) => (prev === "buttons" ? "scroll" : "buttons"));

  return { paginationModel, togglePaginationModel };
}
