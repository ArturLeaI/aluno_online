import { Table, TableHead,TableRow,  TableBody, TableContainer, TableCell } from '@mui/material';
import GradeRow from '../gradeRow/gradeRow';
import { GradeRowData } from './gradesTabe.type';

interface GradesTableProps {
  rows: GradeRowData[];
}

const GradesTable: React.FC<GradesTableProps> = ({ rows }) => {
  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Aluno</TableCell>
            <TableCell align="center">P1 (50%)</TableCell>
            <TableCell align="center">Exercícios (30%)</TableCell>
            <TableCell align="center">Relatório (20%)</TableCell>
            <TableCell align="center">Média</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => <GradeRow key={row.student.id} {...row} />)
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Nenhum aluno matriculado nesta disciplina
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GradesTable;