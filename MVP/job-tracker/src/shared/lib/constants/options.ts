import type { OptionsProps } from "./types";

export const OPTIONS: OptionsProps[] = [
  { optionValue: "", optionName: "-- Status by --" },
  { optionValue: "applied", optionName: "Applied" },
  { optionValue: "interview", optionName: "Interview" },
  { optionValue: "offer", optionName: "Offer" },
  { optionValue: "rejected", optionName: "Rejected" },
  { optionValue: "washlist", optionName: "Washlist" },
];

export const OPTIONS_SORTED = [
  { optionValue: "", optionName: "-- Sort by --" },
  { optionValue: "date", optionName: "Date" },
  { optionValue: "company", optionName: "Company (A-Z)" },
  { optionValue: "position", optionName: "Position (A-Z)" },
  { optionValue: "default", optionName: "Default" },
];

export const OPTIONS_EXPERIENSE = [
  { optionValue: "", optionName: "-- Default --" },
  { optionValue: "noExperience", optionName: "No experience" },
  { optionValue: "between1And3", optionName: "1-3" },
  { optionValue: "between3And6", optionName: "3-6" },
  { optionValue: "moreThan6", optionName: "6+" },
];

export const OPTIONS_SORTED_HH = [
  { optionValue: "", optionName: "-- Default --" },
  { optionValue: "publication_time", optionName: "Publication time" },
  { optionValue: "salary_desc", optionName: "Salary desc" },
  { optionValue: "salary_asc", optionName: "Salary asc" },
  { optionValue: "relevance", optionName: "Relevance" },
];

export const OPTIONS_CITIES_HH = [
  { optionValue: "", optionName: "-- Default --" },
  { optionValue: "113", optionName: "Russia" },
  { optionValue: "1", optionName: "Moscow" },
  { optionValue: "2019", optionName: "Moscow reg" },
  { optionValue: "2", optionName: "Saint-Petersburg" },
];
