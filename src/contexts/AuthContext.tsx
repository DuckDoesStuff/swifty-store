"use client"

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import UserInfo from "@/types/UserInfo";


export interface IAuthContext{
  user: UserInfo | null;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthContextProvider({children} : Readonly<{children : ReactNode}>) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(loading)
      fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + "/session/customer", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      })
        .then(async (response) => {
          const result = await response.json();
          if (result.statusCode === 200) {
            setUser(result.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setUser(null);
          setLoading(false);
        });
  }, [loading]);

  return (
    <AuthContext.Provider value={{user, setLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  // Rest of the hook
  return useContext(AuthContext);
}