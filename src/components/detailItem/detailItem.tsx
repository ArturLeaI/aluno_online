import React from 'react';
import { Box, Typography } from '@mui/material';
import { DetailItemProps } from './detailItem.type';

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography variant="body2" color="text.secondary">
      {label}:
    </Typography>
    <Typography variant="body1">
      {value}
    </Typography>
  </Box>
);

export default DetailItem;