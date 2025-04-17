import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DetailItem from '../detailItem/detailItem';
import GenericModal from '../genericModal/genericModal';

interface Student {
  id: string;
  nomeCompleto: string;
  dataNascimento: string;
  cpf?: string;
  sexo?: string;
  estadoCivil?: string;
  contato?: string;
  nacionalidade?: string;
}

interface Discipline {
  id: string;
  codigo: string;
  nome: string;
}

interface Enrollment {
  id: string;
  disciplinaId: string;
  periodo: string;
  status: 'ativo' | 'inativo' | 'concluído';
}

interface StudentDetailsModalProps {
  open: boolean;
  student: Student | null;
  enrollments: Enrollment[];
  disciplines: Discipline[];
  onClose: () => void;
  onEnroll: () => void;
  isProfessor?: boolean; // Adicionei esta propriedade
}

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
  open,
  student,
  enrollments,
  disciplines,
  onClose,
  onEnroll,
  isProfessor = false // Valor padrão false
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const getDisciplineInfo = (id: string) => {
    return disciplines.find(d => d.id === id) || { nome: 'Desconhecida', codigo: 'N/A', professor: 'N/A' };
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  if (!student) return null;

  return (
    <GenericModal
      open={open}
      onClose={onClose}
      title={`Detalhes do Aluno - ${student.nomeCompleto}`}
      maxWidth="md"
    >
      <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Informações Pessoais" />
        <Tab label="Matrículas" />
      </Tabs>

      {selectedTab === 0 && (
        <>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
            mb: 3
          }}>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                Dados Pessoais
              </Typography>
              <DetailItem label="Nome Completo" value={student.nomeCompleto} />
              <DetailItem label="Data de Nascimento" value={student.dataNascimento} />
              <DetailItem label="Sexo" value={student.sexo || 'Não informado'} />
              <DetailItem label="Estado Civil" value={student.estadoCivil || 'Não informado'} />
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                Informações Adicionais
              </Typography>
              <DetailItem label="CPF" value={student.cpf || 'Não informado'} />
              <DetailItem label="Contato" value={student.contato || 'Não informado'} />
              <DetailItem label="Nacionalidade" value={student.nacionalidade || 'Não informado'} />
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {selectedTab === 1 && (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Histórico de Matrículas
            </Typography>
            {isProfessor && ( // Só mostra o botão se for professor
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={onEnroll}
                sx={{ textTransform: 'none' }}
              >
                Nova Matrícula
              </Button>
            )}
          </Box>

          {enrollments.length > 0 ? (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Período</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Disciplina</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">CH</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Média</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Situação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enrollments.map((enrollment) => {
                    const discipline = getDisciplineInfo(enrollment.disciplinaId);
                    return (
                      <TableRow key={enrollment.id}>
                        <TableCell>{enrollment.periodo || '---'}</TableCell>
                        <TableCell>
                          {discipline.codigo} - {discipline.nome}
                        </TableCell>
                        <TableCell align="center">80</TableCell>
                        <TableCell align="center">
                          {enrollment.status === 'concluído' ? 'MM' : '---'}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={enrollment.status === 'concluído' ? 'Aprovado' :
                              enrollment.status === 'ativo' ? 'Cursando' : 'Inativo'}
                            color={enrollment.status === 'concluído' ? 'success' :
                              enrollment.status === 'ativo' ? 'primary' : 'default'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              Nenhuma matrícula registrada para este aluno.
            </Typography>
          )}
        </Box>
      )}
    </GenericModal>
  );
};

export default StudentDetailsModal;