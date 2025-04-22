import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Paper,
  Typography
} from '@mui/material';
import GenericModal from '../genericModal/genericModal';

interface Student {
  id: string;
  nomeCompleto: string;
  cpf: string; 
}

interface Discipline {
  id: string;
  nome: string;
  codigo: string;
  professor: string;
}

interface Enrollment {
  id: string;
  disciplinaId: string;
  status: 'ativo' | 'inativo' | 'concluído';
}

interface EnrollmentModalProps {
  open: boolean;
  student: Student | null;
  disciplines: Discipline[];
  enrollments: Enrollment[];
  onClose: () => void;
  onEnroll: (data: { disciplinesIds: string[]; studentCpf: string }) => void;
  readOnly?: boolean;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  open,
  student,
  disciplines,
  enrollments,
  onClose,
  onEnroll,
  readOnly = false
}) => {
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

        <Box sx={{ maxHeight: 300, overflow: 'auto', mb: 3 }}>
          {disciplines.map(discipline => {
            const isEnrolled = enrollments.some(e =>
              e.disciplinaId === discipline.id && e.status === 'ativo'
            );
            const isSelected = selectedDisciplines.includes(discipline.id);

            return (
              <Paper
                key={discipline.id}
                onClick={() => !isEnrolled && !readOnly && handleDisciplineSelect(discipline.id)}
                sx={{
                  p: 2,
                  mb: 1,
                  border: `1px solid ${isSelected ? 'primary.main' : isEnrolled ? 'success.light' : 'divider'}`,
                  borderRadius: 1,
                  cursor: isEnrolled || readOnly ? 'default' : 'pointer',
                  backgroundColor: isSelected
                    ? 'action.selected'
                    : isEnrolled
                      ? 'action.disabledBackground'
                      : 'background.paper',
                  '&:hover': {
                    backgroundColor: isEnrolled || readOnly ? 'action.disabledBackground' : 'action.hover'
                  }
                }}
              >
                <Box display="flex" alignItems="center">
                  <Typography fontWeight="medium" sx={{ flexGrow: 1 }}>
                    {discipline.nome}
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
                <Typography variant="body2" color="text.secondary">
                  {discipline.codigo} • Prof. {discipline.professor}
                </Typography>
              </Paper>
            );
          })}
        </Box>

        {!readOnly && selectedDisciplines.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Disciplinas selecionadas ({selectedDisciplines.length}):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedDisciplines.map(id => {
                const discipline = disciplines.find(d => d.id === id) || { nome: 'Desconhecida' };
                return (
                  <Chip
                    key={id}
                    label={discipline.nome}
                    onDelete={() => handleDisciplineSelect(id)}
                    color="primary"
                  />
                );
              })}
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ textTransform: 'none' }}
          >
            {readOnly ? 'Fechar' : 'Cancelar'}
          </Button>
          {!readOnly && (
            <Button
              variant="contained"
              onClick={handleEnroll}
              disabled={selectedDisciplines.length === 0}
              sx={{ textTransform: 'none' }}
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