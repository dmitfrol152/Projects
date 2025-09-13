import clsx from "clsx";

/**
 *
 * @param {{
 *  childre: any,
 *  className: string,
 *  size: 'lg' | 'md',
 *  variant: 'primary' | 'secondary',
 *  handleClick: function,
 *  disabled: boolean,
 *  isError: boolean
 * }} props
 *
 */

export function UiButton({
  children,
  className,
  size,
  variant,
  handleClick,
  isError,
}) {
  const buttonClassName = clsx(
    "transition",
    className,
    {
      md: "rounded px-6 py-2 text-sm leading-[1.2]",
      lg: "rounded-lg px-5 py-2 text-2xl leading-[1.2]",
    }[size],
    {
      primary: clsx("bg-teal-600 text-white", !isError && "hover:bg-teal-500"),
      secondary: clsx(
        "border border-teal-600 text-teal-600",
        !isError && "hover:bg-teal-50",
      ),
    }[variant],
  );

  return (
    <button
      className={buttonClassName}
      onClick={handleClick}
      disabled={isError}
    >
      {children}
    </button>
  );
}
