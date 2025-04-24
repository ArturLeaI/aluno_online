import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { AddButton } from '../../components';
import { DisciplineSearchHeaderProps } from './diciplineSearchHeader.type';

const DisciplineSearchHeader = ({
    searchTerm,
    onSearchChange
}: DisciplineSearchHeaderProps) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        width: '100%',
        gap: 2
    }}>
        <TextField
            placeholder="Buscar disciplinas..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{ flexGrow: 1, maxWidth: 500 }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: searchTerm && (
                    <InputAdornment position="end">
                        <IconButton size="small" onClick={() => onSearchChange('')}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />

        <AddButton
            routePath="/adicionar-materias"
            buttonText="Adicionar Matéria"
        />
    </Box>
);

export default DisciplineSearchHeader;