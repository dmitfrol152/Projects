import clsx from "clsx";

/**
 *
 * @param {{
 *  errorText: string,
 *  value: string,
 *  handleChange: function,
 *  selectArray: array
 *
 * } & import('react').HTMLAttributes<HTMLInputElement>} param
 * @returns
 */

export function UiFieldInput({
  errorText,
  players,
  handleChange,
  selectArray,
}) {
  return (
    // <input
    //   type="email"
    //   id="example2"
    //   className={clsx(
    //     "block w-full rounded-md border shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 py-2 px-2 text-2xl leading-[1.2] focus:ring-opacity-50",
    //     errorText
    //       ? "border-orange-600 focus:ring focus:ring-orange-600/20 focus:border-orange-600"
    //       : "border-slate-200 focus:ring focus:ring-teal-600/20 focus:border-teal-600",
    //   )}
    //   placeholder={placeholder}
    //   {...inputProps}
    // />

    <select
      value={players}
      onChange={(e) => handleChange(Number(e.target.value))}
      className={clsx(
        "block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 p-2",
        errorText
          ? "border-orange-600 focus:ring focus:ring-orange-600/20 focus:border-orange-600"
          : "border-slate-200 focus:ring focus:ring-teal-600/20 focus:border-teal-600",
      )}
    >
      {selectArray.map((item, index) => (
        <option key={index} value={item.valueOption} disabled={item.disabled}>
          {item.valueText}
        </option>
      ))}
    </select>
  );
}
