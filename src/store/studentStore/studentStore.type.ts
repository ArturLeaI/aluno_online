export type Student = {
    id: string;
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
  };
  
  export type StudentStore = {
    students: Student[];
    addStudent: (student: Student) => void;
  };