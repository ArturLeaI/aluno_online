import { SelectOption } from "../pages/addStudent/addStudent.type";

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