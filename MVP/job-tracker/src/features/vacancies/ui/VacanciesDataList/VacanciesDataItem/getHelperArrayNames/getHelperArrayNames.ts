import { getHelperExperience } from "@shared/lib/helpers/getHelperExperience";
import { getHelperSalary } from "@shared/lib/helpers/getHelperSalary";
import type { DataProps } from "../types";

export function getHelperArrayNames(vacancy: DataProps) {
  const data = [
    { name: "Employer", value: vacancy.employer.name },
    { name: "City", value: vacancy.area.name },
    { name: "Salary", value: getHelperSalary(vacancy.salary) },
    { name: "Experience", value: getHelperExperience(vacancy.experience.id) },
    {
      name: "Published",
      value: new Date(vacancy.published_at).toLocaleString(),
    },
  ];
  return data;
}
