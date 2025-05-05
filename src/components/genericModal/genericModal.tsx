import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { GenericModalProps } from './genericModal.type';
import { modalBoxStyle, headerStyle, contentStyle } from './genericModal.style';

const GenericModal: React.FC<GenericModalProps> = ({ open, onClose, title, children,width = { xs: '90%', sm: '80%', md: '700px' },maxWidth}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-modal`}
    >
      <Box sx={modalBoxStyle(width, maxWidth)}>
        <Box sx={headerStyle}>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <IconButton onClick={onClose} aria-label="fechar modal">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={contentStyle}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default GenericModal;
