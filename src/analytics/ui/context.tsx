import React, { useEffect } from "react";
import { getPriceRange } from "../../api";
import { useQuery } from "./hooks";

type ContextAnalyticsProps =
  | {
      IsLoading: true;
      Id: number;
      Name: string;
    }
  | {
      IsLoading: false;
      Id: number;
      Name: string;
      Avg: number;
      Min: string;
      Max: string;
    };

const ContextAnalytics = React.createContext<ContextAnalyticsProps | null>(
  null,
);

type ProductType = {
  Id: number;
  Name: string;
};

const AnalyticsProvider = ({
  children,
  ...props
}: React.PropsWithChildren<ProductType>) => {
  const { isLoading, data } = useQuery(async () => {
    return await getPriceRange(props.Id);
  });

  if (isLoading || !data) {
    return (
      <ContextAnalytics.Provider value={{
        IsLoading: true,
        Id: props.Id,
        Name: props.Name,
      }}>
        {children}
      </ContextAnalytics.Provider>
    )
  }

  return (
    <ContextAnalytics.Provider
      value={{
        IsLoading: false,
        Id: props.Id,
        Name: props.Name,
        Avg: data.Avg,
        Min: data.Min,
        Max: data.Max,
      }}
    >
      {children}
    </ContextAnalytics.Provider>
  );
};

const useContextAnalytics = () => {
  const context = React.useContext(ContextAnalytics);
  if (!context) {
    throw new Error(
      "useContextAnalytics must be used within a ContextAnalyticsProvider",
    );
  }
  return context;
};

export { AnalyticsProvider, useContextAnalytics };
