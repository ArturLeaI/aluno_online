import { Box, Typography } from '@mui/material';
import { GenericModal, DetailItem } from '../../components';
import { DisciplineDetailsModalProps } from './disciplineDetailsModal.type';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
    {children}
  </Typography>
);

const SectionContainer = ({ children }: { children: React.ReactNode }) => (
  <Box>{children}</Box>
);

const getFormattedValue = (value: string | string[] | number | null | undefined): string => {
  if (value === null || value === undefined) return 'Não informado';
  if (Array.isArray(value)) return value.join(', ');
  return String(value);
};

const renderDetailItems = (items: Array<{ label: string; value?: string | string[] | number | null }>) => {
  return items.map((item) => (
    <DetailItem 
      key={item.label} 
      label={item.label} 
      value={getFormattedValue(item.value)} 
    />
  ));
};

const DisciplineDetailsModal = ({
  open,
  onClose,
  discipline
}: DisciplineDetailsModalProps) => {
  if (!discipline) return null;

  const basicInfoItems = [
    { label: 'Nome', value: discipline.nome },
    { label: 'Código', value: discipline.code },
    { label: 'Carga Horária', value: discipline.cargaHoraria },
    { label: 'Período', value: discipline.periodo }
  ];

  const responsibleInfoItems = [
    { label: 'Professor', value: discipline.professor },
    { label: 'Departamento', value: discipline.departamento },
    { label: 'Pré-requisitos', value: discipline.preRequisitos }
  ];

  const basicInfoSection = renderDetailItems(basicInfoItems);
  const responsibleInfoSection = renderDetailItems(responsibleInfoItems);

  return (
    <GenericModal
      open={open}
      onClose={onClose}
      title={`Detalhes da Disciplina - ${discipline.nome}`}
      maxWidth="md"
    >
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { md: 'repeat(2, 1fr)' },
        gap: 3,
        mb: 3
      }}>
        <SectionContainer>
          <SectionTitle>Informações Básicas</SectionTitle>
          {basicInfoSection}
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>Responsáveis</SectionTitle>
          {responsibleInfoSection}
        </SectionContainer>
      </Box>

      <Box sx={{ mt: 3 }}>
        <SectionTitle>Descrição</SectionTitle>
        <Typography variant="body1" paragraph>
          {discipline.descricao || 'Nenhuma descrição fornecida.'}
        </Typography>
      </Box>
    </GenericModal>
  );
};

export default DisciplineDetailsModal;