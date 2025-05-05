import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import DisciplineForm from '../../components/disciplineForm/disciplineForm';
import { useDisciplineStore } from '../../store/disciplineStore/diciplineStore';
import { FormData } from './addDiscipline.type';
import {
  containerStyles,
  paperStyles,
  titleStyles,
  formStyles,
  buttonContainerStyles,
  cancelButtonStyles,
  saveButtonStyles
} from './addDicipline.style';
import { disciplineDepartment } from '../../mock/disciplineDepartment';
import { disciplinePeriod } from '../../mock/disciplinePeriod';
import { necessaryDisciplines } from '../../mock/necessaryDisciplines';

const AddDiscipline: React.FC = () => {
  const { addDiscipline } = useDisciplineStore();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      name: '',
      code: '',
      cargaHoraria: '',
      professor: '',
      departamento: '',
      periodo: '',
      descricao: '',
      preRequisitos: []
    }
  });

  const onSubmit = (data: FormData) => {
    const discipline = {
      id: crypto.randomUUID(),
      ...data,
    };
    addDiscipline(discipline);
    reset();
    window.alert('Disciplina cadastrada com sucesso!');
    navigate('/materias');
  };

  const handleCancel = () => {
    navigate('/disciplinas');
  };

  return (
    <Box sx={containerStyles}>
      <Paper sx={paperStyles}>
        <Typography variant="h6" sx={titleStyles}>
          Cadastro de Disciplina
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={formStyles}>
          <DisciplineForm
            control={control}
            errors={errors}
            departamentos={disciplineDepartment}
            periodos={disciplinePeriod}
            disciplinas={necessaryDisciplines}
          />

          <Box sx={buttonContainerStyles}>
            <Button
              variant="outlined"
              sx={cancelButtonStyles}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" sx={saveButtonStyles}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddDiscipline;