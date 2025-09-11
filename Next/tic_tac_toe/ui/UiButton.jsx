import clsx from "clsx";

/**
 *
 * @param {{
 *  childre: any,
 *  className: string,
 *  size: 'lg' | 'md',
 *  variant: 'primary' | 'secondary'
 * }} props
 *
 */

export function UiButton({ children, className, size, variant }) {
  const buttonClassName = clsx(
    "transition",
    className,
    {
      md: "rounded px-6 py-2 text-sm leading-[1.2]",
      lg: "rounded-lg px-5 py-2 text-2xl leading-[1.2]",
    }[size],
    {
      primary: "bg-teal-600 hover:bg-teal-500 text-white",
      secondary: "border border-teal-600 text-teal-600 hover:bg-teal-50",
    }[variant],
  );

  return <button className={buttonClassName}>{children}</button>;
}
