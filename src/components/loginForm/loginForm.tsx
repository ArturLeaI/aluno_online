import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { LoginFormData, LoginFormErrors } from '../../pages/loginPage/loginPage.type';

interface LoginFormProps {
  formData: LoginFormData;
  errors: LoginFormErrors;
  onCPFChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUserTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  errors,
  onCPFChange,
  onUserTypeChange,
  onSubmit,
}) => (
  <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
    <TextField
      fullWidth
      margin="normal"
      label="CPF"
      name="cpf"
      value={formData.cpf}
      onChange={onCPFChange}
      error={errors.cpf}
      helperText={errors.cpf ? 'CPF inválido (deve conter 11 dígitos)' : 'Formato: 000.000.000-00'}
      placeholder="000.000.000-00"
      inputProps={{ maxLength: 14 }}
    />
    
    <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
      <FormLabel component="legend">Tipo de Usuário</FormLabel>
      <RadioGroup
        row
        name="userType"
        value={formData.userType}
        onChange={onUserTypeChange}
      >
        <FormControlLabel
          value="aluno"
          control={<Radio />}
          label="Aluno"
        />
        <FormControlLabel
          value="professor"
          control={<Radio />}
          label="Professor"
        />
      </RadioGroup>
    </FormControl>
    
    <Button
      fullWidth
      variant="contained"
      type="submit"
      sx={{ mt: 3 }}
    >
      Entrar
    </Button>
  </Box>
);

export default LoginForm;
