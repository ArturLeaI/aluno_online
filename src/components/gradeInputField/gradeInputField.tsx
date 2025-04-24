import { TextField } from '@mui/material';
import { GradeInputFieldProps } from './gradeInputField.type';

const GradeInputField: React.FC<GradeInputFieldProps> = ({ value, onChange }) => {
  return (
    <TextField
      type="number"
      inputProps={{ min: 0, max: 10, step: 0.1 }}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{ width: 80 }}
    />
  );
};

export default GradeInputField;