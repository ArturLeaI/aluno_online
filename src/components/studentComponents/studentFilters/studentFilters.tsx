import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent 
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { StudentFiltersProps } from './studentFilters.type';
import {
  buttonStyles,
  paperStyles,
  filterContainerStyles,
  formControlStyles,
} from './studentFilters.style';

const StudentFilters: React.FC<StudentFiltersProps> = ({
  disciplines,
  onFilterChange,
  onResetFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDisciplineFilter, setSelectedDisciplineFilter] = useState('');

  const toggleFilters = () => setShowFilters((prev) => !prev);

  const handleDisciplineFilterChange = (value: string) => {
    setSelectedDisciplineFilter(value);
    onFilterChange(value);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    handleDisciplineFilterChange(e.target.value);
  };

  const handleResetFilters = () => {
    setSelectedDisciplineFilter('');
    onResetFilters();
  };

  const renderDisciplineOptions = disciplines.map((discipline) => (
    <MenuItem key={discipline.id} value={discipline.id}>
      {discipline.name}
    </MenuItem>
  ));

  const renderClearButton = selectedDisciplineFilter && (
    <Button
      variant="text"
      color="inherit"
      startIcon={<CloseIcon />}
      onClick={handleResetFilters}
      sx={buttonStyles}
    >
      Limpar filtros
    </Button>
  );

  const filterButtonIcon = showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />;

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={filterButtonIcon}
          endIcon={<FilterIcon />}
          onClick={toggleFilters}
          sx={buttonStyles}
        >
          Filtros
        </Button>
      </Box>

      <Collapse in={showFilters}>
        <Paper elevation={2} sx={paperStyles}>
          <Box sx={filterContainerStyles}>
            <FormControl size="small" sx={formControlStyles}>
              <InputLabel>Filtrar por matéria</InputLabel>
              <Select
                value={selectedDisciplineFilter}
                onChange={handleSelectChange}
                label="Filtrar por matéria"
              >
                <MenuItem value="">
                  <em>Todas as matérias</em>
                </MenuItem>
                {renderDisciplineOptions}
              </Select>
            </FormControl>

            {renderClearButton}
          </Box>
        </Paper>
      </Collapse>
    </>
  );
};

export default StudentFilters;
