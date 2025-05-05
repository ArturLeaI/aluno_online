import { Assessment, Event, MenuBook, People, School } from "@mui/icons-material";
import { MenuItem } from "../components/appDrawer/appDrawer.type";

export const baseMenuItems: MenuItem[] = [
    { text: 'Alunos', icon: <People />, path: '/alunos', allowedRoles: ['aluno', 'professor'] },
    { text: 'Lançamento de Notas', icon: <Assessment />, path: '/lancar-notas', allowedRoles: ['professor'] },
    { text: 'Matérias', icon: <MenuBook />, path: '/materias', allowedRoles: ['professor'] },
    { text: 'Professores', icon: <School />, path: '/professores', allowedRoles: ['professor'] },
    { text: 'Calendário', icon: <Event />, path: '/calendario', allowedRoles: ['aluno', 'professor'] }
  ];