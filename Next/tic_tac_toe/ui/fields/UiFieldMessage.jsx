import clsx from "clsx";

/**
 *
 * @param {
 *  helperText: string,
 *  errorText: string
 * } param
 * @returns
 */

export function UiFieldMessage({ helperText, errorText }) {
  const messageText = errorText || helperText;
  const isError = !!errorText;

  return (
    <p
      className={clsx(
        "mt-1 text-sm",
        isError ? "text-orange-600" : "text-slate-400",
      )}
    >
      {messageText}
    </p>
  );
}
