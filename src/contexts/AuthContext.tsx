"use client"

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import UserInfo from "@/types/UserInfo";

export const AuthContext = createContext<UserInfo | null>(null);

export function AuthContextProvider({children} : Readonly<{children : ReactNode}>) {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);