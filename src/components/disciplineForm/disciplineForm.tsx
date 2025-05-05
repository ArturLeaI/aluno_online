import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Box } from '@mui/material';
import GenericTextField from '../../components/genericTextField/genericTextField';
import GenericSelect from '../../components/genericSelect/genericSelect';
import { FormData, SelectOption } from '../../pages/addDicipline/addDiscipline.type';

interface DisciplineFormProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  departamentos: SelectOption[];
  periodos: SelectOption[];
  disciplinas: SelectOption[];
}

const DisciplineForm: React.FC<DisciplineFormProps> = ({
  control,
  errors,
  departamentos,
  periodos,
  disciplinas
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Nome da disciplina é obrigatório' }}
        render={({ field }) => (
          <GenericTextField
            label="Nome da Disciplina"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...field}
          />
        )}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="code"
          control={control}
          rules={{ required: 'Código é obrigatório' }}
          render={({ field }) => (
            <GenericTextField
              label="Código"
              error={!!errors.code}
              helperText={errors.code?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="cargaHoraria"
          control={control}
          rules={{ required: 'Carga horária é obrigatória' }}
          render={({ field }) => (
            <GenericTextField
              label="Carga Horária (horas)"
              error={!!errors.cargaHoraria}
              helperText={errors.cargaHoraria?.message}
              {...field}
            />
          )}
        />
      </Box>

      <Controller
        name="professor"
        control={control}
        rules={{ required: 'Professor é obrigatório' }}
        render={({ field }) => (
          <GenericTextField
            label="Professor Responsável"
            error={!!errors.professor}
            helperText={errors.professor?.message}
            {...field}
          />
        )}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="departamento"
          control={control}
          rules={{ required: 'Departamento é obrigatório' }}
          render={({ field }) => (
            <GenericSelect
              label="Departamento"
              options={departamentos}
              error={!!errors.departamento}
              helperText={errors.departamento?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="periodo"
          control={control}
          rules={{ required: 'Período é obrigatório' }}
          render={({ field }) => (
            <GenericSelect
              label="Período"
              options={periodos}
              error={!!errors.periodo}
              helperText={errors.periodo?.message}
              {...field}
            />
          )}
        />
      </Box>

      <Controller
        name="preRequisitos"
        control={control}
        render={({ field }) => (
          <GenericSelect
            label="Pré-requisitos"
            options={disciplinas}
            multiple
            {...field}
          />
        )}
      />

      <Controller
        name="descricao"
        control={control}
        render={({ field }) => (
          <GenericTextField
            label="Descrição"
            multiline
            rows={4}
            {...field}
          />
        )}
      />
    </Box>
  );
};

export default DisciplineForm;