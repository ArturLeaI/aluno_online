import React, { useState } from 'react';
import { Box, Button, Divider, Paper, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DetailItem from '../detailItem/detailItem';
import GenericModal from '../genericModal/genericModal';
import { StudentDetailsModalProps, Discipline } from './studentDetailsModal.type';
import { personalInfoBoxStyle, sectionTitleStyle, tableContainerStyle, tableRowHeaderStyle, chipStyle } from './studentDetailsModal.style';

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({open,student, enrollments, disciplines, onClose, onEnroll,isProfessor = false}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const getDisciplineInfo = (id: string): Discipline => {
    return (
      disciplines.find(d => d.id === id) || 
      { id: 'N/A', name: 'Desconhecida', codigo: 'N/A' }
    );
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
          <Box sx={personalInfoBoxStyle}>
            <Box>
              <Typography variant="subtitle1" sx={sectionTitleStyle}>
                Dados Pessoais
              </Typography>
              <DetailItem label="Nome Completo" value={student.nomeCompleto} />
              <DetailItem label="Data de Nascimento" value={student.dataNascimento} />
              <DetailItem label="Sexo" value={student.sexo || 'Não informado'} />
              <DetailItem label="Estado Civil" value={student.estadoCivil || 'Não informado'} />
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={sectionTitleStyle}>
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
        <Box sx={tableContainerStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Histórico de Matrículas
            </Typography>
            {isProfessor && (
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
                <TableHead sx={tableRowHeaderStyle}>
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
                          {discipline.codigo} - {discipline.name}
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
                            sx={chipStyle}
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
