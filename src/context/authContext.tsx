import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

export const initialUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  bio: "",
  imageUrl: "",
};

const initialState = {
  user: initialUser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(initialState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      router.push("/auth/signInForm");
    }

    checkAuthUser();
  }, []);

  const values = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => {
  return useContext(AuthContext);
};
