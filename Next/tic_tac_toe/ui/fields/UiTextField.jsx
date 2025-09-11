/**
 * @param {{
 *
 *  label: string,
 *  helperText: string,
 *  errorText: string,
 *  className: string,
 *  placeholder: string
 *
 * } & import('react').HTMLAttributes<HTMLInputElement>} props
 *
 */

import { UiFieldLabel } from "./UiFieldLabel";
import { UiFieldInput } from "./UiFieldInput";
import { UiFieldMessage } from "./UiFieldMessage";

export function UiTextField({
  label,
  requared,
  helperText,
  errorText,
  className,
  placeholder,
  ...inputProps
}) {
  return (
    <div className={className}>
      <div className="mx-auto max-w-xs">
        <UiFieldLabel label={label} requared />
        <UiFieldInput
          placeholder={placeholder}
          errorText={errorText}
          {...inputProps}
        />
        <UiFieldMessage helperText={helperText} errorText={errorText} />
      </div>
    </div>
  );
}
