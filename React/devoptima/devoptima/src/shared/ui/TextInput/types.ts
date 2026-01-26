type Type = "button" | "submit" | "email";

export interface TextInputProps {
  type: Type;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
