import React from 'react';
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import GenericModal from '../genericModal/genericModal';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Student {
  id: string;
  nomeCompleto: string;
  dataNascimento: string;
  cpf?: string;
}

interface Discipline {
  id: string;
  codigo: string;
  nome: string;
}

interface Enrollment {
  id: string;
  disciplinaId: string;
  status: 'ativo' | 'inativo' | 'concluído';
}

interface Grade {
  id: string;
  enrollmentId: string;
  p1: number | null;
  exercises: number | null;
  report: number | null;
}

interface StudentGradesModalProps {
  open: boolean;
  student: Student | null;
  enrollments: Enrollment[];
  grades: Grade[];
  disciplines: Discipline[];
  onClose: () => void;
}

const StudentGradesModal: React.FC<StudentGradesModalProps> = ({
  open,
  student,
  enrollments,
  grades,
  disciplines,
  onClose
}) => {
  const getDisciplineInfo = (id: string) => {
    return disciplines.find(d => d.id === id) || { nome: 'Desconhecida', codigo: 'N/A', professor: 'N/A' };
  };

  const hasGrades = grades.some(g =>
    enrollments.some(e => e.id === g.enrollmentId) &&
    (g.p1 !== null || g.exercises !== null || g.report !== null)
  );

  const generateStudentReport = () => {
    if (!student) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Boletim do Aluno - ${student.nomeCompleto}`, 15, 15);
    doc.setFontSize(12);
    doc.text(`CPF: ${student.cpf || 'Não informado'}`, 15, 25);
    doc.text(`Data de emissão: ${new Date().toLocaleDateString()}`, 15, 35);

    const tableData = grades
      .filter(grade => enrollments.some(e => e.id === grade.enrollmentId))
      .map(grade => {
        const enrollment = enrollments.find(e => e.id === grade.enrollmentId);
        const discipline = enrollment ? getDisciplineInfo(enrollment.disciplinaId) : null;

        const average = grade.p1 !== null && grade.exercises !== null && grade.report !== null
          ? (grade.p1 * 0.5 + grade.exercises * 0.3 + grade.report * 0.2).toFixed(1)
          : 'N/A';

        return [
          discipline?.codigo || 'N/A',
          discipline?.nome || 'Desconhecida',
          grade.p1?.toFixed(1) || 'N/A',
          grade.exercises?.toFixed(1) || 'N/A',
          grade.report?.toFixed(1) || 'N/A',
          average,
          enrollment?.status === 'concluído' ? 'Aprovado' :
            enrollment?.status === 'ativo' ? 'Cursando' : 'Inativo'
        ];
      });

    autoTable(doc, {
      startY: 45,
      head: [['Código', 'Disciplina', 'P1 (50%)', 'Exercícios (30%)', 'Relatório (20%)', 'Média', 'Situação']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255
      },
      styles: {
        cellPadding: 5,
        fontSize: 10,
        halign: 'center'
      },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'left' }
      }
    });

    doc.save(`boletim_${student.nomeCompleto.replace(/\s/g, '_')}.pdf`);
  };

  if (!student) return null;

  return (
    <GenericModal
      open={open}
      onClose={onClose}
      title={`Notas do Aluno - ${student.nomeCompleto}`}
      maxWidth="md"
    >
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1">
            <strong>CPF:</strong> {student.cpf || 'Não informado'}
          </Typography>
          <Typography variant="body1">
            <strong>Data de Nascimento:</strong> {student.dataNascimento}
          </Typography>
        </Box>

        {hasGrades ? (
          <>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Disciplina</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">P1 (50%)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Exercícios (30%)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Relatório (20%)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Média</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Situação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {grades
                    .filter(grade => enrollments.some(e => e.id === grade.enrollmentId))
                    .map((grade) => {
                      const enrollment = enrollments.find(e => e.id === grade.enrollmentId);
                      const discipline = enrollment ? getDisciplineInfo(enrollment.disciplinaId) : null;
                      const average = grade.p1 !== null && grade.exercises !== null && grade.report !== null
                        ? (grade.p1 * 0.5 + grade.exercises * 0.3 + grade.report * 0.2)
                        : null;

                      const situacao = average !== null
                        ? average >= 5 ? 'Aprovado' : 'Reprovado'
                        : enrollment?.status === 'ativo' ? 'Cursando' : 'Inativo';

                      const corSituacao = average !== null
                        ? average >= 5 ? 'success' : 'error'
                        : enrollment?.status === 'ativo' ? 'primary' : 'default';

                      return (
                        <TableRow key={grade.id}>
                          <TableCell>
                            {discipline?.codigo} - {discipline?.nome || 'Desconhecida'}
                          </TableCell>
                          <TableCell align="center">{grade.p1?.toFixed(1) || 'N/A'}</TableCell>
                          <TableCell align="center">{grade.exercises?.toFixed(1) || 'N/A'}</TableCell>
                          <TableCell align="center">{grade.report?.toFixed(1) || 'N/A'}</TableCell>
                          <TableCell align="center">{average?.toFixed(1) || 'N/A'}</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={situacao}
                              color={corSituacao}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={generateStudentReport}
                startIcon={<PdfIcon />}
                sx={{ textTransform: 'none' }}
              >
                Baixar Boletim em PDF
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
            Nenhuma nota lançada para este aluno.
          </Typography>
        )}
      </Box>
    </GenericModal>
  );
};

export default StudentGradesModal;