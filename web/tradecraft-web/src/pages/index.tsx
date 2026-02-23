import { Trader as ViewTrader } from "~/view/trader";

export default async function HomePage() {
  return (
    <main>
      <title>Market</title>
      <ViewTrader />
    </main>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
