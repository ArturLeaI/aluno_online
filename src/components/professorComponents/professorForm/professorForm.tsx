import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { FormField } from '../formFieldProfessor/formFieldProfessor';
import { fieldGroups } from '../../../mock/fieldGroupsProfessor';
import { containerStyles, paperStyles, titleStyles, formStyles, fieldsContainerStyles, buttonContainerStyles, cancelButtonStyles, saveButtonStyles } from '../../../pages/addProfessor/addProfessor.style';
import { Control, FieldValues, FieldErrors } from 'react-hook-form';

interface ProfessorFormProps {
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
  onSubmit: () => void;
  onCancel: () => void;
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({
  control,
  errors,
  onSubmit,
  onCancel
}) => {
  return (
    <Box sx={containerStyles}>
      <Paper sx={paperStyles}>
        <Typography variant="h6" sx={titleStyles}>
          Cadastro de Professor
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={formStyles}>
          <Box sx={fieldsContainerStyles}>
            {fieldGroups.map((group, groupIndex) => (
              <Box 
                key={groupIndex}
                sx={{ 
                  display: 'flex',
                  gap: 2,
                  flexDirection: group.direction === 'row' ? 'row' : 'column'
                }}
              >
                {group.fields.map((field) => (
                  <FormField
                    key={field.name}
                    control={control}
                    errors={errors}
                    {...field}
                  />
                ))}
              </Box>
            ))}
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

export default ProfessorForm;
