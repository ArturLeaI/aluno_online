import React from 'react';
import { TextField } from '@mui/material';
import { GenericTextFieldProps } from './genericTextField.type';

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
      sx={{
        backgroundColor: '#fff',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ccc',
          },
          '&:hover fieldset': {
            borderColor: '#aaa',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
          },
        },
        ...sx
      }}
      InputLabelProps={{
        shrink: type === 'date' ? true : undefined,
        ...InputLabelProps
      }}
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
