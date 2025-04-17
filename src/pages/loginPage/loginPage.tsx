import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

type UserType = 'aluno' | 'professor';

interface LoginFormData {
  cpf: string;
  userType: UserType;
}

const formatCPF = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
};

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    cpf: '',
    userType: 'aluno',
  });

  const [errors, setErrors] = useState({
    cpf: false,
  });

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedCPF = formatCPF(value);
    
    setFormData({
      ...formData,
      cpf: formattedCPF,
    });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      userType: value as UserType,
    });
  };

  const validateCPF = (cpf: string): boolean => {
    const cleanedCPF = cpf.replace(/\D/g, '');
    
    if (cleanedCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanedCPF)) return false;
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cpfValid = validateCPF(formData.cpf);
    setErrors({ ...errors, cpf: !cpfValid });
    
    if (cpfValid) {
      // Armazena COM formatação (pontos e traço)
      localStorage.setItem('userType', formData.userType);
      localStorage.setItem('userCPF', formData.cpf); // Armazena formatado
      
      window.location.href = '/';
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleCPFChange}
            error={errors.cpf}
            helperText={errors.cpf ? 'CPF inválido (deve conter 11 dígitos)' : 'Formato: 000.000.000-00'}
            placeholder="000.000.000-00"
            inputProps={{
              maxLength: 14,
            }}
          />
          
          <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
            <FormLabel component="legend">Tipo de Usuário</FormLabel>
            <RadioGroup
              row
              name="userType"
              value={formData.userType}
              onChange={handleUserTypeChange}
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
      </Paper>
    </Container>
  );
};

export default LoginPage;