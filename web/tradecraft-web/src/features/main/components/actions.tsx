import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import type { ProductType } from "../types/d";
import { Button } from "~/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { useTraderContext } from "../context/use-trader";
import { useDispatchAction } from "~/hooks/use-dispatch-action";

// Actions
import { sendOrder } from "~/api";
import { toast } from "sonner";
import { Spinner } from "~/components/ui/spinner";

type ContextRootProps = {
  selectedProduct: ProductType;
  quantity: number;
  isAllowNpc: boolean;
  side: "buy" | "sell";
  orderType: "limit" | "market";
}

const ContextRoot = React.createContext<ContextRootProps | null>(null);

const useContextRoot = () => {
  const context = React.useContext(ContextRoot);
  if (!context) {
    throw new Error("useContextRoot must be used within a ContextRoot provider");
  }
  return context;
};

const Root = (props: React.PropsWithChildren<{}>) => (
  <div className="flex gap-2 items-center justify-between" {...props} />
);

const SkeletonLoading = () => {
  return (
    <Root>
      <ToggleGroup type="single" disabled={true}>
        <ToggleGroupItem value="buy">Buy</ToggleGroupItem>
        <ToggleGroupItem value="sell">Sell</ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup type="single" disabled={true}>
        <ToggleGroupItem value="limit">Limit</ToggleGroupItem>
        <ToggleGroupItem value="market">Market</ToggleGroupItem>
      </ToggleGroup>

      <Button disabled={true}>Order</Button>
    </Root>
  );
};

const ActionBuy = () => {
  const { selectedProduct, side, orderType, quantity, isAllowNpc } = useContextRoot()
  const { isLoading, dispatch } = useDispatchAction()

  const queryClient = useQueryClient();

  const dispatchSendOrder = () => dispatch(async () => {
    await sendOrder({
      productId: selectedProduct.Id,
      side,
      orderType,
      regionId: 1,
      npcAllow: isAllowNpc,
      qty: quantity,
      price: 0,
    });
    queryClient.invalidateQueries({queryKey: ["/server/action/getOrders"]})
  })

  const onPress = async () => {
    toast.promise(dispatchSendOrder, {
      loading: "Placing order...",
      success: "Order placed successfully!",
      error: "Failed to place order.",
    })
  }

  return (
    <Button onClick={onPress} disabled={isLoading}>
      { isLoading && <Spinner data-icon="inline-start"/> } Order
    </Button>
  )
}

const Actions = () => {
  const context = useTraderContext();

  if (context.isLoading) {
    return <SkeletonLoading />;
  }

  if (context.error) {
    return <p>Error: {context.error.message}</p>;
  }

  const { side, onChangeSide, orderType, onChangeOrderType } = context;

  return (
    <ContextRoot.Provider value={context}>
      <Root>
        <ToggleGroup
          variant="outline"
          type="single"
          value={side}
          onValueChange={(value) => onChangeSide(value as "buy" | "sell")}
        >
          <ToggleGroupItem value="buy">Buy</ToggleGroupItem>
          <ToggleGroupItem value="sell">Sell</ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          variant="outline"
          type="single"
          value={orderType}
          onValueChange={(value) =>
            onChangeOrderType(value as "limit" | "market")
          }
        >
          <ToggleGroupItem value="limit">Limit</ToggleGroupItem>
          <ToggleGroupItem value="market">Market</ToggleGroupItem>
        </ToggleGroup>

        <ActionBuy />
      </Root>
    </ContextRoot.Provider>
  );
};

export { Actions };
