// appDrawer.data.tsx
import { ReactElement } from 'react';
import {
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  MenuBook as MenuBookIcon,
  School as SchoolIcon,
  Grade as GradeIcon,
  Event as CalendarIcon 
} from '@mui/icons-material';
import { MenuItem } from './appDrawer.type';

export const baseMenuItems: MenuItem[] = [
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
    path: '/minhas-notas',
    allowedRoles: ['aluno']
  },
  {
    text: 'Calendário',
    icon: <CalendarIcon />,
    path: '/calendario',
    allowedRoles: ['aluno', 'professor'] 
  },
];