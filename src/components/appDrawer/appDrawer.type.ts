import { ReactNode } from 'react';

export type UserRole = 'aluno' | 'professor';

export interface MenuItem {
  text: string;
  icon: ReactNode;
  path: string;
  color?: string;
  allowedRoles: UserRole[];
}