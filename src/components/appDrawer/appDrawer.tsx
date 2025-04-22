import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  styled,
  Theme,
  CSSObject,
  Tooltip
} from '@mui/material';
import {
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  MenuBook as MenuBookIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  School as SchoolIcon,
  ExitToApp as ExitToAppIcon,
  Grade as GradeIcon,
  Event as CalendarIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  color?: string;
  allowedRoles: ('aluno' | 'professor')[];
}

const AppDrawer: React.FC = () => {
  const [open, setOpen] = useState(true);
  const userType = localStorage.getItem('userType') as 'aluno' | 'professor' | null;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const baseMenuItems: MenuItem[] = [
    {
      text: 'Alunos',
      icon: <PeopleIcon />,
      path: '/alunos',
      allowedRoles: ['professor']
    },
    {
      text: 'Lançamento de Notas',
      icon: <AssessmentIcon />,
      path: '/lancar-notas',
      allowedRoles: ['professor']
    },
    {
      text: 'Matérias',
      icon: <MenuBookIcon />,
      path: '/materias',
      allowedRoles: ['professor']
    },
    {
      text: 'Professores',
      icon: <SchoolIcon />,
      path: '/professores',
      allowedRoles: ['professor']
    },
    {
      text: 'Minhas Notas',
      icon: <GradeIcon />,
      path: '/alunos',
      allowedRoles: ['aluno']
    },
    
    {
      text: 'Calendário',
      icon: <CalendarIcon />,
      path: '/calendario',
      allowedRoles: ['aluno', 'professor'] 
    },
  ];

  const menuItems = baseMenuItems
    .filter(item => userType && item.allowedRoles.includes(userType))
    .sort((a, b) => a.text.localeCompare(b.text));

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userCPF');
    window.location.href = '/login';
  };

  return (
    <StyledDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text}
            disablePadding
            sx={{
              display: 'block',
              color: item.color || 'inherit',
            }}
          >
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <Tooltip title={!open ? item.text : ''} placement="right">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: item.color || 'inherit'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: open ? 1 : 0,
                  color: item.color || 'inherit'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Tooltip title={!open ? "Sair" : ''} placement="right">
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <ExitToAppIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText 
              primary="Sair" 
              sx={{ opacity: open ? 1 : 0 }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

export default AppDrawer;