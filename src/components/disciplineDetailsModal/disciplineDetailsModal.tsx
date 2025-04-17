import { Box, Typography } from '@mui/material';
import { GenericModal, DetailItem } from '../../components';

interface DisciplineDetailsModalProps {
  open: boolean;
  onClose: () => void;
  discipline: any;
}

 const DisciplineDetailsModal = ({
  open,
  onClose,
  discipline
}: DisciplineDetailsModalProps) => (
  <GenericModal
    open={open}
    onClose={onClose}
    title={`Detalhes da Disciplina - ${discipline?.nome || ''}`}
    maxWidth="md"
  >
    {discipline && (
      <>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { md: 'repeat(2, 1fr)' },
          gap: 3,
          mb: 3
        }}>
          {/* Coluna 1 - Informações Básicas */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Informações Básicas
            </Typography>
            <DetailItem label="Nome" value={discipline.nome} />
            <DetailItem label="Código" value={discipline.codigo} />
            <DetailItem label="Carga Horária" value={discipline.cargaHoraria} />
            <DetailItem label="Período" value={discipline.periodo} />
          </Box>

          {/* Coluna 2 - Responsáveis */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Responsáveis
            </Typography>
            <DetailItem label="Professor" value={discipline.professor} />
            <DetailItem label="Departamento" value={discipline.departamento} />
            {discipline.preRequisitos && (
              <DetailItem
                label="Pré-requisitos"
                value={discipline.preRequisitos.join(', ')}
              />
            )}
          </Box>
        </Box>

        {/* Descrição */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Descrição
          </Typography>
          <Typography variant="body1" paragraph>
            {discipline.descricao || 'Nenhuma descrição fornecida.'}
          </Typography>
        </Box>
      </>
    )}
  </GenericModal>
);
export default DisciplineDetailsModal