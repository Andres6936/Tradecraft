"use client"

import React from "react"
import { useLocalStorage } from "@uidotdev/usehooks";

type ContextLoginProps = {
  isAuthenticated: boolean,
  token: string
  setToken: (token: string) => void
}

const LoginContext = React.createContext<ContextLoginProps | null>(null)

const LoginContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [token, setToken] = useLocalStorage('@Token', '')

  return (
    <LoginContext.Provider value={{
      isAuthenticated: token.length > 0,
      token,
      setToken
    }}>
      {children}
    </LoginContext.Provider>
  )
}

const useLoginContext = () => {
  const context = React.useContext(LoginContext)
  if (!context) {
    throw new Error("useLogin must be used within a ContextLogin provider")
  }
  return context
}

export { LoginContextProvider , useLoginContext }
