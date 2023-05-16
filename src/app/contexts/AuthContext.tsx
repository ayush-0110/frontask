import * as React from 'react';
import { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  lastCompletedClueIndex: number;
  setLastCompletedClueIndex: React.Dispatch<React.SetStateAction<number>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  timeTaken: number;
  setTimeTaken: React.Dispatch<React.SetStateAction<number>>;
  bestTime: number;
  setBestTime: React.Dispatch<React.SetStateAction<number>>;
  startTime: number;
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
  endTime: number;
  setEndTime: React.Dispatch<React.SetStateAction<number>>;
  totalTimeTaken: number;
  setTotalTimeTaken: React.Dispatch<React.SetStateAction<number>>;
}

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  lastCompletedClueIndex: 0,
  setLastCompletedClueIndex: () => {},
  user: null,
  setUser: () => {},
  score: 0,
  setScore: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  timeTaken: 0,
  setTimeTaken: () => {},
  bestTime: 0,
  setBestTime: () => {},
  startTime: 0,
  setStartTime: () => {},
  endTime: 0,
  setEndTime: () => {},
  totalTimeTaken: 0,
  setTotalTimeTaken: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastCompletedClueIndex, setLastCompletedClueIndex] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [score, setScore] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [bestTime, setBestTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [totalTimeTaken, setTotalTimeTaken] = useState<number>(0);
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    lastCompletedClueIndex,
    setLastCompletedClueIndex,
    user,
    setUser,
    score,
    setScore,
    isAdmin,
    setIsAdmin,
    timeTaken,
    setTimeTaken,
    bestTime,
    setBestTime,
    setStartTime,
    startTime,
    endTime,
    setEndTime,
    totalTimeTaken,
    setTotalTimeTaken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
