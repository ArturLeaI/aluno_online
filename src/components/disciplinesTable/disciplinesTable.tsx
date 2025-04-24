import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { DisciplinesTableProps } from './disciplinesTable.type';



const DisciplinesTable = ({
    disciplines,
    page,
    rowsPerPage,
    onOpenModal
}: DisciplinesTableProps) => (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="disciplines table">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Código</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Carga Horária</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Professor</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Ações</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {disciplines.length > 0 ? (
                    disciplines
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((discipline) => (
                            <TableRow
                                key={discipline.id}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{discipline.codigo}</TableCell>
                                <TableCell>{discipline.nome}</TableCell>
                                <TableCell>{discipline.cargaHoraria}</TableCell>
                                <TableCell>{discipline.professor}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={() => onOpenModal(discipline)}
                                        aria-label="ver detalhes"
                                        color="primary"
                                        size="small"
                                    >
                                        <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                            <Typography variant="body1">
                                {disciplines.length === 0
                                    ? 'Nenhuma disciplina cadastrada ainda.'
                                    : 'Nenhuma disciplina encontrada com os filtros atuais.'}
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </TableContainer>
);

export default DisciplinesTable