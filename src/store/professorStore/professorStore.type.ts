export type Professor = {
    id: string;
    nomeCompleto: string;
    cpf: string;
    email: string;
    titulacao: string;
    dataNascimento: string;
    sexo: string;
    areaAtuacao: string;
    dataContratacao: string;
    telefone?: string;
    celular?: string;
    endereco?: string;
    cep?: string;
  };
  
  export type ProfessorStore = {
    professores: Professor[];
    adicionarProfessor: (professor: Professor) => void;
  };