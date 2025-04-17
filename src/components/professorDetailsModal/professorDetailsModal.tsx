import { Box, Typography } from '@mui/material';
import GenericModal from '../genericModal/genericModal';
import DetailItem from '../detailItem/detailItem';

interface ProfessorDetailsModalProps {
    open: boolean;
    onClose: () => void;
    professor: any;
}

const ProfessorDetailsModal = ({
    open,
    onClose,
    professor
}: ProfessorDetailsModalProps) => (
    <GenericModal
        open={open}
        onClose={onClose}
        title={`Detalhes do Professor - ${professor?.nomeCompleto || ''}`}
        maxWidth="md"
    >
        {professor && (
            <>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                    gap: 3,
                    mb: 3
                }}>
                    {/* Coluna 1 - Informações Pessoais */}
                    <Box>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Informações Pessoais
                        </Typography>
                        <DetailItem label="Nome Completo" value={professor.nomeCompleto} />
                        <DetailItem label="CPF" value={professor.cpf} />
                        <DetailItem label="Data de Nascimento" value={professor.dataNascimento} />
                        <DetailItem label="Sexo" value={professor.sexo} />
                    </Box>

                    {/* Coluna 2 - Informações Profissionais */}
                    <Box>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Informações Profissionais
                        </Typography>
                        <DetailItem label="Email" value={professor.email} />
                        <DetailItem label="Titulação" value={professor.titulacao} />
                        <DetailItem label="Área de Atuação" value={professor.areaAtuacao} />
                        <DetailItem label="Data de Contratação" value={professor.dataContratacao} />
                    </Box>
                </Box>

                {/* Contato e Endereço */}
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Contato e Endereço
                    </Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { md: 'repeat(2, 1fr)' },
                        gap: 3
                    }}>
                        <Box>
                            <DetailItem label="Telefone" value={professor.telefone} />
                            <DetailItem label="Celular" value={professor.celular} />
                        </Box>
                        <Box>
                            <DetailItem label="Endereço" value={professor.endereco} />
                            <DetailItem label="CEP" value={professor.cep} />
                        </Box>
                    </Box>
                </Box>
            </>
        )}
    </GenericModal>
);

export default ProfessorDetailsModal
