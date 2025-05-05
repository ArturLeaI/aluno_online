import React, { useState } from 'react';
import { Box, Button, Divider, Paper, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DetailItem from '../../detailItem/detailItem';
import GenericModal from '../../genericModal/genericModal';
import { StudentDetailsModalProps } from './studentDetailsModal.type';
import { personalInfoBoxStyle, sectionTitleStyle, tableContainerStyle, tableRowHeaderStyle, chipStyle } from './studentDetailsModal.style';

type ChipColor = 'success' | 'primary' | 'default';
type StatusProps = { label: string; color: ChipColor };

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
  open, student, enrollments = [], disciplines = [], onClose, onEnroll, isProfessor = false
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  if (!student) return null;

  const getDiscipline = (id: string) => 
    disciplines.find(d => d.id === id) || { id: 'N/A', name: 'Desconhecida', codigo: 'N/A' };

  const getStatusProps = (status: string): StatusProps => {
    const statusMap: Record<string, StatusProps> = {
      'concluído': { label: 'Aprovado', color: 'success' },
      'ativo': { label: 'Cursando', color: 'primary' }
    };
    return statusMap[status] || { label: 'Inativo', color: 'default' };
  };

  const personalInfoItems = [
    { label: 'Nome Completo', value: student.nomeCompleto },
    { label: 'Data de Nascimento', value: student.dataNascimento },
    { label: 'Sexo', value: student.sexo || 'Não informado' },
    { label: 'Estado Civil', value: student.estadoCivil || 'Não informado' }
  ];

  const additionalInfoItems = [
    { label: 'CPF', value: student.cpf || 'Não informado' },
    { label: 'Contato', value: student.contato || 'Não informado' },
    { label: 'Nacionalidade', value: student.nacionalidade || 'Não informado' }
  ];

  const renderDetailItems = (items: Array<{label: string, value: string}>) => 
    items.map((item, i) => <DetailItem key={i} {...item} />);

  return (
    <GenericModal open={open} onClose={onClose} title={`Detalhes do Aluno - ${student.nomeCompleto}`} maxWidth="md">
      <Tabs value={selectedTab} onChange={(_, v) => setSelectedTab(v)} sx={{ mb: 3 }}>
        {['Informações Pessoais', 'Matrículas'].map((label, i) => 
          <Tab key={i} label={label} />
        )}
      </Tabs>

      {selectedTab === 0 && (
        <>
          <Box sx={personalInfoBoxStyle}>
            <Box>
              <Typography variant="subtitle1" sx={sectionTitleStyle}>Dados Pessoais</Typography>
              {renderDetailItems(personalInfoItems)}
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={sectionTitleStyle}>Informações Adicionais</Typography>
              {renderDetailItems(additionalInfoItems)}
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {selectedTab === 1 && (
        <Box sx={tableContainerStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Histórico de Matrículas</Typography>
            {isProfessor && (
              <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={onEnroll} sx={{ textTransform: 'none' }}>
                Nova Matrícula
              </Button>
            )}
          </Box>

          {enrollments.length > 0 ? (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead sx={tableRowHeaderStyle}>
                  <TableRow>
                    {['Período', 'Disciplina', 'CH', 'Média', 'Situação'].map((header, i) => 
                      <TableCell key={i} sx={{ fontWeight: 'bold' }} align={i > 1 ? 'center' : 'left'}>
                        {header}
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enrollments.map(enrollment => {
                    const { label, color } = getStatusProps(enrollment.status);
                    const discipline = getDiscipline(enrollment.disciplinaId);
                    
                    return (
                      <TableRow key={enrollment.id}>
                        <TableCell>{enrollment.periodo || '---'}</TableCell>
                        <TableCell>{discipline.codigo} - {discipline.name}</TableCell>
                        <TableCell align="center">80</TableCell>
                        <TableCell align="center">{enrollment.status === 'concluído' ? 'MM' : '---'}</TableCell>
                        <TableCell align="center">
                          <Chip label={label} color={color} size="small" sx={chipStyle} />
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