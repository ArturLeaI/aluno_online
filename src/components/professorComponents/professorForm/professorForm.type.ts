import { Control, FieldErrors, FieldValues } from 'react-hook-form';

export interface ProfessorFormData extends FieldValues {
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    sexo: string;
    email: string;
    titulacao: string;
    areaAtuacao: string;
    dataContratacao: string;
    telefone?: string;
    celular?: string;
    endereco?: string;
    cep?: string;
}

export type ProfessorFieldName = keyof ProfessorFormData & string;

export interface FormFieldProps {
    name: ProfessorFieldName;
    label: string;
    type: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    component: React.ComponentType<any>;
}

export interface FieldGroup {
    direction: 'row' | 'column';
    fields: FormFieldProps[];
}

export interface ProfessorFormProps {
    control: Control<ProfessorFormData>;
    errors: FieldErrors<ProfessorFormData>;
    onSubmit: () => void;
    onCancel: () => void;
}