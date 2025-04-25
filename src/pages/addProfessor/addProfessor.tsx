// src/pages/addProfessor/AddProfessorPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useProfessorStore } from '../../store/professorStore/professorStore';
import ProfessorForm from '../../components/professorComponents/professorForm/professorForm';
import { defaultValues } from '../../mock/defaultValuesProfessor';

const AddProfessorPage: React.FC = () => {
  const { adicionarProfessor } = useProfessorStore();
  const navigate = useNavigate();
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onBlur'
  });

  const onSubmit = (data: typeof defaultValues) => {
    const professor = {
      id: crypto.randomUUID(),
      ...data,
    };
    adicionarProfessor(professor);
    window.alert('Professor cadastrado com sucesso!');
    navigate('/professores');
  };

  return (
    <ProfessorForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate('/professores')}
    />
  );
};

export default AddProfessorPage;