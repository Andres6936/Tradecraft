import { useTraderContext } from "../context/use-trader";

const InfoSelected = () => {
  const { selectedProduct } = useTraderContext();

  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex flex-col">
        <p className="text-muted-foreground text-xs text-start">
          Selected Product
        </p>
        <p>{selectedProduct.Name}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-muted-foreground text-xs text-end">Stock</p>
        <p>0.00 lts(s)</p>
      </div>
    </div>
  );
};

export { InfoSelected };
