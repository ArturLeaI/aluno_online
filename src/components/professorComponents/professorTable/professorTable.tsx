import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { ProfessoresTableProps, TableHeader, Professor } from './professorTable.type';
import { JSX } from 'react';

const tableHeaders: TableHeader[] = [
  { id: 'nome', label: 'Nome' },
  { id: 'cpf', label: 'CPF' },
  { id: 'email', label: 'Email' },
  { id: 'titulacao', label: 'Titulação' },
  { id: 'acoes', label: 'Ações', align: 'center' }
];

const getEmptyStateMessage = (professoresCount: number): string => 
  professoresCount === 0 
    ? 'Nenhum professor cadastrado ainda.' 
    : 'Nenhum professor encontrado com os filtros atuais.';

const ProfessoresTable: React.FC<ProfessoresTableProps> = ({
  professores,
  pagina,
  linhasPorPagina,
  onAbrirModal
}) => {
  const professoresPaginados: Professor[] = professores.slice(
    pagina * linhasPorPagina, 
    pagina * linhasPorPagina + linhasPorPagina
  );

  const renderTableHeaders = (): JSX.Element => (
    <TableRow>
      {tableHeaders.map((header: TableHeader) => (
        <TableCell 
          key={header.id} 
          sx={{ fontWeight: 'bold' }} 
          align={header.align}
        >
          {header.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const renderProfessorRows = (): JSX.Element[] => 
    professoresPaginados.map((professor: Professor) => (
      <TableRow
        key={professor.id}
        hover
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>{professor.nomeCompleto}</TableCell>
        <TableCell>{professor.cpf}</TableCell>
        <TableCell>{professor.email}</TableCell>
        <TableCell>{professor.titulacao}</TableCell>
        <TableCell align="center">
          <IconButton
            onClick={() => onAbrirModal(professor)}
            aria-label="ver detalhes"
            color="primary"
            size="small"
            sx={{ mr: 1 }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

  const renderTableContent = (): JSX.Element | JSX.Element[] => {
    if (professoresPaginados.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeaders.length} align="center" sx={{ py: 4 }}>
            <Typography variant="body1">
              {getEmptyStateMessage(professores.length)}
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
    return renderProfessorRows();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tabela de professores">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          {renderTableHeaders()}
        </TableHead>
        <TableBody>
          {renderTableContent()}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfessoresTable;