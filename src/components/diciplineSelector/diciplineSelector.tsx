import { TextField } from '@mui/material';
import { DisciplineSelectorProps } from './diciplineSelector.type';

const DisciplineSelector: React.FC<DisciplineSelectorProps> = ({ 
  disciplines, 
  value, 
  onChange 
}) => {
  return (
    <TextField
      select
      label="Selecione a Disciplina"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      SelectProps={{ native: true }}
      variant="outlined"
      size="small"
    >
      <option value=""></option>
      {disciplines.map((discipline) => (
        <option key={discipline.id} value={discipline.id}>
          {discipline.name} - {discipline.codigo}
        </option>
      ))}
    </TextField>
  );
};

export default DisciplineSelector;