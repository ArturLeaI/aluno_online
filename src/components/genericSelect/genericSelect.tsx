import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent, 
  SxProps, 
  Theme, 
  FormHelperText,
  Chip,
  Box
} from '@mui/material';

interface SelectOption {
  value: string;
  label: string;
}

interface GenericSelectProps {
  label: string;
  name: string;
  value?: string | string[];
  onChange?: (e: SelectChangeEvent<string | string[]>) => void;
  options: SelectOption[];
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  error?: boolean;
  helperText?: React.ReactNode;
  disabled?: boolean;
  multiple?: boolean;
}

const GenericSelect: React.FC<GenericSelectProps> = ({
  label,
  name,
  value = '',
  onChange,
  options,
  required = false,
  fullWidth = true,
  sx = {},
  error = false,
  helperText,
  disabled = false,
  multiple = false,
  ...props
}) => {
  return (
    <FormControl 
      fullWidth={fullWidth} 
      size="small" 
      sx={{ backgroundColor: '#fff', ...sx }}
      error={error}
      disabled={disabled}
    >
      <InputLabel>{label}{required && ' *'}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label={`${label}${required ? ' *' : ''}`}
        required={required}
        multiple={multiple}
        renderValue={multiple ? (selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {(selected as string[]).map((value) => {
              const option = options.find(opt => opt.value === value);
              return (
                <Chip 
                  key={value} 
                  label={option?.label || value} 
                  size="small"
                />
              );
            })}
          </Box>
        ) : undefined}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default GenericSelect