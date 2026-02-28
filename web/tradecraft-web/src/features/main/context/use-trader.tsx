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
      userId: string;
      isAllProductSelected: boolean;
      isOrdersMineOnly: boolean;
      onChangeOrdersMineOnly: (isOrdersMineOnly: boolean) => void;
      side: "buy" | "sell";
      onChangeSide: (side: "buy" | "sell") => void;
      orderType: "limit" | "market";
      onChangeOrderType: (orderType: "limit" | "market") => void;
      totalPrice: number;
      inventory: Record<string, number>;
      orders: ExternOrderType[];
      productGraph: {
        Avg: number;
        Min: number;
        Max: number;
      };
      isAllowNpc: boolean;
      onChangeAllowNpc: (allowNpc: boolean) => void;
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
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [isOrdersMineOnly, setIsOrdersMineOnly] = useState<boolean>(false);
  const [isAllowNpc, setIsAllowNpc] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(100);
  const [price, setPrice] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductType>(defaultValue);

  const onChangeSide = React.useEffectEvent((side: "buy" | "sell") => {
    if (side === 'buy') {
      setPrice(productGraph.Max);
    }
    if (side === 'sell') {
      setPrice(productGraph.Min);
    }
    setSide(side);
  })

  const query = useQuery({
    queryKey: [
      '/server/action/getOrders',
      `?ProductId=${selectedProduct.Id}&MineOrdersOnly=${isOrdersMineOnly}`,
    ],
    queryFn: () =>
      getState({
        productId: selectedProduct ? selectedProduct.Id : null,
        ordersMineOnly: isOrdersMineOnly,
      }),
  });

  if (query.error) {
    return (
      <TraderContext.Provider value={{ isLoading: false, error: query.error }}>
        {children}
      </TraderContext.Provider>
    );
  }

  if (query.isLoading || !query.isSuccess) {
    return (
      <TraderContext.Provider value={{ isLoading: true, error: null }}>
        {children}
      </TraderContext.Provider>
    );
  }

  const { userId, orders, inventory, productGraph } = query.data;

  return (
    <TraderContext.Provider
      value={{
        isLoading: false,
        error: null,
        orders,
        userId,
        isAllowNpc,
        onChangeAllowNpc: setIsAllowNpc,
        isOrdersMineOnly,
        onChangeOrdersMineOnly: setIsOrdersMineOnly,
        side,
        onChangeSide,
        orderType,
        onChangeOrderType: setOrderType,
        totalPrice: 0,
        inventory,
        productGraph,
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
