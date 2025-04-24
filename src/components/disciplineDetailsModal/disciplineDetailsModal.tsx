import { Box, Typography } from '@mui/material';
import { GenericModal, DetailItem } from '../../components';
import { DisciplineDetailsModalProps} from './disciplineDetailsModal.type';

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
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Informações Básicas
            </Typography>
            <DetailItem label="Nome" value={discipline.nome} />
            <DetailItem label="Código" value={discipline.codigo} />
            <DetailItem label="Carga Horária" value={discipline.cargaHoraria ?? 'Não informado'} />
            <DetailItem label="Período" value={discipline.periodo ?? 'Não informado'} />
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Responsáveis
            </Typography>
            <DetailItem label="Professor" value={discipline.professor ?? 'Não informado'} />
            <DetailItem label="Departamento" value={discipline.departamento ?? 'Não informado'} />
            {discipline.preRequisitos && (
              <DetailItem
                label="Pré-requisitos"
                value={discipline.preRequisitos.join(', ')}
              />
            )}
          </Box>
        </Box>

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