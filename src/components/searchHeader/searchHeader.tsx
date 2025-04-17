import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import AddButton from '../addButtonStudent/addButtonStudent';

interface SearchHeaderProps {
  termoBusca: string;
  onSearchChange: (value: string) => void;
}

const SearchHeader = ({ termoBusca, onSearchChange }: SearchHeaderProps) => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
    width: '100%',
    gap: 2
  }}>
    <TextField
      placeholder="Buscar professores..."
      variant="outlined"
      size="small"
      value={termoBusca}
      onChange={(e) => onSearchChange(e.target.value)}
      sx={{ flexGrow: 1, maxWidth: 500 }}
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

    <AddButton
      routePath="/adicionar-professor"
      buttonText="Adicionar Professor"
    />
  </Box>
);

export default SearchHeader