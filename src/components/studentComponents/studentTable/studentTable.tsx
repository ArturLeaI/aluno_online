import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography} from '@mui/material';
import { Visibility as VisibilityIcon, Add as AddIcon, PictureAsPdf as PdfIcon} from '@mui/icons-material';
import { StudentTableProps } from './studentTable.type';
import { tableHeaderStyles, tableCellBold, iconButtonStyles } from './studentTable.style';

const StudentTable: React.FC<StudentTableProps> = ({
  students, enrollments, grades, page, rowsPerPage,
  onViewDetails, onEnroll, onViewGrades,
  hideActions = false, showViewActions = false
}) => {
  const paginated = students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const colSpan = hideActions && !showViewActions ? 4 : 5;

  const hasGrades = (id: string) =>
    grades.some(g =>
      enrollments.some(e => e.alunoId === id && e.id === g.enrollmentId) &&
      (g.p1 !== null || g.exercises !== null || g.report !== null)
    );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={tableHeaderStyles}>
          <TableRow>
            {['Nome Completo', 'Data Nascimento', 'CPF', 'Sexo'].map((h) => (
              <TableCell key={h} sx={tableCellBold}>{h}</TableCell>
            ))}
            {(showViewActions || !hideActions) && (
              <TableCell sx={tableCellBold} align="center">Ações</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginated.length > 0 ? (
            paginated.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell>{s.nomeCompleto}</TableCell>
                <TableCell>{s.dataNascimento}</TableCell>
                <TableCell>{s.cpf || 'Não informado'}</TableCell>
                <TableCell>{s.sexo || 'Não informado'}</TableCell>
                {(showViewActions || !hideActions) && (
                  <TableCell align="center">
                    <IconButton
                      onClick={() => onViewDetails(s)}
                      aria-label="ver detalhes"
                      color="primary"
                      size="small"
                      sx={iconButtonStyles}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    {!hideActions && !showViewActions && (
                      <IconButton
                        onClick={() => onEnroll(s)}
                        aria-label="matricular"
                        color="secondary"
                        size="small"
                        sx={iconButtonStyles}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => onViewGrades(s)}
                      aria-label="ver notas"
                      color="inherit"
                      size="small"
                      disabled={!hasGrades(s.id)}
                    >
                      <PdfIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={colSpan} align="center" sx={{ py: 4 }}>
                <Typography variant="body1">
                  {students.length === 0
                    ? 'Nenhum aluno cadastrado ainda.'
                    : 'Nenhum aluno encontrado com os filtros atuais.'}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
