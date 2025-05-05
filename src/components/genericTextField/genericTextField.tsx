import React from 'react';
import { TextField } from '@mui/material';
import { GenericTextFieldProps } from './genericTextField.type';
import { styles } from './genericTextField.style';

const GenericTextField: React.FC<GenericTextFieldProps> = ({
  label,
  name,
  value = '',
  onChange,
  required = false,
  type = 'text',
  fullWidth = true,
  sx = {},
  InputLabelProps = {},
  error = false,
  helperText,
  disabled = false,
  multiline = false,
  rows = 4,
  placeholder,
  autoFocus = false,
  inputProps = {},
  ...props
}) => {
  const mergedInputLabelProps = {
    shrink: type === 'date' ? true : undefined,
    ...InputLabelProps
  };

  const mergedSx = {
    ...styles.root,
    ...sx
  };

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      type={type}
      fullWidth={fullWidth}
      variant="outlined"
      size="small"
      sx={mergedSx}
      InputLabelProps={mergedInputLabelProps}
      error={error}
      helperText={helperText}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      autoFocus={autoFocus}
      inputProps={inputProps}
      {...props}
    />
  );
};

export default GenericTextField;