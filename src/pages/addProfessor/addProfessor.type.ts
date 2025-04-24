import { FieldValues, Control, FieldErrors } from 'react-hook-form';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormFieldProps {
  name: string;
  control: Control<FieldValues>;
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

export interface ProfessorFormData {
  nomeCompleto: string;
  cpf: string;
  email: string;
  titulacao: string;
  dataNascimento: string;
  sexo: string;
  areaAtuacao: string;
  dataContratacao: string;
  telefone: string;
  celular: string;
  endereco: string;
  cep: string;
}