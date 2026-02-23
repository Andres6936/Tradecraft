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

const defaultValue = { Id: "ALL", Key: "ALL", Name: "All products" };

function SelectProduct() {
  return (
    <Combobox
      items={[defaultValue, ...instructions]}
      defaultValue={defaultValue.Name}
    >
      <ComboboxInput placeholder="Select a product" />
      <ComboboxContent>
        <ComboboxEmpty>No products found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.Id} value={item.Name}>
              {item.Name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export { SelectProduct };
