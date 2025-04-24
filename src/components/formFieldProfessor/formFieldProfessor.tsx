// src/pages/addProfessor/components/FormField.tsx
import React from 'react';
import { FormFieldProps } from '../../pages/addProfessor/addProfessor.type';
import { selectOptions } from '../../pages/addProfessor/addProfessor.utils';
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
      name={name}
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