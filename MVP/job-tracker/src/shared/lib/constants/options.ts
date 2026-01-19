import type { OptionsProps } from "./types";

export const OPTIONS: OptionsProps[] = [
  { optionValue: "", optionName: "dashboardFormOptionDefaultStatus" },
  { optionValue: "applied", optionName: "dashboardFormOptionAppliedStatus" },
  {
    optionValue: "interview",
    optionName: "dashboardFormOptionInterviewStatus",
  },
  { optionValue: "offer", optionName: "dashboardFormOptionOfferStatus" },
  { optionValue: "rejected", optionName: "dashboardFormOptionRejectedStatus" },
  { optionValue: "washlist", optionName: "dashboardFormOptionWishlistStatus" },
];

export const OPTIONS_SORTED = [
  { optionValue: "", optionName: "dashboardFormOptionDefaultSort" },
  { optionValue: "date", optionName: "dashboardFormOptionDateSort" },
  { optionValue: "company", optionName: "dashboardFormOptionCompanyAscSort" },
  { optionValue: "position", optionName: "dashboardFormOptionPositionAscSort" },
  { optionValue: "default", optionName: "dashboardFormOptionResetSort" },
];

export const OPTIONS_EXPERIENSE = [
  { optionValue: "", optionName: "hhFormOptionsExperienceDefault" },
  {
    optionValue: "noExperience",
    optionName: "hhFormOptionsExperienceNoExperience",
  },
  { optionValue: "between1And3", optionName: "1-3" },
  { optionValue: "between3And6", optionName: "3-6" },
  { optionValue: "moreThan6", optionName: "6+" },
];

export const OPTIONS_SORTED_HH = [
  { optionValue: "", optionName: "hhFormOptionsSortedDefault" },
  {
    optionValue: "publication_time",
    optionName: "hhFormOptionsSortedPublication",
  },
  { optionValue: "salary_desc", optionName: "hhFormOptionsSortedSalaryDesc" },
  { optionValue: "salary_asc", optionName: "hhFormOptionsSortedSalaryAsc" },
  { optionValue: "relevance", optionName: "hhFormOptionsSortedRelevance" },
];

export const OPTIONS_CITIES_HH = [
  { optionValue: "", optionName: "hhFormOptionsLocationDefault" },
  { optionValue: "113", optionName: "hhFormOptionsLocationRussia" },
  { optionValue: "1", optionName: "hhFormOptionsLocationMoscow" },
  { optionValue: "2019", optionName: "hhFormOptionsLocationMoscowReg" },
  { optionValue: "2", optionName: "hhFormOptionsLocationSB" },
];
