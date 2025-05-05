import { Table, TableHead, TableRow, TableBody, TableContainer, TableCell } from '@mui/material';
import GradeRow from '../gradeRow/gradeRow';
import { GradeRowData } from './gradesTabe.type';

interface GradesTableProps {
  rows: GradeRowData[];
}

const TABLE_HEADERS = [
  { id: 'student', label: 'Aluno', align: 'left' },
  { id: 'p1', label: 'P1 (50%)', align: 'center' },
  { id: 'exercises', label: 'Exercícios (30%)', align: 'center' },
  { id: 'report', label: 'Relatório (20%)', align: 'center' },
  { id: 'average', label: 'Média', align: 'center' }
] as const;

const TableHeader = () => (
  <TableRow>
    {TABLE_HEADERS.map((header) => (
      <TableCell key={header.id} align={header.align}>
        {header.label}
      </TableCell>
    ))}
  </TableRow>
);

const EmptyState = () => (
  <TableRow>
    <TableCell colSpan={TABLE_HEADERS.length} align="center">
      Nenhum aluno matriculado nesta disciplina
    </TableCell>
  </TableRow>
);

const GradesTableBody = ({ rows }: { rows: GradeRowData[] }) => (
  <>
    {rows.map((row) => (
      <GradeRow key={row.student.id} {...row} />
    ))}
  </>
);

const GradesTable: React.FC<GradesTableProps> = ({ rows }) => {
  const hasRows = rows.length > 0;

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableHeader />
        </TableHead>
        <TableBody>
          {hasRows ? <GradesTableBody rows={rows} /> : <EmptyState />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GradesTable;