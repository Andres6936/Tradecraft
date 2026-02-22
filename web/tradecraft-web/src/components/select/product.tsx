"use client";

import instructions from "~/instructions.json" with { type: "json" };

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

function SelectProduct() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a product" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Products</SelectLabel>
          {instructions.map((it) => (
            <SelectItem key={it.Id} value={it.Key}>
              {it.Name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { SelectProduct };
