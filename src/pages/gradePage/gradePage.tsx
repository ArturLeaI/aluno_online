import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { DisciplineSelector, GradesTable } from '../../components/index';
import * as Stores from '../../store';
import * as Styles from './gradePage.style';
import { GradeInput } from './gradePage.type';

const GradesPage: React.FC = () => {
  const { students } = Stores.useStudentStore();
  const { disciplines } = Stores.useDisciplineStore();
  const { enrollments, getEnrollmentsByDiscipline } = Stores.useEnrollmentStore();
  const { grades: storedGrades, saveGrade, updateGrade, getGradesByEnrollment } = Stores.useGradeStore();
  
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [gradeInputs, setGradeInputs] = useState<GradeInput[]>([]);
  const [enrolledStudents, setEnrolledStudents] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDiscipline) {
      const disciplineEnrollments = getEnrollmentsByDiscipline(selectedDiscipline);
      const enrolledIds = disciplineEnrollments.map(e => e.alunoId);
      setEnrolledStudents(enrolledIds);
      
      const initialGrades = enrolledIds.map(studentId => {
        const enrollment = disciplineEnrollments.find(e => e.alunoId === studentId);
        if (!enrollment) return {
          studentId,
          p1: null,
          exercises: null,
          report: null
        };

        const existingGrade = getGradesByEnrollment(enrollment.id);
        return {
          studentId,
          p1: existingGrade?.p1 || null,
          exercises: existingGrade?.exercises || null,
          report: existingGrade?.report || null
        };
      });
      
      setGradeInputs(initialGrades);
    } else {
      setEnrolledStudents([]);
      setGradeInputs([]);
    }
  }, [selectedDiscipline, enrollments, storedGrades]);

  const handleGradeChange = (
    studentId: string,
    field: 'p1' | 'exercises' | 'report',
    value: string
  ) => {
    const numericValue = value === '' ? null : parseFloat(value);
    
    setGradeInputs(prevGrades =>
      prevGrades.map(grade =>
        grade.studentId === studentId
          ? { ...grade, [field]: numericValue }
          : grade
      )
    );
  };

  const handleSubmit = () => {
    if (!selectedDiscipline) return;

    const disciplineEnrollments = getEnrollmentsByDiscipline(selectedDiscipline);

    gradeInputs.forEach(input => {
      const enrollment = disciplineEnrollments.find(e => e.alunoId === input.studentId);
      if (!enrollment) return;

      const existingGrade = getGradesByEnrollment(enrollment.id);

      const gradeData = {
        enrollmentId: enrollment.id,
        p1: input.p1,
        exercises: input.exercises,
        report: input.report
      };

      if (existingGrade) {
        updateGrade(existingGrade.id, gradeData);
      } else {
        saveGrade(gradeData);
      }
    });

    alert('Notas salvas com sucesso!');
  };

  const filteredStudents = students.filter(student => 
    enrolledStudents.includes(student.id)
  );

  const gradeRows = filteredStudents.map(student => {
    const grade = gradeInputs.find(g => g.studentId === student.id) || {
      studentId: student.id,
      p1: null,
      exercises: null,
      report: null
    };

    return {
      student,
      grade,
      onGradeChange: (field: 'p1' | 'exercises' | 'report', value: string) => 
        handleGradeChange(student.id, field, value)
    };
  });

  return (
    <Box sx={Styles.containerStyles}>
      <Paper sx={Styles.paperStyles}>
        <Typography variant="h5" sx={Styles.titleStyles}>
          Lançamento de Notas
        </Typography>

        <Box sx={Styles.formStyles}>
          <DisciplineSelector
            disciplines={disciplines}
            value={selectedDiscipline}
            onChange={setSelectedDiscipline}
          />

          {selectedDiscipline && (
            <GradesTable rows={gradeRows} />
          )}
        </Box>

        {selectedDiscipline && filteredStudents.length > 0 && (
          <Box sx={Styles.buttonContainerStyles}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={gradeInputs.length === 0}
              sx={Styles.saveButtonStyles}
            >
              Salvar Notas
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default GradesPage;