import { getHelperExperience } from "@shared/lib/helpers/getHelperExperience";
import { getHelperSalery } from "@shared/lib/helpers/getHelperSalery";
import type { DataProps } from "../types";

export function getHelperArrayNames(vacancy: DataProps) {
  const data = [
    { name: "Employer", value: vacancy.employer.name },
    { name: "City", value: vacancy.area.name },
    { name: "Salary", value: getHelperSalery(vacancy.salary) },
    { name: "Experience", value: getHelperExperience(vacancy.experience.id) },
    {
      name: "Published",
      value: new Date(vacancy.published_at).toLocaleString(),
    },
  ];
  return data;
}
