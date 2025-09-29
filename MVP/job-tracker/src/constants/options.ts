import type { OptionsProps } from "./types";

export const OPTIONS: OptionsProps[] = [
  { optionValue: "", optionName: "-- Status by --" },
  { optionValue: "applied", optionName: "Applied" },
  { optionValue: "interview", optionName: "Interview" },
  { optionValue: "offer", optionName: "Offer" },
  { optionValue: "rejected", optionName: "Rejected" },
];

export const OPTIONS_SORTED = [
  { optionValue: "", optionName: "-- Sort by --" },
  { optionValue: "date", optionName: "Date" },
  { optionValue: "company", optionName: "Company (A-Z)" },
  { optionValue: "position", optionName: "Position (A-Z)" },
  { optionValue: "default", optionName: "Default" },
];
