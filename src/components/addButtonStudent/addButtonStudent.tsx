import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

interface AddButtonProps extends ButtonProps {
  routePath: string;       
  buttonText: string;      
  floatRight?: boolean;    
  startIcon?: React.ReactNode; 
}

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
      sx={{
        gap: 1,
        textTransform: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        marginBottom: '15px',
        ...(floatRight && { ml: 'auto' }),
        ...sx,
      }}
      startIcon={startIcon}
      {...props}
    >
      {buttonText}
    </Button>
  );
};

export default AddButton;