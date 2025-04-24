import { GenericSelectProps, SelectOption } from '../genericSelect/genericSelect.type';
import { GenericTextFieldProps } from '../genericTextField/genericTextField.type';

type BaseFieldProps = {
  name: string;
  control: any;
  errors: any;
  label: string;
  fullWidth?: boolean;
  rules?: any;
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
  InputLabelProps?: any;
};

export type FormFieldProps = SelectField | TextField;