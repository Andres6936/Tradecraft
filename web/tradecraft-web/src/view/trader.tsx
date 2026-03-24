"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { TraderContextProvider } from "~/features/main/context/use-trader";
import { HistoryChart } from "~/features/main/components/history-chart";
import { BuyerSell } from "~/features/main/components/buyersell";

// Context
import { useLoginContext } from "~/features/login/context/use-login";

const Trader = () => {
  const { isAuthenticated, token } = useLoginContext();
  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  return (
    <TraderContextProvider token={token}>
      <main className="flex flex-row gap-2">
        <BuyerSell/>
        <section className="flex flex-col gap-2">
          <HistoryChart />
          <Card className="flex flex-1 flex-col w-full min-w-xl max-w-xl">
            <CardHeader>
              <CardTitle>Market View</CardTitle>
            </CardHeader>
            <CardContent>
              <section></section>
            </CardContent>
          </Card>
        </section>
      </main>
    </TraderContextProvider>
  );
};

export { Trader };
