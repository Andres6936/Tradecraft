import React, { useEffect } from "react";
import { getOrders, getPriceRange } from "~/api";
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
      Avg: string;
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
  Priority: "High" | "Medium" | "Low";
};

const AnalyticsProvider = ({
  children,
  ...props
}: React.PropsWithChildren<ProductType>) => {
  const { isLoading, data } = useQuery(async () => {
    await Bun.sleep(
      props.Priority === "High" ? 1 : props.Priority === "Medium" ? 1000 : 500,
    );
    const [resultRange, resultOrders] = await Promise.all([
      getPriceRange({ productId: props.Id }),
      getOrders(props.Id),
    ]);
    if (resultRange.statusCode === 401 || resultOrders.statusCode === 401) {
      throw new Error("Unauthorized 401");
    }
    return {
      ranges: resultRange.body,
      orders: resultOrders.body,
    };
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

  const {ranges, orders} = data;

  return (
    <ContextAnalytics.Provider
      value={{
        IsLoading: false,
        Id: props.Id,
        Name: props.Name,
        Avg: ranges.Avg.toString(),
        Min: ranges.Min.toString(),
        Max: ranges.Max.toString(),
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
