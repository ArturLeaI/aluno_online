import {
    Box,
    Typography,
    Button,
    Paper
  } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import { useForm, Controller } from 'react-hook-form';
  import  GenericTextField  from '../../components/genericTextField/genericTextField';
  import  GenericSelect  from '../../components/genericSelect/genericSelect';
  import {
    containerStyles,
    paperStyles,
    titleStyles,
    formStyles,
    fieldsContainerStyles,
    buttonContainerStyles,
    cancelButtonStyles,
    saveButtonStyles
  } from './addProfessor.style';
  import { useProfessorStore } from '../../store/professorStore';
  
  type FormData = {
    nomeCompleto: string;
    cpf: string;
    email: string;
    titulacao: string;
    dataNascimento: string;
    sexo: string;
    areaAtuacao: string;
    dataContratacao: string;
    telefone: string;
    celular: string;
    endereco: string;
    cep: string;
  };
  
  const ProfessorForm = () => {
    const { adicionarProfessor } = useProfessorStore();
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
      defaultValues: {
        nomeCompleto: '',
        cpf: '',
        email: '',
        titulacao: '',
        dataNascimento: '',
        sexo: '',
        areaAtuacao: '',
        dataContratacao: '',
        telefone: '',
        celular: '',
        endereco: '',
        cep: ''
      }
    });
  
    const titulacoes = [
      { value: 'Graduação', label: 'Graduação' },
      { value: 'Especialização', label: 'Especialização' },
      { value: 'Mestrado', label: 'Mestrado' },
      { value: 'Doutorado', label: 'Doutorado' }
    ];
  
    const areasAtuacao = [
      { value: 'Ciências Exatas', label: 'Ciências Exatas' },
      { value: 'Ciências Humanas', label: 'Ciências Humanas' },
      { value: 'Engenharias', label: 'Engenharias' },
      { value: 'Saúde', label: 'Saúde' }
    ];
  
    const sexos = [
      { value: 'Masculino', label: 'Masculino' },
      { value: 'Feminino', label: 'Feminino' },
      { value: 'Outro', label: 'Outro' }
    ];
  
    const onSubmit = (data: FormData) => {
      const professor = {
        id: crypto.randomUUID(),
        ...data,
      };
      adicionarProfessor(professor);
      reset();
      window.alert('Professor cadastrado com sucesso!');
      navigate('/professores');
    };
  
    const handleCancel = () => {
      navigate('/professores');
    };
  
    return (
      <Box sx={containerStyles}>
        <Paper sx={paperStyles}>
          <Typography variant="h6" sx={titleStyles}>
            Cadastro de Professor
          </Typography>
  
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={formStyles}>
            <Box sx={fieldsContainerStyles}>
              <Controller
                name="nomeCompleto"
                control={control}
                rules={{ required: 'Nome completo é obrigatório' }}
                render={({ field }) => (
                  <GenericTextField
                    label="Nome Completo"
                    error={!!errors.nomeCompleto}
                    helperText={errors.nomeCompleto?.message}
                    {...field}
                  />
                )}
              />
  
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                  name="cpf"
                  control={control}
                  rules={{ required: 'CPF é obrigatório' }}
                  render={({ field }) => (
                    <GenericTextField
                      label="CPF"
                      error={!!errors.cpf}
                      helperText={errors.cpf?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: 'Email é obrigatório' }}
                  render={({ field }) => (
                    <GenericTextField
                      label="Email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      {...field}
                    />
                  )}
                />
              </Box>
  
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                  name="titulacao"
                  control={control}
                  rules={{ required: 'Titulação é obrigatória' }}
                  render={({ field }) => (
                    <GenericSelect
                      label="Titulação"
                      options={titulacoes}
                      error={!!errors.titulacao}
                      helperText={errors.titulacao?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="areaAtuacao"
                  control={control}
                  rules={{ required: 'Área de atuação é obrigatória' }}
                  render={({ field }) => (
                    <GenericSelect
                      label="Área de Atuação"
                      options={areasAtuacao}
                      error={!!errors.areaAtuacao}
                      helperText={errors.areaAtuacao?.message}
                      {...field}
                    />
                  )}
                />
              </Box>
  
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                  name="dataNascimento"
                  control={control}
                  rules={{ required: 'Data de nascimento é obrigatória' }}
                  render={({ field }) => (
                    <GenericTextField
                      label="Data de Nascimento"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.dataNascimento}
                      helperText={errors.dataNascimento?.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="dataContratacao"
                  control={control}
                  rules={{ required: 'Data de contratação é obrigatória' }}
                  render={({ field }) => (
                    <GenericTextField
                      label="Data de Contratação"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.dataContratacao}
                      helperText={errors.dataContratacao?.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Box>
  
              <Controller
                name="sexo"
                control={control}
                rules={{ required: 'Sexo é obrigatório' }}
                render={({ field }) => (
                  <GenericSelect
                    label="Sexo"
                    options={sexos}
                    error={!!errors.sexo}
                    helperText={errors.sexo?.message}
                    {...field}
                  />
                )}
              />
  
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                  name="telefone"
                  control={control}
                  rules={{ required: 'Telefone é obrigatório' }}
                  render={({ field }) => (
                    <GenericTextField
                      label="Telefone"
                      error={!!errors.telefone}
                      helperText={errors.telefone?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="celular"
                  control={control}
                  rules={{ required: 'Celular é obrigatório' }}
                  render={({ field }) => (
                    <GenericTextField
                      label="Celular"
                      error={!!errors.celular}
                      helperText={errors.celular?.message}
                      {...field}
                    />
                  )}
                />
              </Box>
  
              <Controller
                name="endereco"
                control={control}
                rules={{ required: 'Endereço é obrigatório' }}
                render={({ field }) => (
                  <GenericTextField
                    label="Endereço Completo"
                    error={!!errors.endereco}
                    helperText={errors.endereco?.message}
                    {...field}
                  />
                )}
              />
  
              <Controller
                name="cep"
                control={control}
                rules={{ required: 'CEP é obrigatório' }}
                render={({ field }) => (
                  <GenericTextField
                    label="CEP"
                    error={!!errors.cep}
                    helperText={errors.cep?.message}
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
  
  export default ProfessorForm;