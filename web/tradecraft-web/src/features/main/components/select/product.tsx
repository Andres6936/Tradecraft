"use client";

import instructions from "~/instructions.json" with { type: "json" };
import type { ProductType } from "~/features/main/types/d";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "~/components/ui/combobox";
import { useTraderContext } from "~/features/main/context/use-trader";
import { defaultValue } from "~/features/main/utils/setup";

const Skeleton = () => {
  return (
    <Combobox disabled={true}>
      <ComboboxInput placeholder="Loading..." />
      <ComboboxContent />
    </Combobox>
  );
};

function SelectProduct() {
  const context = useTraderContext();

  if (context.isLoading) {
    return <Skeleton />;
  }

  if (context.error) {
    return <p>Error: {context.error.message}</p>;
  }

  const { selectedProduct, onSelectProduct } = context;

  return (
    <Combobox
      items={[defaultValue, ...instructions] as ProductType[]}
      itemToStringValue={(value) => value.Name}
      itemToStringLabel={(value) => value.Name}
      value={selectedProduct}
      onValueChange={(value) => onSelectProduct(value || defaultValue)}
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
