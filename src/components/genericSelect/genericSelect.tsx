import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Chip, Box } from '@mui/material';
import { GenericSelectProps } from './genericSelect.type';

const renderChips = (selected: string[], options: {value: string, label: string}[]) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
    {selected.map((value) => {
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
);

const renderMenuItems = (options: {value: string, label: string}[]) => 
  options.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

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
  const renderValue = multiple 
    ? (selected: unknown) => renderChips(selected as string[], options)
    : undefined;

  const labelWithAsterisk = `${label}${required ? ' *' : ''}`;

  return (
    <FormControl
      fullWidth={fullWidth}
      size="small"
      sx={{ backgroundColor: '#fff', ...sx }}
      error={error}
      disabled={disabled}
    >
      <InputLabel>{labelWithAsterisk}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label={labelWithAsterisk}
        required={required}
        multiple={multiple}
        renderValue={renderValue}
        {...props}
      >
        {renderMenuItems(options)}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default GenericSelect;