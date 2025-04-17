import React, { useState } from 'react';
import { Box, TablePagination } from '@mui/material';
import { useDisciplineStore } from '../../store/diciplineStore';
import { DisciplineSearchHeader, DisciplinesTable, DisciplineDetailsModal } from '../../components/index';

const DisciplinePage: React.FC = () => {
  const { disciplines } = useDisciplineStore();
  const [openModal, setOpenModal] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredDisciplines = disciplines.filter(discipline => {
    return (
      discipline.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (discipline.codigo && discipline.codigo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (discipline.professor && discipline.professor.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleOpenModal = (discipline: any) => {
    setSelectedDiscipline(discipline);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <DisciplineSearchHeader 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

      <DisciplinesTable
        disciplines={filteredDisciplines}
        page={page}
        rowsPerPage={rowsPerPage}
        onOpenModal={handleOpenModal}
      />

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredDisciplines.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        sx={{ mt: 2 }}
      />

      <DisciplineDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        discipline={selectedDiscipline}
      />
    </Box>
  );
};

export default DisciplinePage;