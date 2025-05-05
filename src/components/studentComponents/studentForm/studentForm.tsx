import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { FormField } from '../formField/formField';
import { fieldGroups } from '../../../mock/fieldGroupsStudent';
import { StudentFormProps } from './studenForm.type';
import { containerStyles, paperStyles, titleStyles, formStyles, fieldsContainerStyles, buttonContainerStyles, cancelButtonStyles, saveButtonStyles,} from '../../../pages/addStudent/addStudent.style';

const StudentForm: React.FC<StudentFormProps> = ({ control, errors, onSubmit, onCancel,}) => {
  const renderFieldGroup = (group: typeof fieldGroups[number], groupIndex: number) => {
    const direction = group.direction === 'row' ? 'row' : 'column';

    const renderedFields = group.fields.map((field) => (
      <FormField
        key={field.name}
        control={control}
        errors={errors}
        {...field}
      />
    ));

    return (
      <Box key={groupIndex} sx={{ display: 'flex', gap: 2, flexDirection: direction }}>
        {renderedFields}
      </Box>
    );
  };

  const renderedGroups = fieldGroups.map(renderFieldGroup);

  return (
    <Box sx={containerStyles}>
      <Paper sx={paperStyles}>
        <Typography variant="h6" sx={titleStyles}>
          Cadastro de Aluno
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={formStyles}>
          <Box sx={fieldsContainerStyles}>
            {renderedGroups}
          </Box>

          <Box sx={buttonContainerStyles}>
            <Button
              variant="outlined"
              sx={cancelButtonStyles}
              onClick={onCancel}
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

export default StudentForm;
