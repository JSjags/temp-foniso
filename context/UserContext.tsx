// UserContext.tsx
"use client";

import { PostMeta, User, UserData } from "@/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  currentPost: PostMeta | null;
  setCurrentPost: (data: PostMeta | null) => void;
  updateUserData: (data: User) => void;
  showCreatePost: boolean;
  setShowCreatePost: Dispatch<SetStateAction<boolean>>;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
  updateUserData: () => {},
  currentPost: null,
  setCurrentPost: () => {},
  showCreatePost: false,
  setShowCreatePost: () => {},
  logoutUser: () => {},
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
  const [currentPost, setCurrentPost] = useState<PostMeta | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const updateUserData = (data: User) => {
    if (userData) {
      setUserData((prev) => (prev ? { ...prev, user: data } : null));
      const updatedUser = { ...userData, user: data };
      localStorage.removeItem("userData");
      localStorage.setItem("userData", JSON.stringify(updatedUser));
    }
  };

  const logoutUser = () => {
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        updateUserData,
        showCreatePost,
        setShowCreatePost,
        logoutUser,
        currentPost,
        setCurrentPost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
