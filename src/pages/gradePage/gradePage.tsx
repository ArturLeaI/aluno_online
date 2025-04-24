import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { DisciplineSelector, GradesTable } from '../../components';
import * as Stores from '../../store';
import * as Styles from './gradePage.style';
import { GradeInput } from './gradePage.type';

const GradesPage: React.FC = () => {
  const { students } = Stores.useStudentStore();
  const { disciplines } = Stores.useDisciplineStore();
  const { enrollments, getEnrollmentsByDiscipline } = Stores.useEnrollmentStore();
  const { grades, saveGrade, updateGrade, getGradesByEnrollment } = Stores.useGradeStore();

  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [gradeInputs, setGradeInputs] = useState<GradeInput[]>([]);

  useEffect(() => {
    if (!selectedDiscipline) return setGradeInputs([]);
    
    const disciplineEnrollments = getEnrollmentsByDiscipline(selectedDiscipline);
    const gradesData = disciplineEnrollments.map(({ alunoId, id }) => {
      const { p1 = null, exercises = null, report = null } = getGradesByEnrollment(id) || {};
      return { studentId: alunoId, p1, exercises, report };
    });

    setGradeInputs(gradesData);
  }, [selectedDiscipline, enrollments, grades]);

  const handleGradeChange = (studentId: string, field: keyof GradeInput, value: string) => {
    const numericValue = value ? parseFloat(value) : null;
    setGradeInputs(prev => prev.map(g => g.studentId === studentId ? { ...g, [field]: numericValue } : g));
  };

  const handleSubmit = () => {
    const disciplineEnrollments = getEnrollmentsByDiscipline(selectedDiscipline);

    gradeInputs.forEach(({ studentId, p1, exercises, report }) => {
      const enrollment = disciplineEnrollments.find(e => e.alunoId === studentId);
      if (!enrollment) return;

      const data = { enrollmentId: enrollment.id, p1, exercises, report };
      const existing = getGradesByEnrollment(enrollment.id);
      existing ? updateGrade(existing.id, data) : saveGrade(data);
    });

    alert('Notas salvas com sucesso!');
  };

  const enrolledStudentIds = getEnrollmentsByDiscipline(selectedDiscipline).map(e => e.alunoId);
  const gradeRows = students
    .filter(({ id }) => enrolledStudentIds.includes(id))
    .map(student => ({
      student,
      grade: gradeInputs.find(g => g.studentId === student.id) || { studentId: student.id, p1: null, exercises: null, report: null },
      onGradeChange: (field: keyof GradeInput, value: string) => handleGradeChange(student.id, field, value)
    }));

  return (
    <Box sx={Styles.containerStyles}>
      <Paper sx={Styles.paperStyles}>
        <Typography variant="h5" sx={Styles.titleStyles}>Lançamento de Notas</Typography>

        <Box sx={Styles.formStyles}>
          <DisciplineSelector disciplines={disciplines} value={selectedDiscipline} onChange={setSelectedDiscipline} />
          {selectedDiscipline && <GradesTable rows={gradeRows} />}
        </Box>

        {selectedDiscipline && gradeInputs.length > 0 && (
          <Box sx={Styles.buttonContainerStyles}>
            <Button variant="contained" onClick={handleSubmit} sx={Styles.saveButtonStyles}>Salvar Notas</Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default GradesPage;
