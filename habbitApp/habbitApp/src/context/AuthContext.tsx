// ContextAPI를 사용하여 로그인 상태, 사용자 정보 전역 관리

import React, {createContext, useContext, useState} from 'react';

type AuthContextType = {
  isLoggedIn: boolean | null;
  userInfo: {username: string; userId: number} | null;
  setIsLoggedIn: (value: boolean | null) => void;
  setUserInfo: (value: {username: string; userId: number} | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userInfo, setUserInfo] = useState<{
    username: string;
    userId: number;
  } | null>(null);

  return (
    <AuthContext.Provider
      value={{isLoggedIn, userInfo, setIsLoggedIn, setUserInfo}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
