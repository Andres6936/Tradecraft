import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { ProductType } from "~/features/main/types/d";
import { defaultValue } from "~/features/main/utils/setup";
import { getState } from "~/features/main/server/actions/get-state";
import { ExternOrderType } from "~/types/d";

type TraderContextProps =
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
      error: null;
      isAllProductSelected: boolean;
      inventory: Record<string, number>;
      orders: ExternOrderType[];
      quantity: number;
      onChangeQuantity: (quantity: number) => void;
      price: number;
      onChangePrice: (price: number) => void;
      selectedProduct: ProductType;
      onSelectProduct: (id: ProductType) => void;
    };

const TraderContext = React.createContext<TraderContextProps | null>(null);

const useTraderContext = () => {
  const context = React.useContext(TraderContext);
  if (!context) {
    throw new Error(
      "useTraderContext must be used within a TraderContextProvider",
    );
  }
  return context;
};

const TraderContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [quantity, setQuantity] = useState<number>(100);
  const [price, setPrice] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductType>(defaultValue);

  const query = useQuery({
    queryKey: [`/server/action/getOrders?`, selectedProduct],
    queryFn: () =>
      getState({
        productId: selectedProduct ? selectedProduct.Id : null,
      }),
  });

  if (query.isLoading || !query.data) {
    return (
      <TraderContext.Provider value={{ isLoading: true, error: null }}>
        {children}
      </TraderContext.Provider>
    );
  }

  if (query.error) {
    return (
      <TraderContext.Provider value={{ isLoading: false, error: query.error }}>
        {children}
      </TraderContext.Provider>
    );
  }

  const { orders, inventory } = query.data;

  return (
    <TraderContext.Provider
      value={{
        isLoading: false,
        error: null,
        orders,
        inventory,
        isAllProductSelected: selectedProduct.Id === defaultValue.Id,
        quantity,
        onChangeQuantity: setQuantity,
        price,
        onChangePrice: setPrice,
        selectedProduct,
        onSelectProduct: setSelectedProduct,
      }}
    >
      {children}
    </TraderContext.Provider>
  );
};

export { TraderContextProvider, useTraderContext };
