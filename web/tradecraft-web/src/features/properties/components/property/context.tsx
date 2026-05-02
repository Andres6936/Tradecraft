import React from "react";
import { TilesType } from "@trader/api";

type PropertyContextProps = {
  property: TilesType
};

const PropertyContext = React.createContext<PropertyContextProps | undefined>(undefined);

const usePropertyContext = () => {
  const context = React.useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};

export { PropertyContext, usePropertyContext };
