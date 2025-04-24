import React, { useState } from 'react';
import {  Container, Paper, Typography } from '@mui/material';
import LoginForm from '../../components/loginForm/loginForm';
import { LoginFormData, UserType } from './loginPage.type';
import { formatCPF, validateCPF } from './loginPage.utils';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    cpf: '',
    userType: 'aluno',
  });

  const [errors, setErrors] = useState({ cpf: false });

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      cpf: formatCPF(value),
    });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      userType: e.target.value as UserType,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cpfValid = validateCPF(formData.cpf);
    setErrors({ cpf: !cpfValid });
    
    if (cpfValid) {
      localStorage.setItem('userType', formData.userType);
      localStorage.setItem('userCPF', formData.cpf);
      window.location.href = '/alunos';
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        
        <LoginForm
          formData={formData}
          errors={errors}
          onCPFChange={handleCPFChange}
          onUserTypeChange={handleUserTypeChange}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Container>
  );
};

export default LoginPage;