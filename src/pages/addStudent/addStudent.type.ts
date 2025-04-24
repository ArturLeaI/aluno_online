// src/pages/addStudent/studentForm.types.ts
export interface StudentFormData {
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
  }
  
  export interface SelectOption {
    value: string;
    label: string;
  }