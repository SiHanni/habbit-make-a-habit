// 타이머 상태 전역관리
import React, {createContext, useState, ReactNode} from 'react';

interface TimerContextType {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TimerContext = createContext<TimerContextType | undefined>(
  undefined,
);

export const TimerProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [seconds, setSeconds] = useState(30 * 60); // 30 minutes
  const [isActive, setIsActive] = useState(false);

  return (
    <TimerContext.Provider value={{seconds, setSeconds, isActive, setIsActive}}>
      {children}
    </TimerContext.Provider>
  );
};
