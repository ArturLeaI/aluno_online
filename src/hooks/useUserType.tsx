import { useEffect, useState } from 'react';

type UserType = 'aluno' | 'professor' | null;

export const useUserType = (): UserType => {
  const [userType, setUserType] = useState<UserType>(null);

  useEffect(() => {
    const type = localStorage.getItem('userType') as UserType;
    setUserType(type);
  }, []);

  return userType;
};