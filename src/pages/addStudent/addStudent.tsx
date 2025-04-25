import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useStudentStore } from '../../store/studentStore/studentStore';
import { StudentForm } from '../../components';
import { defaultValues } from '../../mock/defaultValuesStudent';

const AddStudentPage: React.FC = () => {
  const { addStudent } = useStudentStore();
  const navigate = useNavigate();
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onBlur'
  });

  const onSubmit = (data: typeof defaultValues) => {
    const student = {
      id: crypto.randomUUID(),
      ...data,
    };
    addStudent(student);
    window.alert('Aluno cadastrado com sucesso!');
    navigate('/alunos');
  };

  return (
    <StudentForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate('/alunos')}
    />
  );
};

export default AddStudentPage;