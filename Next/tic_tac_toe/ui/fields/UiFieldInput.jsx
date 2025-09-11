import clsx from "clsx";

/**
 *
 * @param {{
 *  errorText: string,
 *  placeholder: string
 * } & import('react').HTMLAttributes<HTMLInputElement>} param
 * @returns
 */

export function UiFieldInput({ errorText, placeholder, ...inputProps }) {
  return (
    <input
      type="email"
      id="example2"
      className={clsx(
        "block w-full rounded-md border shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 py-2 px-2 text-2xl leading-[1.2] focus:ring-opacity-50",
        errorText
          ? "border-orange-600 focus:ring focus:ring-orange-600/20 focus:border-orange-600"
          : "border-slate-200 focus:ring focus:ring-teal-600/20 focus:border-teal-600",
      )}
      placeholder={placeholder}
      {...inputProps}
    />
  );
}
