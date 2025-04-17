import React, { useState, useEffect } from 'react';
import { Box, TablePagination, TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useStudentStore, useDisciplineStore, useEnrollmentStore, useGradeStore } from '../../store';
import { AddButton, StudentTable, StudentFilters, StudentDetailsModal, StudentGradesModal, EnrollmentModal } from '../../components';
import * as Styles from './studentPage.style';

const StudentPage: React.FC = () => {
  const { students } = useStudentStore();
  const { disciplines } = useDisciplineStore();
  const { enrollments, addEnrollment, getEnrollmentsByStudent } = useEnrollmentStore();
  const { grades } = useGradeStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisciplineFilter, setSelectedDisciplineFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openGradesModal, setOpenGradesModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEnrollmentModal, setOpenEnrollmentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedStudentForGrades, setSelectedStudentForGrades] = useState<any>(null);
  const [userType, setUserType] = useState<'aluno' | 'professor' | null>(null);
  const [userCPF, setUserCPF] = useState<string | null>(null);

  // Carrega os dados do usuário do localStorage ao montar o componente
  useEffect(() => {
    const type = localStorage.getItem('userType');
    const cpf = localStorage.getItem('userCPF');
    setUserType(type as 'aluno' | 'professor' | null);
    setUserCPF(cpf);
  }, []);

  // Encontra o aluno logado pelo CPF
  const loggedInStudent = userType === 'aluno' && userCPF
    ? students.find(student => student.cpf === userCPF)
    : null;

  const filteredStudents = students.filter(student => {
    // Se for aluno, mostra apenas o próprio aluno
    if (userType === 'aluno') {
      return student.cpf === userCPF;
    }

    // Se for professor, aplica os filtros normais
    const matchesSearch = student.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.cpf && student.cpf.toLowerCase().includes(searchTerm.toLowerCase()));

    return !selectedDisciplineFilter ? matchesSearch :
      enrollments.some(e => e.alunoId === student.id &&
        e.disciplinaId === selectedDisciplineFilter &&
        e.status === 'ativo');
  });

  const handleEnrollStudent = (data: { disciplinesIds: string[]; studentCpf?: string }) => {
    const disciplinesIds = data.disciplinesIds;
    if (!selectedStudent) return;

    const today = new Date().toISOString().split('T')[0];
    const currentPeriod = '2023.2';

    const newEnrollments = disciplinesIds
      .filter(disciplinaId => !getEnrollmentsByStudent(selectedStudent.id).some(e => e.disciplinaId === disciplinaId))
      .map(disciplinaId => ({
        id: Date.now().toString() + Math.random().toString().substring(2, 8),
        alunoId: selectedStudent.id,
        disciplinaId,
        dataMatricula: today,
        periodo: currentPeriod,
        status: 'ativo' as const
      }));

    newEnrollments.forEach(enrollment => {
      addEnrollment(enrollment);
    });

    setOpenEnrollmentModal(false);
    setSelectedStudent(null);

    // Agora você tem acesso ao CPF se precisar
    if (data.studentCpf) {
      console.log('CPF do aluno matriculado:', data.studentCpf);
      // Aqui você pode fazer algo com o CPF, como salvar no store
    }
  };

  // Se for aluno e não encontrar o registro, mostra mensagem
  if (userType === 'aluno' && !loggedInStudent) {
    return (
      <Box sx={Styles.containerStyles}>
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          Nenhum registro encontrado para o seu CPF. Por favor, entre em contato com a administração.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={Styles.containerStyles}>
      {userType === 'professor' && (
        <Box sx={Styles.headerStyles}>
          <TextField
            placeholder="Buscar alunos..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={Styles.searchFieldStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <StudentFilters
            disciplines={disciplines}
            onFilterChange={setSelectedDisciplineFilter}
            onResetFilters={() => {
              setSearchTerm('');
              setSelectedDisciplineFilter('');
            }}
          />

          <AddButton routePath="/adicionar-aluno" buttonText="Adicionar Aluno" />
        </Box>
      )}

      {userType === 'aluno' && loggedInStudent && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Meus Dados Acadêmicos
          </Typography>
          <Typography variant="body1">
            CPF: {loggedInStudent.cpf}
          </Typography>
        </Box>
      )}

      <StudentTable
        students={filteredStudents}
        enrollments={enrollments}
        grades={grades}
        page={page}
        rowsPerPage={rowsPerPage}
        onViewDetails={(student) => {
          setSelectedStudent(student);
          setOpenModal(true);
        }}
        onEnroll={(student) => {
          setSelectedStudent(student);
          setOpenEnrollmentModal(true);
        }}
        onViewGrades={(student) => {
          setSelectedStudentForGrades(student);
          setOpenGradesModal(true);
        }}
        hideActions={userType === 'aluno'} 
        showViewActions={userType === 'aluno'}
      />

      {userType === 'professor' && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          sx={Styles.paginationStyles}
        />
      )}

      <StudentDetailsModal
        open={openModal}
        student={selectedStudent}
        enrollments={selectedStudent ? getEnrollmentsByStudent(selectedStudent.id) : []}
        disciplines={disciplines}
        onClose={() => setOpenModal(false)}
        onEnroll={() => {
          setOpenModal(false);
          setOpenEnrollmentModal(true);
        }}
      />

      <StudentGradesModal
        open={openGradesModal}
        student={selectedStudentForGrades}
        enrollments={selectedStudentForGrades ? enrollments.filter(e => e.alunoId === selectedStudentForGrades.id) : []}
        grades={grades}
        disciplines={disciplines}
        onClose={() => setOpenGradesModal(false)}
      />

      {userType === 'professor' && (
        <EnrollmentModal
          open={openEnrollmentModal}
          student={selectedStudent}
          disciplines={disciplines}
          enrollments={selectedStudent ? getEnrollmentsByStudent(selectedStudent.id) : []}
          onClose={() => setOpenEnrollmentModal(false)}
          onEnroll={(data) => handleEnrollStudent({
            disciplinesIds: Array.isArray(data) ? data : data.disciplinesIds,
            studentCpf: selectedStudent?.cpf
          })}
        />
      )}
    </Box>
  );
};

export default StudentPage;