// src/components/enrollmentModal/enrollmentModal.tsx
import React, { useState } from 'react';
import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import GenericModal from '../genericModal/genericModal';
import { EnrollmentModalProps } from './enrollmentModal.type';
import { styles } from './enrollmentModal.style';

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ open, student, disciplines, enrollments, onClose, onEnroll, readOnly = false }) => {
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);

  const handleDisciplineSelect = (disciplineId: string) => {
    if (readOnly) return;
    setSelectedDisciplines(prev =>
      prev.includes(disciplineId)
        ? prev.filter(id => id !== disciplineId)
        : [...prev, disciplineId]
    );
  };

  const handleEnroll = () => {
    if (!student) return;
    
    onEnroll({
      disciplinesIds: selectedDisciplines,
      studentCpf: student.cpf
    });
    setSelectedDisciplines([]);
  };

  if (!student) return null;

  return (
    <GenericModal
      open={open}
      onClose={onClose}
      title={`${readOnly ? 'Visualizar' : 'Matricular'} ${student.nomeCompleto}`}
      maxWidth="sm"
    >
      <Box>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {readOnly ? 'Disciplinas do aluno:' : 'Selecione as disciplinas para matricular o aluno:'}
        </Typography>

        <Box sx={styles.modalContent}>
          {disciplines.map(discipline => {
            const isEnrolled = enrollments.some(e =>
              e.disciplinaId === discipline.id && e.status === 'ativo'
            );
            const isSelected = selectedDisciplines.includes(discipline.id);

            return (
              <Paper
                key={discipline.id}
                onClick={() => !isEnrolled && !readOnly && handleDisciplineSelect(discipline.id)}
                sx={styles.disciplinePaper(isSelected, isEnrolled, readOnly)}
              >
                <Box sx={styles.disciplineHeader}>
                  <Typography sx={styles.disciplineName}>
                    {discipline.name}
                  </Typography>
                  {isEnrolled && (
                    <Chip
                      label="Matriculado"
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  )}
                </Box>
                <Typography sx={styles.disciplineDetails}>
                  {discipline.codigo} • Prof. {discipline.professor}
                </Typography>
              </Paper>
            );
          })}
        </Box>

        {!readOnly && selectedDisciplines.length > 0 && (
          <Box sx={styles.selectedDisciplinesContainer}>
            <Typography sx={styles.selectedDisciplinesLabel}>
              Disciplinas selecionadas ({selectedDisciplines.length}):
            </Typography>
            <Box sx={styles.chipsContainer}>
              {selectedDisciplines.map(id => {
                const discipline = disciplines.find(d => d.id === id) || { name: 'Desconhecida' };
                return (
                  <Chip
                    key={id}
                    label={discipline.name}
                    onDelete={() => handleDisciplineSelect(id)}
                    color="primary"
                  />
                );
              })}
            </Box>
          </Box>
        )}

        <Box sx={styles.actionsContainer}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={styles.button}
          >
            {readOnly ? 'Fechar' : 'Cancelar'}
          </Button>
          {!readOnly && (
            <Button
              variant="contained"
              onClick={handleEnroll}
              disabled={selectedDisciplines.length === 0}
              sx={styles.button}
            >
              Confirmar Matrícula
            </Button>
          )}
        </Box>
      </Box>
    </GenericModal>
  );
};

export default EnrollmentModal;