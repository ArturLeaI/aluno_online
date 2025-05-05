import { GenericSelectProps, SelectOption } from '../../genericSelect/genericSelect.type';
import { GenericTextFieldProps } from '../../genericTextField/genericTextField.type';
import { Control, FieldValues, FieldErrors, RegisterOptions } from 'react-hook-form';

type BaseFieldProps = {
  name: string;
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
  label: string;
  fullWidth?: boolean;
  rules?: RegisterOptions; 
};

export type SelectField = BaseFieldProps & {
  fieldType: 'select';
  options: SelectOption[];
  selectProps?: Omit<GenericSelectProps, 'options' | 'label'>;
};

export type TextField = BaseFieldProps & {
  fieldType: 'text';
  textProps?: Omit<GenericTextFieldProps, 'label'>;
  type?: string;
  InputLabelProps?: Record<string, any>;
};

export type FormFieldProps = SelectField | TextField;
