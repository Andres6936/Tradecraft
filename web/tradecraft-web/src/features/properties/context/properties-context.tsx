import React from "react"
import { useQuery } from "@tanstack/react-query";
import { getAllTiles } from "../server/actions/get-tiles";
import { type TilesType } from "@trader/api";

type PropertiesContextProps =
| {
    isLoading: true;
    error: null;
  }
| {
    isLoading: false;
    error: Error;
}
  | {
    isLoading: false;
    isFetching: boolean;
    error: null;
    token: string,
    tiles: TilesType[],
  }

const PropertiesContext = React.createContext<PropertiesContextProps | undefined>(undefined)

const usePropertiesContext = () => {
  const context = React.useContext(PropertiesContext)
  if (!context) {
    throw new Error('usePropertiesContext must be used within a PropertiesContextProvider')
  }
  return context
}

const PropertiesContextProvider = ({ children, token }: React.PropsWithChildren<{ token: string }>) => {
  const query = useQuery({
    queryKey: [
      "/server/action/getTiles",
    ],
    queryFn:async () => {
      const result = await getAllTiles({ token })
      if (result.statusCode === 401) {
        window.location.href = "/login";
        throw new Error("Unauthorized");
      }
      return result.body;
    }
  })

  if (query.error) {
    return (
      <PropertiesContext.Provider value={{ isLoading: false, error: query.error }}>
        {children}
      </PropertiesContext.Provider>
    );
  }

  if (query.isLoading || !query.isSuccess) {
    return (
      <PropertiesContext.Provider value={{ isLoading: true, error: null }}>
        {children}
      </PropertiesContext.Provider>
    );
  }

  const tiles = query.data;

  return (
    <PropertiesContext.Provider value={{
      isFetching: query.isFetching,
      isLoading: false,
      error: null,
      token,
      tiles,
    }}>
      {children}
    </PropertiesContext.Provider>
  )
}

export { PropertiesContextProvider, usePropertiesContext }
