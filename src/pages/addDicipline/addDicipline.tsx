import {
    Box,
    Typography,
    Button,
    Paper
  } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import { useForm, Controller } from 'react-hook-form';
  import GenericTextField  from '../../components/genericTextField/genericTextField';
  import GenericSelect  from '../../components/genericSelect/genericSelect';
  import {
    containerStyles,
    paperStyles,
    titleStyles,
    formStyles,
    fieldsContainerStyles,
    buttonContainerStyles,
    cancelButtonStyles,
    saveButtonStyles
  } from './addDicipline.style';
  import { useDisciplineStore } from '../../store/diciplineStore';
  
  type FormData = {
    nome: string;
    codigo: string;
    cargaHoraria: string;
    professor: string;
    departamento: string;
    periodo: string;
    descricao: string;
    preRequisitos: string[];
  };
  
  const FormDicipline = () => {
    const { addDiscipline } = useDisciplineStore();
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
      defaultValues: {
        nome: '',
        codigo: '',
        cargaHoraria: '',
        professor: '',
        departamento: '',
        periodo: '',
        descricao: '',
        preRequisitos: []
      }
    });
  
    const departamentos = [
      { value: 'Matemática', label: 'Matemática' },
      { value: 'Ciências', label: 'Ciências' },
      { value: 'Linguagens', label: 'Linguagens' },
      { value: 'Humanidades', label: 'Humanidades' }
    ];
  
    const periodos = [
      { value: '2023.1', label: '2023.1' },
      { value: '2023.2', label: '2023.2' },
      { value: '2024.1', label: '2024.1' }
    ];
  
    const disciplinas = [
      { value: 'MAT101', label: 'Matemática Básica' },
      { value: 'POR201', label: 'Português Intermediário' },
      { value: 'CIE301', label: 'Ciências Avançadas' }
    ];
  
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
            <Box sx={fieldsContainerStyles}>
              <Controller
                name="nome"
                control={control}
                rules={{ required: 'Nome da disciplina é obrigatório' }}
                render={({ field }) => (
                  <GenericTextField
                    label="Nome da Disciplina"
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                    {...field}
                  />
                )}
              />
  
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                  name="codigo"
                  control={control}
                  rules={{ required: 'Código é obrigatório' }}
                  render={({ field }) => (
                    <GenericTextField
                      label="Código"
                      error={!!errors.codigo}
                      helperText={errors.codigo?.message}
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
  
  export default FormDicipline;