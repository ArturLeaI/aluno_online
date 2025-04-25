import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, Tooltip } from '@mui/material';
import { People, Assessment, MenuBook, ChevronLeft, ChevronRight, School, ExitToApp, Event } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MenuItem } from './appDrawer.type';
import {
  StyledDrawer,
  DrawerHeader,
  listItemButtonStyles,
  listItemIconStyles,
  listItemTextStyles
} from './appDrawer.style';

type UserRole = 'aluno' | 'professor';

const AppDrawer: React.FC = () => {
  const [open, setOpen] = useState(true);
  const userType = localStorage.getItem('userType') as UserRole | null;

  const baseMenuItems: MenuItem[] = [
    { text: 'Alunos', icon: <People />, path: '/alunos', allowedRoles: ['aluno', 'professor'] },
    { text: 'Lançamento de Notas', icon: <Assessment />, path: '/lancar-notas', allowedRoles: ['professor'] },
    { text: 'Matérias', icon: <MenuBook />, path: '/materias', allowedRoles: ['professor'] },
    { text: 'Professores', icon: <School />, path: '/professores', allowedRoles: ['professor'] },
    { text: 'Calendário', icon: <Event />, path: '/calendario', allowedRoles: ['aluno', 'professor'] }
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
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      
      <Divider />
      
      <List>
        {menuItems.map(({ text, icon, path, color }) => (
          <ListItem key={text} disablePadding sx={{ display: 'block', color: color || 'inherit' }}>
            <ListItemButton component={Link} to={path} sx={listItemButtonStyles(open)}>
              <Tooltip title={!open ? text : ''} placement="right">
                <ListItemIcon sx={listItemIconStyles(open, color)}>
                  {icon}
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={text} sx={listItemTextStyles(open, color)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={listItemButtonStyles(open)}>
            <Tooltip title={!open ? "Sair" : ''} placement="right">
              <ListItemIcon sx={listItemIconStyles(open)}>
                <ExitToApp />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Sair" sx={listItemTextStyles(open)} />
          </ListItemButton>
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

export default AppDrawer;