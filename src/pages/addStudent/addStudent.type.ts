import {  Control, FieldErrors } from 'react-hook-form';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormFieldProps {
  name: string;
  control: Control<StudentFormValues>;
  errors: FieldErrors;
  component: React.ComponentType<any>;
  label: string;
  options?: string;
  rules?: any;
  fullWidth?: boolean;
  type?: string;
  InputLabelProps?: any;
}

export interface FieldGroup {
  fields: Omit<FormFieldProps, 'control' | 'errors'>[];
  direction?: 'row' | 'column';
}

export interface StudentFormValues {
  name: string;
  nomePai: string;
  nomeMae: string;
  dataNascimento: string;
  sexo: string;
  estadoNascimento: string;
  municipioNascimento: string;
  racaCor: string;
  tipoEscola: string;
  estadoCivil: string;
  nacionalidade: string;
  cpf: string;
  contato: string;
}

