export type FormGroupType = {
  label: string;
  placeholder: string;
  state: string | string[];
  setState: React.SetStateAction<any>;
  rows?: number;
  variant?: 'outlined' | 'standard';
  type?: 'text' | 'password';
};
