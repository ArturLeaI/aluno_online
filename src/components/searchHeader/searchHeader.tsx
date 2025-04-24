import React from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import AddButton from '../addButtonStudent/addButtonStudent';
import { SearchHeaderProps } from './searchHeader.type';
import { containerStyle, textFieldStyle } from './searchHeader.style';

const SearchHeader: React.FC<SearchHeaderProps> = ({ 
  termoBusca, 
  onSearchChange, 
  placeholder = "Buscar...",
  showAddButton = true,
  addButtonPath = "",
  addButtonText = "Adicionaraa"
}) => (
  <Box sx={containerStyle}>
    <TextField
      placeholder={placeholder}
      variant="outlined"
      size="small"
      value={termoBusca}
      onChange={(e) => onSearchChange(e.target.value)}
      sx={textFieldStyle}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: termoBusca && (
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => onSearchChange('')}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

    {showAddButton && (
      <AddButton
        routePath={addButtonPath}
        buttonText={addButtonText}
      />
    )}
  </Box>
);

export default SearchHeader
