import React, { useState } from "react";
import type { ProductType } from "~/features/main/types/d";

type TraderContextProps = {
  selectedProduct: ProductType | null;
  onSelectProduct: (id: ProductType | null) => void;
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
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );

  return (
    <TraderContext.Provider
      value={{ selectedProduct, onSelectProduct: setSelectedProduct }}
    >
      {children}
    </TraderContext.Provider>
  );
};

export { TraderContextProvider, useTraderContext };
