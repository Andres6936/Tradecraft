import React, { useState } from "react";

type TraderContextProps = {
  selectedProductId: number | "ALL" | null;
  onSelectProductId: (id: number) => void;
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
  const [selectedProductId, setSelectedProductId] = useState<
    number | "ALL" | null
  >(null);

  return (
    <TraderContext.Provider
      value={{ selectedProductId, onSelectProductId: setSelectedProductId }}
    >
      {children}
    </TraderContext.Provider>
  );
};

export { TraderContextProvider, useTraderContext };
