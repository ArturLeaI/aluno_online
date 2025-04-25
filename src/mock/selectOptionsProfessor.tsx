import { SelectOption } from "../pages/addProfessor/addProfessor.type";

export const selectOptions: Record<string, SelectOption[]> = {
    titulacoes: [
      { value: 'Graduação', label: 'Graduação' },
      { value: 'Especialização', label: 'Especialização' },
      { value: 'Mestrado', label: 'Mestrado' },
      { value: 'Doutorado', label: 'Doutorado' }
    ],
    areasAtuacao: [
      { value: 'Ciências Exatas', label: 'Ciências Exatas' },
      { value: 'Ciências Humanas', label: 'Ciências Humanas' },
      { value: 'Engenharias', label: 'Engenharias' },
      { value: 'Saúde', label: 'Saúde' }
    ],
    sexos: [
      { value: 'Masculino', label: 'Masculino' },
      { value: 'Feminino', label: 'Feminino' },
      { value: 'Outro', label: 'Outro' }
    ]
  };