export function getHelperSalery(
  salary: { from: number | null; to: number | null } | null
) {
  if (!salary || (!salary.from && !salary.to)) {
    return "-";
  }

  if (salary.from && salary.to) {
    return `${salary.from} - ${salary.to}`;
  }

  if (salary.from) {
    return `from ${salary.from}`;
  }

  if (salary.to) {
    return `to ${salary.to}`;
  }

  return "-";
}
