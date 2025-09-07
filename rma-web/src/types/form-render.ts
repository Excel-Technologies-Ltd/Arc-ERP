export type InputType = 'text' | 'number' | 'password' | 'email' | 'select' | string;

export type FormField = {
  type: InputType;
  name: string;
  label: string;
  placeholder: string;
  options?: { value: string; label: string }[];
};
