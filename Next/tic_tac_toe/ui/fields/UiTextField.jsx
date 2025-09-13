/**
 * @param {{
 *
 *  label: string,
 *  helperText: string,
 *  errorText: string,
 *  className: string,
 *  players: number,
 *  handleChange: function,
 *  selectArray: array
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
  players,
  handleChange,
  selectArray,
}) {
  return (
    <div className={className}>
      <UiFieldLabel label={label} requared={requared} />
      <UiFieldInput
        value={players}
        handleChange={handleChange}
        errorText={errorText}
        selectArray={selectArray}
      />
      <UiFieldMessage helperText={helperText} errorText={errorText} />
    </div>
  );
}
