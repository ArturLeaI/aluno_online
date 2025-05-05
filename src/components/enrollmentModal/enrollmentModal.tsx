import React, { useState } from 'react';
import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import GenericModal from '../genericModal/genericModal';
import { EnrollmentModalProps } from './enrollmentModal.type';
import { styles } from './enrollmentModal.style';

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ open, student, disciplines, enrollments, onClose, onEnroll, readOnly = false }) => {
  if (!student) return null;
  
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

  const isEnrolled = (disciplineId: string) => 
    enrollments.some(e => e.disciplinaId === disciplineId && e.status === 'ativo');

  const renderDisciplineItem = (discipline: typeof disciplines[0]) => (
    <Paper
      key={discipline.id}
      onClick={() => !isEnrolled(discipline.id) && !readOnly && handleDisciplineSelect(discipline.id)}
      sx={styles.disciplinePaper(
        selectedDisciplines.includes(discipline.id),
        isEnrolled(discipline.id),
        readOnly
      )}
    >
      <Box sx={styles.disciplineHeader}>
        <Typography sx={styles.disciplineName}>{discipline.name}</Typography>
        {isEnrolled(discipline.id) && (
          <Chip label="Matriculado" size="small" color="success" variant="outlined" />
        )}
      </Box>
      <Typography sx={styles.disciplineDetails}>
        {discipline.codigo} • Prof. {discipline.professor}
      </Typography>
    </Paper>
  );

  const renderSelectedChip = (id: string) => {
    const discipline = disciplines.find(d => d.id === id) || { name: 'Desconhecida' };
    return (
      <Chip
        key={id}
        label={discipline.name}
        onDelete={() => handleDisciplineSelect(id)}
        color="primary"
      />
    );
  };

  const renderSelectedDisciplines = () => (
    <Box sx={styles.selectedDisciplinesContainer}>
      <Typography sx={styles.selectedDisciplinesLabel}>
        Disciplinas selecionadas ({selectedDisciplines.length}):
      </Typography>
      <Box sx={styles.chipsContainer}>
        {selectedDisciplines.map(renderSelectedChip)}
      </Box>
    </Box>
  );

  const renderActionButtons = () => (
    <Box sx={styles.actionsContainer}>
      <Button variant="outlined" onClick={onClose} sx={styles.button}>
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
  );

  

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
          {disciplines.map(renderDisciplineItem)}
        </Box>

        {!readOnly && selectedDisciplines.length > 0 && renderSelectedDisciplines()}
        {renderActionButtons()}
      </Box>
    </GenericModal>
  );
};

export default EnrollmentModal;