import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { DisciplinesTableProps } from './disciplinesTable.type';
import { Discipline } from '../../pages/diciplinePage/diciplinePage.type';

const tableHeaders = [
  { id: 'codigo', label: 'Código' },
  { id: 'nome', label: 'Nome' },
  { id: 'cargaHoraria', label: 'Carga Horária' },
  { id: 'professor', label: 'Professor' },
  { id: 'acoes', label: 'Ações', align: 'center' }
];

const renderTableHeaders = () => (
  <TableRow>
    {tableHeaders.map((header) => (
      <TableCell 
        key={header.id}
        sx={{ fontWeight: 'bold' }}
        align={header.align as any}
      >
        {header.label}
      </TableCell>
    ))}
  </TableRow>
);

const renderEmptyRow = (disciplinesCount: number) => (
  <TableRow>
    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
      <Typography variant="body1">
        {disciplinesCount === 0
          ? 'Nenhuma disciplina cadastrada ainda.'
          : 'Nenhuma disciplina encontrada com os filtros atuais.'}
      </Typography>
    </TableCell>
  </TableRow>
);

const renderDisciplineRow = (discipline: Discipline, onOpenModal: (discipline: Discipline) => void) => (
  <TableRow
    key={discipline.id}
    hover
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell>{discipline.codigo}</TableCell>
    <TableCell>{discipline.name}</TableCell>
    <TableCell>{discipline.cargaHoraria}</TableCell>
    <TableCell>{discipline.professor}</TableCell>
    <TableCell align="center">
      <IconButton
        onClick={() => onOpenModal(discipline)}
        aria-label="ver detalhes"
        color="primary"
        size="small"
      >
        <VisibilityIcon fontSize="small" />
      </IconButton>
    </TableCell>
  </TableRow>
);

const DisciplinesTable = ({
  disciplines,
  page,
  rowsPerPage,
  onOpenModal
}: DisciplinesTableProps) => {
  const paginatedDisciplines = disciplines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const hasDisciplines = paginatedDisciplines.length > 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="disciplines table">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          {renderTableHeaders()}
        </TableHead>
        <TableBody>
          {hasDisciplines 
            ? paginatedDisciplines.map((discipline) => renderDisciplineRow(discipline, onOpenModal))
            : renderEmptyRow(disciplines.length)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisciplinesTable;