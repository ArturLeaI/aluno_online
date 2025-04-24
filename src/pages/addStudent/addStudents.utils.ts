import { GenericTextField, GenericSelect } from '../../components';
import { SelectOption } from '../../pages/addStudent/addStudent.type';

export const formatCPF = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
};

export const formatPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

export const defaultValues = {
  nomeCompleto: '',
  nomePai: '',
  nomeMae: '',
  dataNascimento: '',
  sexo: '',
  estadoNascimento: '',
  municipioNascimento: '',
  racaCor: '',
  tipoEscola: '',
  estadoCivil: '',
  nacionalidade: '',
  cpf: '',
  contato: ''
};

export const validationRules = {
  nomeCompleto: { required: 'Nome completo é obrigatório' },
  cpf: { 
    required: 'CPF é obrigatório',
    pattern: {
      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      message: 'Formato inválido (000.000.000-00)'
    }
  },
  contato: {
    required: 'Contato é obrigatório',
    pattern: {
      value: /^\(\d{2}\) \d{5}-\d{4}$/,
      message: 'Formato inválido (00) 00000-0000'
    }
  },
  nomeMae: { required: 'Nome da mãe é obrigatório' },
  sexo: { required: 'Sexo é obrigatório' },
  estadoNascimento: { required: 'Estado de nascimento é obrigatório' },
  municipioNascimento: { required: 'Município de nascimento é obrigatório' },
  racaCor: { required: 'Raça/Cor é obrigatória' },
  estadoCivil: { required: 'Estado civil é obrigatório' },
  nacionalidade: { required: 'Nacionalidade é obrigatória' }
};

export const selectOptions: Record<string, SelectOption[]> = {
  estados: [{ value: 'Distrito Federal', label: 'Distrito Federal' }],
  racas: [{ value: 'Parda', label: 'Parda' }],
  tiposEscola: [
    { value: 'Pública', label: 'Pública' },
    { value: 'Particular', label: 'Particular' }
  ],
  estadosCivis: [{ value: 'Solteiro', label: 'Solteiro' }],
  nacionalidades: [{ value: 'Brasileira', label: 'Brasileira' }],
  sexos: [
    { value: 'Feminino', label: 'Feminino' },
    { value: 'Masculino', label: 'Masculino' }
  ]
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
        name: 'contato', 
        component: GenericTextField,
        label: 'Telefone',
        rules: validationRules.contato
      }
    ],
    direction: 'row' 
  },
  {
    fields: [
      { 
        name: 'nomePai', 
        component: GenericTextField,
        label: 'Nome do Pai'
      },
      { 
        name: 'nomeMae', 
        component: GenericTextField,
        label: 'Nome da Mãe',
        rules: validationRules.nomeMae
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
        InputLabelProps: { shrink: true }
      }
    ]
  },
  {
    fields: [
      { 
        name: 'sexo', 
        component: GenericSelect,
        label: 'Sexo',
        options: 'sexos',
        rules: validationRules.sexo
      },
      { 
        name: 'estadoNascimento', 
        component: GenericSelect,
        label: 'Estado de Nascimento',
        options: 'estados',
        rules: validationRules.estadoNascimento
      }
    ],
    direction: 'row'
  },
  {
    fields: [
      { 
        name: 'municipioNascimento', 
        component: GenericTextField,
        label: 'Município de Nascimento',
        rules: validationRules.municipioNascimento
      },
      { 
        name: 'racaCor', 
        component: GenericSelect,
        label: 'Raça/Cor',
        options: 'racas',
        rules: validationRules.racaCor
      }
    ],
    direction: 'row'
  },
  {
    fields: [
      { 
        name: 'tipoEscola', 
        component: GenericSelect,
        label: 'Tipo de Escola',
        options: 'tiposEscola'
      },
      { 
        name: 'estadoCivil', 
        component: GenericSelect,
        label: 'Estado Civil',
        options: 'estadosCivis',
        rules: validationRules.estadoCivil
      }
    ],
    direction: 'row'
  },
  {
    fields: [
      { 
        name: 'nacionalidade', 
        component: GenericSelect,
        label: 'Nacionalidade',
        options: 'nacionalidades',
        rules: validationRules.nacionalidade
      }
    ]
  }
];