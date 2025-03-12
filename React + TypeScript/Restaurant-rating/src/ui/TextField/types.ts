export interface TextFieldProps {
  type: string;
  value: string | undefined;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
