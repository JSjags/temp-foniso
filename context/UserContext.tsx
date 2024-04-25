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
  const [userData, setUserData] = useState<UserData | null>(
    JSON.parse(localStorage.getItem("userData") || "null")
  );

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
