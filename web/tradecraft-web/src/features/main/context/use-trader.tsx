import React, { useState } from "react";
import type { ProductType } from "~/features/main/types/d";

import { defaultValue } from "~/features/main/utils/setup";

type TraderContextProps = {
  isAllProductSelected: boolean;
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

  return (
    <TraderContext.Provider
      value={{
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
