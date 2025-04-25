import { GenericTextField, GenericSelect } from '../components';

export const validationRules = {
    nomeCompleto: { required: 'Nome completo é obrigatório' },
    cpf: { required: 'CPF é obrigatório' },
    email: { 
      required: 'Email é obrigatório',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Email inválido'
      }
    },
    titulacao: { required: 'Titulação é obrigatória' },
    dataNascimento: { required: 'Data de nascimento é obrigatória' },
    sexo: { required: 'Sexo é obrigatório' },
    areaAtuacao: { required: 'Área de atuação é obrigatória' },
    dataContratacao: { required: 'Data de contratação é obrigatória' },
    telefone: { required: 'Telefone é obrigatório' },
    celular: { required: 'Celular é obrigatório' },
    endereco: { required: 'Endereço é obrigatório' },
    cep: { required: 'CEP é obrigatório' }
  };

  export const fieldGroups = [
    {
      fields: [
        { 
          name: 'nomeCompleto', 
          component: GenericTextField,
          label: 'Nome Completo',
          fullWidth: true,
          rules: validationRules.nomeCompleto
        }
      ]
    },
    {
      fields: [
        { 
          name: 'cpf', 
          component: GenericTextField,
          label: 'CPF',
          rules: validationRules.cpf
        },
        { 
          name: 'email', 
          component: GenericTextField,
          label: 'Email',
          rules: validationRules.email
        }
      ],
      direction: 'row'
    },
    {
      fields: [
        { 
          name: 'titulacao', 
          component: GenericSelect,
          label: 'Titulação',
          options: 'titulacoes',
          rules: validationRules.titulacao
        },
        { 
          name: 'areaAtuacao', 
          component: GenericSelect,
          label: 'Área de Atuação',
          options: 'areasAtuacao',
          rules: validationRules.areaAtuacao
        }
      ],
      direction: 'row'
    },
    {
      fields: [
        { 
          name: 'dataNascimento', 
          component: GenericTextField,
          label: 'Data de Nascimento',
          type: 'date',
          InputLabelProps: { shrink: true },
          rules: validationRules.dataNascimento
        },
        { 
          name: 'dataContratacao', 
          component: GenericTextField,
          label: 'Data de Contratação',
          type: 'date',
          InputLabelProps: { shrink: true },
          rules: validationRules.dataContratacao
        }
      ],
      direction: 'row'
    },
    {
      fields: [
        { 
          name: 'sexo', 
          component: GenericSelect,
          label: 'Sexo',
          options: 'sexos',
          rules: validationRules.sexo,
          fullWidth: true
        }
      ]
    },
    {
      fields: [
        { 
          name: 'telefone', 
          component: GenericTextField,
          label: 'Telefone',
          rules: validationRules.telefone
        },
        { 
          name: 'celular', 
          component: GenericTextField,
          label: 'Celular',
          rules: validationRules.celular
        }
      ],
      direction: 'row'
    },
    {
      fields: [
        { 
          name: 'endereco', 
          component: GenericTextField,
          label: 'Endereço Completo',
          fullWidth: true,
          rules: validationRules.endereco
        }
      ]
    },
    {
      fields: [
        { 
          name: 'cep', 
          component: GenericTextField,
          label: 'CEP',
          rules: validationRules.cep
        }
      ]
    }
  ];