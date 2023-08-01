import React, { createContext, useState } from "react";

export type typeContext = {
  user: user | null
  setUser: React.Dispatch<React.SetStateAction<user | null>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export type user = {
  userName: string
  password: string
}

type child = {
  children: React.ReactNode
}

export const AppContext = createContext<typeContext | undefined>(undefined)

const AppStore = (props: child) => {
  const [user, setUser] = useState<user | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <AppContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppStore
