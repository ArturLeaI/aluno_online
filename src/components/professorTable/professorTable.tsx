import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography
  } from '@mui/material';
  import { Visibility as VisibilityIcon } from '@mui/icons-material';
  
  interface ProfessoresTableProps {
    professores: any[];
    pagina: number;
    linhasPorPagina: number;
    onAbrirModal: (professor: any) => void;
  }
  
    const ProfessoresTable = ({
    professores,
    pagina,
    linhasPorPagina,
    onAbrirModal
  }: ProfessoresTableProps) => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tabela de professores">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>CPF</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Titulação</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {professores.length > 0 ? (
            professores
              .slice(pagina * linhasPorPagina, pagina * linhasPorPagina + linhasPorPagina)
              .map((professor) => (
                <TableRow 
                  key={professor.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{professor.nomeCompleto}</TableCell>
                  <TableCell>{professor.cpf}</TableCell>
                  <TableCell>{professor.email}</TableCell>
                  <TableCell>{professor.titulacao}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => onAbrirModal(professor)}
                      aria-label="ver detalhes"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
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
                  {professores.length === 0 
                    ? 'Nenhum professor cadastrado ainda.' 
                    : 'Nenhum professor encontrado com os filtros atuais.'}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
  export default ProfessoresTable