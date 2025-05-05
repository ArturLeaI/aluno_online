import { Box, Typography } from '@mui/material';
import GenericModal from '../../genericModal/genericModal';
import DetailItem from '../../detailItem/detailItem';
import { ProfessorDetailsModalProps } from './professorDetailsModal.type';

const ProfessorDetailsModal = ({
  open,
  onClose,
  professor
}: ProfessorDetailsModalProps) => {
  const renderPersonalInfoSection = () => (
    <Box>
      <SectionTitle>Informações Pessoais</SectionTitle>
      <DetailItem label="Nome Completo" value={professor?.nomeCompleto || ''} />
      <DetailItem label="CPF" value={professor?.cpf || ''} />
      <DetailItem label="Data de Nascimento" value={professor?.dataNascimento || ''} />
      <DetailItem label="Sexo" value={professor?.sexo || ''} />
    </Box>
  );

  const renderProfessionalInfoSection = () => (
    <Box>
      <SectionTitle>Informações Profissionais</SectionTitle>
      <DetailItem label="Email" value={professor?.email || ''} />
      <DetailItem label="Titulação" value={professor?.titulacao || ''} />
      <DetailItem label="Área de Atuação" value={professor?.areaAtuacao || ''} />
      <DetailItem label="Data de Contratação" value={professor?.dataContratacao || ''} />
    </Box>
  );

  const renderContactSection = () => (
    <Box>
      <SectionTitle>Contato e Endereço</SectionTitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: { md: 'repeat(2, 1fr)' }, gap: 3 }}>
        <Box>
          <DetailItem label="Telefone" value={professor?.telefone || 'Não informado'} />
          <DetailItem label="Celular" value={professor?.celular || 'Não informado'} />
        </Box>
        <Box>
          <DetailItem label="Endereço" value={professor?.endereco || 'Não informado'} />
          <DetailItem label="CEP" value={professor?.cep || 'Não informado'} />
        </Box>
      </Box>
    </Box>
  );

  interface SectionTitleProps {
    children: React.ReactNode;
  }

  const SectionTitle = ({ children }: SectionTitleProps) => (
    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
      {children}
    </Typography>
  );

  if (!professor) return null;

  return (
    <GenericModal
      open={open}
      onClose={onClose}
      title={`Detalhes do Professor - ${professor.nomeCompleto}`}
      maxWidth="md"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
        {renderPersonalInfoSection()}
        {renderProfessionalInfoSection()}
      </Box>
      {renderContactSection()}
    </GenericModal>
  );
};

export default ProfessorDetailsModal;