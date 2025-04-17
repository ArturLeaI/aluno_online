import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

interface Discipline {
  id: string;
  nome: string;
}

interface StudentFiltersProps {
  disciplines: Discipline[];
  onFilterChange: (disciplineId: string) => void;
  onResetFilters: () => void;
}

const StudentFilters: React.FC<StudentFiltersProps> = ({
  disciplines,
  onFilterChange,
  onResetFilters
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDisciplineFilter, setSelectedDisciplineFilter] = useState('');

  const handleDisciplineFilterChange = (value: string) => {
    setSelectedDisciplineFilter(value);
    onFilterChange(value);
  };

  const handleResetFilters = () => {
    setSelectedDisciplineFilter('');
    onResetFilters();
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          endIcon={<FilterIcon />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{ textTransform: 'none' }}
        >
          Filtros
        </Button>
      </Box>

      <Collapse in={showFilters}>
        <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 1 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap'
          }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filtrar por matéria</InputLabel>
              <Select
                value={selectedDisciplineFilter}
                onChange={(e) => handleDisciplineFilterChange(e.target.value as string)}
                label="Filtrar por matéria"
              >
                <MenuItem value="">
                  <em>Todas as matérias</em>
                </MenuItem>
                {disciplines.map(discipline => (
                  <MenuItem key={discipline.id} value={discipline.id}>
                    {discipline.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedDisciplineFilter && (
              <Button
                variant="text"
                color="inherit"
                startIcon={<CloseIcon />}
                onClick={handleResetFilters}
                sx={{ textTransform: 'none' }}
              >
                Limpar filtros
              </Button>
            )}
          </Box>
        </Paper>
      </Collapse>
    </>
  );
};

export default StudentFilters;