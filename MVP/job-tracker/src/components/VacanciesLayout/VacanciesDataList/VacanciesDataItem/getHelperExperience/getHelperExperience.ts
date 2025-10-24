export function getHelperExperience(id: string) {
  switch (id) {
    case "noExperience":
      return "no experience";
    case "between1And3":
      return "1-3";
    case "between3And6":
      return "3-6";
    case "moreThan6":
      return "6+";
    default:
      return "-";
  }
}
