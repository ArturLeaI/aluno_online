
import React, { useState } from 'react';
import { Box, TablePagination } from '@mui/material';
import { useProfessorStore } from '../../store/professorStore';
import { SearchHeader, ProfessoresTable, ProfessorDetailsModal } from '../../components/index';

const ProfessorPage: React.FC = () => {
  const { professores } = useProfessorStore();
  const [openModal, setOpenModal] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] = useState<any>(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(10);

  const professoresFiltrados = professores.filter(professor => {
    return (
      professor.nomeCompleto.toLowerCase().includes(termoBusca.toLowerCase()) ||
      (professor.cpf && professor.cpf.toLowerCase().includes(termoBusca.toLowerCase())) ||
      (professor.email && professor.email.toLowerCase().includes(termoBusca.toLowerCase()))
    );
  });

  const abrirModal = (professor: any) => {
    setProfessorSelecionado(professor);
    setOpenModal(true);
  };

  const fecharModal = () => {
    setOpenModal(false);
  };

  const mudarPagina = (_event: unknown, novaPagina: number) => {
    setPagina(novaPagina);
  };

  const mudarLinhasPorPagina = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinhasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <SearchHeader 
        termoBusca={termoBusca} 
        onSearchChange={setTermoBusca} 
      />

      <ProfessoresTable
        professores={professoresFiltrados}
        pagina={pagina}
        linhasPorPagina={linhasPorPagina}
        onAbrirModal={abrirModal}
      />

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={professoresFiltrados.length}
        rowsPerPage={linhasPorPagina}
        page={pagina}
        onPageChange={mudarPagina}
        onRowsPerPageChange={mudarLinhasPorPagina}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        sx={{ mt: 2 }}
      />

      <ProfessorDetailsModal
        open={openModal}
        onClose={fecharModal}
        professor={professorSelecionado}
      />
    </Box>
  );
};

export default ProfessorPage;