import { TableRow, TableCell, Typography } from '@mui/material';
import  GradeInputField  from '../gradeInputField/gradeInputField';
import { GradeRowData } from './gradeRow.type';

const GradeRow: React.FC<GradeRowData> = ({ student, grade, onGradeChange }) => {
  const calculateAverage = () => {
    const { p1, exercises, report } = grade;
    if (p1 === null || exercises === null || report === null) return null;
    return ((p1 * 0.5) + (exercises * 0.3) + (report * 0.2)).toFixed(1);
  };

  const average = calculateAverage();

  return (
    <TableRow>
      <TableCell>{student.nomeCompleto}</TableCell>
      {(['p1', 'exercises', 'report'] as const).map((field) => (
        <TableCell align="center" key={field}>
          <GradeInputField
            value={grade[field]}
            onChange={(value) => onGradeChange(field, value)}
          />
        </TableCell>
      ))}
      <TableCell align="center">
        <Typography fontWeight="bold">{average ?? '-'}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default GradeRow;