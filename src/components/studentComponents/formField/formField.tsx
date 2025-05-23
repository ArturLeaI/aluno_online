import React from 'react';
import { FormFieldProps, StudentFormValues } from '../../../pages/addStudent/addStudent.type';
import { selectOptions } from '../../../mock/selectOptionsStudent';
import { Controller } from 'react-hook-form';

export const FormField: React.FC<FormFieldProps> = ({
  name,
  control,
  errors,
  component: Component,
  options,
  ...props
}) => {
  const fieldOptions = options ? selectOptions[options] : undefined;
  
  return (
    <Controller
      name={name as keyof StudentFormValues} 
      control={control}
      rules={props.rules}
      render={({ field }) => (
        <Component
          {...field}
          {...props}
          options={fieldOptions}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          sx={{ flex: 1 }}
        />
      )}
    />
  );
};
