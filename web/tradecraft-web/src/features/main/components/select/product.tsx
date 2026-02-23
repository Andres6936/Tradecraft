"use client";

import instructions from "~/instructions.json" with { type: "json" };

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "~/components/ui/combobox";
import { useTraderContext } from "~/features/main/context/use-trader";
import { ProductType } from "~/features/main/types/d";

const defaultValue = { Id: -1, Key: "ALL", Name: "All products" };

function SelectProduct() {
  const { selectedProduct, onSelectProduct } = useTraderContext();

  return (
    <Combobox
      items={[defaultValue, ...instructions] as ProductType[]}
      itemToStringValue={(value) => value.Name}
      value={selectedProduct}
      onValueChange={(value) => onSelectProduct(value)}
    >
      <ComboboxInput placeholder="Select a product" />
      <ComboboxContent>
        <ComboboxEmpty>No products found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.Id} value={item}>
              {item.Name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export { SelectProduct };
