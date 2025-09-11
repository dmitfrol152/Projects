import clsx from "clsx";

/**
 *
 * @param {
 *  label: string,
 *  requared?: boolean
 * } param
 * @returns
 */

export function UiFieldLabel({ label, requared }) {
  if (!label) {
    return null;
  }

  return (
    <label
      htmlFor="example2"
      className={clsx(
        requared && 'after:text-orange-600 after:content-["*"]',
        "mb-1 block text-sm font-medium text-slate-900 after:ml-0.5",
      )}
    >
      {label}
    </label>
  );
}
