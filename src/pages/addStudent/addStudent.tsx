import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { GenericTextField, GenericSelect }  from '../../components/index';
import {
  containerStyles,
  paperStyles,
  titleStyles,
  formStyles,
  fieldsContainerStyles,
  buttonContainerStyles,
  cancelButtonStyles,
  saveButtonStyles
} from './addStudent.style';
import { useStudentStore } from '../../store/studentStore';

type FormData = {
  nomeCompleto: string;
  nomePai: string;
  nomeMae: string;
  dataNascimento: string;
  sexo: string;
  estadoNascimento: string;
  municipioNascimento: string;
  racaCor: string;
  tipoEscola: string;
  estadoCivil: string;
  nacionalidade: string;
  cpf: string;
  contato: string;
};

const StudentForm = () => {
  const { addStudent } = useStudentStore();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      nomeCompleto: '',
      nomePai: '',
      nomeMae: '',
      dataNascimento: '',
      estadoNascimento: '',
      municipioNascimento: '',
      racaCor: '',
      tipoEscola: '',
      estadoCivil: '',
      sexo: '',
      nacionalidade: '',
      cpf: '',
      contato: ''
    }
  });
  const handleCancel = () => {
    navigate('/alunos');
  };

  const estados = [{ value: 'Distrito Federal', label: 'Distrito Federal' }];
  const racas = [{ value: 'Parda', label: 'Parda' }];
  const tiposEscola = [{ value: 'Pública', label: 'Pública' }, { value: 'Particular', label: 'Particular' }];
  const estadosCivis = [{ value: 'Solteiro', label: 'Solteiro' }];
  const nacionalidades = [{ value: 'Brasileira', label: 'Brasileira' }];
  const sexos = [{ value: 'Feminino', label: 'Feminino' }, { value: 'Masculino', label: 'Masculino' }];

  const onSubmit = (data: FormData) => {
    const student = {
      id: crypto.randomUUID(),
      ...data,
    };
    addStudent(student);
    reset();
    window.alert('Aluno cadastrado com sucesso!');
    navigate('/alunos');
  };

  return (
    <Box sx={containerStyles}>
      <Paper sx={paperStyles}>
        <Typography variant="h6" sx={titleStyles}>
          Cadastro de Aluno
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
              {/* Campo CPF - sem máscara */}
              <Controller
                name="cpf"
                control={control}
                rules={{
                  required: 'CPF é obrigatório',
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    message: 'Formato inválido (000.000.000-00)'
                  }
                }}
                render={({ field }) => (
                  <GenericTextField
                    label="CPF"
                    error={!!errors.cpf}
                    helperText={errors.cpf?.message}
                    {...field}
                  />
                )}
              />

              {/* Campo Contato - sem máscara */}
              <Controller
                name="contato"
                control={control}
                rules={{
                  required: 'Contato é obrigatório',
                  pattern: {
                    value: /^\(\d{2}\) \d{5}-\d{4}$/,
                    message: 'Formato inválido (00) 00000-0000'
                  }
                }}
                render={({ field }) => (
                  <GenericTextField
                    label="Telefone"
                    error={!!errors.contato}
                    helperText={errors.contato?.message}
                    {...field}
                  />
                )}
              />
            </Box>

            <Controller
              name="nomePai"
              control={control}
              render={({ field }) => (
                <GenericTextField
                  label="Nome do Pai"
                  {...field}
                />
              )}
            />

            <Controller
              name="nomeMae"
              control={control}
              rules={{ required: 'Nome da mãe é obrigatório' }}
              render={({ field }) => (
                <GenericTextField
                  label="Nome da Mãe"
                  error={!!errors.nomeMae}
                  helperText={errors.nomeMae?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="dataNascimento"
              control={control}
              render={({ field }) => (
                <GenericTextField
                  label="Data de Nascimento"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...field}
                />
              )}
            />

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
                name="estadoNascimento"
                control={control}
                rules={{ required: 'Estado de nascimento é obrigatório' }}
                render={({ field }) => (
                  <GenericSelect
                    label="Estado de Nascimento"
                    options={estados}
                    error={!!errors.estadoNascimento}
                    helperText={errors.estadoNascimento?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name="municipioNascimento"
                control={control}
                rules={{ required: 'Município de nascimento é obrigatório' }}
                render={({ field }) => (
                  <GenericTextField
                    label="Município de Nascimento"
                    error={!!errors.municipioNascimento}
                    helperText={errors.municipioNascimento?.message}
                    {...field}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Controller
                name="racaCor"
                control={control}
                rules={{ required: 'Raça/Cor é obrigatória' }}
                render={({ field }) => (
                  <GenericSelect
                    label="Raça/Cor"
                    options={racas}
                    error={!!errors.racaCor}
                    helperText={errors.racaCor?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name="tipoEscola"
                control={control}
                render={({ field }) => (
                  <GenericSelect
                    label="Tipo de escola"
                    options={tiposEscola}
                    {...field}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Controller
                name="estadoCivil"
                control={control}
                rules={{ required: 'Estado civil é obrigatório' }}
                render={({ field }) => (
                  <GenericSelect
                    label="Estado Civil"
                    options={estadosCivis}
                    error={!!errors.estadoCivil}
                    helperText={errors.estadoCivil?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name="nacionalidade"
                control={control}
                rules={{ required: 'Nacionalidade é obrigatória' }}
                render={({ field }) => (
                  <GenericSelect
                    label="Nacionalidade"
                    options={nacionalidades}
                    error={!!errors.nacionalidade}
                    helperText={errors.nacionalidade?.message}
                    {...field}
                  />
                )}
              />
            </Box>

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

export default StudentForm;