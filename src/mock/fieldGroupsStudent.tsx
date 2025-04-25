import { GenericSelect, GenericTextField } from "../components";

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