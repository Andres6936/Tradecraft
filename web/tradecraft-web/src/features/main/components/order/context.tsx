import React from "react";
import { ExternOrderType } from "~/types/d";

type OrderContextType = {
  order: ExternOrderType;
  isMineOrder: boolean;
};

const OrderContext = React.createContext<OrderContextType | null>(null);

const useOrderContext = () => {
  const context = React.useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};

export { OrderContext, useOrderContext };
