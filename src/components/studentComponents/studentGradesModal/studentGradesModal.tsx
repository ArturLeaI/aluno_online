import React from 'react';
import {  Box,  Button,  Chip,  Paper,  Table,  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,  Typography} from '@mui/material';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import GenericModal from '../../genericModal/genericModal';
import { StudentGradesModalProps } from './studentGradesModal.type';
import {  buttonStyles,  tableHeaderStyles,  tableCellBold,  chipStyles } from './studentGradesModal.style';

const COLUMNS = [
  { key: 'p1', label: 'P1 (50%)' },
  { key: 'exercises', label: 'Exercícios (30%)' },
  { key: 'report', label: 'Relatório (20%)' },
  { key: 'average', label: 'Média' },
  { key: 'status', label: 'Situação' },
] as const;

type ColumnKey = typeof COLUMNS[number]['key'];
type ChipColor = 'success' | 'error' | 'primary' | 'default';

const getDisciplineInfo = (id: string, disciplines: StudentGradesModalProps['disciplines']) =>
  disciplines.find((d) => d.id === id) || { name: 'Desconhecida', codigo: 'N/A' };

const calculateAverage = (p1: number | null, exercises: number | null, report: number | null) => {
  const grades = [p1, exercises, report];
  return grades.every(grade => grade !== null) 
    ? parseFloat((p1! * 0.5 + exercises! * 0.3 + report! * 0.2).toFixed(1))
    : null;
};

const getStatus = (
  average: number | null,
  enrollmentStatus?: string
): { label: string; color: ChipColor } => {
  if (average !== null) {
    return {
      label: average >= 5 ? 'Aprovado' : 'Reprovado',
      color: average >= 5 ? 'success' : 'error'
    };
  }
  return {
    label: enrollmentStatus === 'ativo' ? 'Cursando' : 'Inativo',
    color: enrollmentStatus === 'ativo' ? 'primary' : 'default'
  };
};

const gradeRenderers: Record<ColumnKey, (grade: any, avg: number | null, status: any) => React.ReactNode> = {
  p1: (grade) => grade.p1?.toFixed(1) || 'N/A',
  exercises: (grade) => grade.exercises?.toFixed(1) || 'N/A',
  report: (grade) => grade.report?.toFixed(1) || 'N/A',
  average: (_, avg) => avg?.toFixed(1) || 'N/A',
  status: (_, __, status) => <Chip label={status.label} color={status.color} size="small" sx={chipStyles} />
};

const renderGradeValue = (key: ColumnKey, grade: any, avg: number | null, status: any) => 
  gradeRenderers[key]?.(grade, avg, status) || 'N/A';

const GradeRow: React.FC<{
  grade: StudentGradesModalProps['grades'][0];
  enrollments: StudentGradesModalProps['enrollments'];
  disciplines: StudentGradesModalProps['disciplines'];
}> = ({ grade, enrollments, disciplines }) => {
  const enrollment = enrollments.find((e) => e.id === grade.enrollmentId);
  const discipline = enrollment ? getDisciplineInfo(enrollment.disciplinaId, disciplines) : null;
  const avg = calculateAverage(grade.p1, grade.exercises, grade.report);
  const status = getStatus(avg, enrollment?.status);

  return (
    <TableRow key={grade.id}>
      <TableCell>
        {discipline?.codigo} - {discipline?.name || 'Desconhecida'}
      </TableCell>
      {COLUMNS.map((col) => (
        <TableCell key={col.key} align="center">
          {renderGradeValue(col.key, grade, avg, status)}
        </TableCell>
      ))}
    </TableRow>
  );
};

const GradesTable: React.FC<{
  grades: StudentGradesModalProps['grades'];
  enrollments: StudentGradesModalProps['enrollments'];
  disciplines: StudentGradesModalProps['disciplines'];
}> = ({ grades, enrollments, disciplines }) => (
  <TableContainer component={Paper} sx={{ mb: 3 }}>
    <Table size="small">
      <TableHead sx={tableHeaderStyles}>
        <TableRow>
          <TableCell sx={tableCellBold}>Disciplina</TableCell>
          {COLUMNS.map((col) => (
            <TableCell key={col.key} sx={tableCellBold} align="center">
              {col.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {grades
          .filter((grade) => enrollments.some((e) => e.id === grade.enrollmentId))
          .map((grade) => (
            <GradeRow 
              key={grade.id} 
              grade={grade} 
              enrollments={enrollments} 
              disciplines={disciplines} 
            />
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const StudentGradesModal: React.FC<StudentGradesModalProps> = ({ 
  open, 
  student, 
  enrollments, 
  grades, 
  disciplines, 
  onClose 
}) => {
  const generateStudentReport = () => {
    const doc = new jsPDF();
    const tableData = grades
      .filter((grade) => enrollments.some((e) => e.id === grade.enrollmentId))
      .map((grade) => {
        const enrollment = enrollments.find((e) => e.id === grade.enrollmentId);
        const discipline = enrollment ? getDisciplineInfo(enrollment.disciplinaId, disciplines) : null;
        const average = calculateAverage(grade.p1, grade.exercises, grade.report);
        const status = getStatus(average, enrollment?.status).label;

        return [
          discipline?.codigo || 'N/A',
          discipline?.name || 'Desconhecida',
          grade.p1?.toFixed(1) || 'N/A',
          grade.exercises?.toFixed(1) || 'N/A',
          grade.report?.toFixed(1) || 'N/A',
          average?.toFixed(1) || 'N/A',
          status,
        ];
      });

    doc.setFontSize(18);
    doc.text(`Boletim do Aluno - ${student?.nomeCompleto}`, 15, 15);
    doc.setFontSize(12);
    doc.text(`CPF: ${student?.cpf || 'Não informado'}`, 15, 25);
    doc.text(`Data de emissão: ${new Date().toLocaleDateString()}`, 15, 35);

    autoTable(doc, {
      startY: 45,
      head: [['Código', 'Disciplina', ...COLUMNS.map((col) => col.label)]],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { cellPadding: 5, fontSize: 10, halign: 'center' },
      columnStyles: { 0: { halign: 'left' }, 1: { halign: 'left' } },
    });

    doc.save(`boletim_${student?.nomeCompleto.replace(/\s/g, '_')}.pdf`);
  };

  if (!student) return null;

  const hasGrades = grades.some(
    (g) => enrollments.some((e) => e.id === g.enrollmentId) &&
    [g.p1, g.exercises, g.report].some(grade => grade !== null)
  );

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
            <GradesTable grades={grades} enrollments={enrollments} disciplines={disciplines} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={generateStudentReport}
                startIcon={<PdfIcon />}
                sx={buttonStyles}
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