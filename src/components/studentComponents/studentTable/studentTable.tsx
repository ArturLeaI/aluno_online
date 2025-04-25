import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Visibility as VisibilityIcon, Add as AddIcon, PictureAsPdf as PdfIcon } from '@mui/icons-material';
import { StudentTableProps } from './studentTable.type';
import { tableHeaderStyles, tableCellBold, iconButtonStyles } from './studentTable.style';

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  enrollments,
  grades,
  page,
  rowsPerPage,
  onViewDetails,
  onEnroll,
  onViewGrades,
  hideActions = false,
  showViewActions = false
}) => {
  const hasGrades = (studentId: string) => {
    const studentEnrollments = enrollments.filter(e => e.alunoId === studentId);
    return grades.some(g =>
      studentEnrollments.some(e => e.id === g.enrollmentId) &&
      (g.p1 !== null || g.exercises !== null || g.report !== null)
    );
  };

  const colSpan = hideActions && !showViewActions ? 4 : 5;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={tableHeaderStyles}>
          <TableRow>
            <TableCell sx={tableCellBold}>Nome Completo</TableCell>
            <TableCell sx={tableCellBold}>Data Nascimento</TableCell>
            <TableCell sx={tableCellBold}>CPF</TableCell>
            <TableCell sx={tableCellBold}>Sexo</TableCell>
            {(showViewActions || !hideActions) && (
              <TableCell sx={tableCellBold} align="center">Ações</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length > 0 ? (
            students
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (
                <TableRow
                  key={student.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{student.nomeCompleto}</TableCell>
                  <TableCell>{student.dataNascimento}</TableCell>
                  <TableCell>{student.cpf || 'Não informado'}</TableCell>
                  <TableCell>{student.sexo || 'Não informado'}</TableCell>
                  {(showViewActions || !hideActions) && (
                    <TableCell align="center">
                      <IconButton
                        onClick={() => onViewDetails(student)}
                        aria-label="ver detalhes"
                        color="primary"
                        size="small"
                        sx={iconButtonStyles}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>

                      {!hideActions && !showViewActions && (
                        <IconButton
                          onClick={() => onEnroll(student)}
                          aria-label="matricular"
                          color="secondary"
                          size="small"
                          sx={iconButtonStyles}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      )}

                      <IconButton
                        onClick={() => onViewGrades(student)}
                        aria-label="ver notas"
                        color="inherit"
                        size="small"
                        disabled={!hasGrades(student.id)}
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
