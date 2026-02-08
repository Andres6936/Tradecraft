import React, { useEffect } from "react";
import { getOrders, getPriceRange } from "../../api";
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
      Orders: any[];
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
    return await Promise.all([getPriceRange(props.Id), getOrders(props.Id)]);
  });

  if (isLoading || !data) {
    return (
      <ContextAnalytics.Provider
        value={{
          IsLoading: true,
          Id: props.Id,
          Name: props.Name,
        }}
      >
        {children}
      </ContextAnalytics.Provider>
    );
  }

  const [ranges, orders] = data;

  return (
    <ContextAnalytics.Provider
      value={{
        IsLoading: false,
        Id: props.Id,
        Name: props.Name,
        Avg: ranges.Avg,
        Min: ranges.Min,
        Max: ranges.Max,
        Orders: orders,
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
