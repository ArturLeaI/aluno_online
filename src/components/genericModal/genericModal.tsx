import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string | number;
  maxWidth?: string | number;
}

const GenericModal: React.FC<GenericModalProps> = ({ 
  open, 
  onClose, 
  title, 
  children,
  width = { xs: '90%', sm: '80%', md: '700px' },
  maxWidth
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-modal`}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width,
        maxWidth: maxWidth,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        maxHeight: '90vh',
        overflowY: 'auto',
        '&:focus-visible': {
          outline: 'none'
        }
      }}>
        {/* Modal Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1
        }}>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <IconButton onClick={onClose} aria-label="fechar modal">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Modal Body - conteúdo injetado via children */}
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default GenericModal;