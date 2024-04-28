// UserContext.tsx
"use client";

import { UserData } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  let storedUserData: UserData | null = null;

  if (typeof window !== "undefined") {
    const item = localStorage.getItem("userData");
    storedUserData = item ? JSON.parse(item) : null;
  }

  const [userData, setUserData] = useState<UserData | null>(storedUserData);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
