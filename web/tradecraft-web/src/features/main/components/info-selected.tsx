import { Skeleton } from "~/components/ui/skeleton";
import { useTraderContext } from "../context/use-trader";

const Root = (props: React.PropsWithChildren<{}>) => (
  <div className="flex gap-2 items-center justify-between" {...props} />
);

const Row = (props: React.PropsWithChildren<{}>) => (
  <div className="flex flex-col" {...props} />
);

const ProductSelected = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Row>
      <p className="text-muted-foreground text-xs text-start">
        Selected Product
      </p>
      {children}
    </Row>
  );
};

const Stock = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Row>
      <p className="text-muted-foreground text-xs text-end">Stock</p>
      {children}
    </Row>
  );
};

const SkeletonLoading = () => {
  return (
    <Root>
      <ProductSelected>
        <Skeleton className="h-5 w-28" />
      </ProductSelected>
      <Stock>
        <Skeleton className="h-5 w-20 text-end" />
      </Stock>
    </Root>
  );
};

const InfoSelected = () => {
  const context = useTraderContext();

  if (context.isLoading) {
    return <SkeletonLoading />;
  }

  if (context.error) {
    return <p>Error: {context.error.message}</p>;
  }

  const { selectedProduct, inventory, isAllProductSelected } = context;

  return (
    <Root>
      <ProductSelected>
        <p>{selectedProduct.Name}</p>
      </ProductSelected>
      <Stock>
        <p className="text-end">
          {isAllProductSelected
            ? "All"
            : (inventory[selectedProduct.Key] || 0).toFixed(1) + " units"}
        </p>
      </Stock>
    </Root>
  );
};

export { InfoSelected };
