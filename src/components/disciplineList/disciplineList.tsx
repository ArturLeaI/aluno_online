import React from 'react';
import { Typography, Box, IconButton, Stack } from '@mui/material';
import CardDefault from '../cardDefault/cardDefault';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { cardContainer } from '../../pages/diciplinePage/diciplinePage.style';


interface DisciplineListProps {
    disciplines: any[];
    onOpenModal: (discipline: any) => void;
}

const DisciplineList: React.FC<DisciplineListProps> = ({ disciplines, onOpenModal }) => {
    return (
        <Stack spacing={2}>
            {disciplines.length > 0 ? (
                disciplines.map((discipline, index) => (
                    <CardDefault key={index}>
                        <Box sx={cardContainer}>
                            <Box>
                                <Typography variant="h5" gutterBottom>
                                    {discipline.nome}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Código: {discipline.codigo} | Carga Horária: {discipline.cargaHoraria}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Professor: {discipline.professor}
                                </Typography>
                            </Box>
                            <IconButton onClick={() => onOpenModal(discipline)} aria-label="ver detalhes">
                                <VisibilityIcon />
                            </IconButton>
                        </Box>
                    </CardDefault>
                ))
            ) : (
                <CardDefault>
                    <Typography variant="body1">Nenhuma disciplina cadastrada ainda.</Typography>
                </CardDefault>
            )}
        </Stack>
    );
};

export default DisciplineList;
