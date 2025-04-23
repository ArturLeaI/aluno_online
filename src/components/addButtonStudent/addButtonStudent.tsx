import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { AddButtonProps } from './addButtonStudent.type';
import { getButtonStyles } from './addButtonStudent.style';

const AddButton: React.FC<AddButtonProps> = ({
  routePath,
  buttonText,
  floatRight = true,
  startIcon = <AddIcon />,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  sx = {},
  ...props
}) => {
  const navigate = useNavigate();

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={() => navigate(routePath)}
      sx={getButtonStyles(floatRight, sx)}
      startIcon={startIcon}
      {...props}
    >
      {buttonText}
    </Button>
  );
};

export default AddButton;