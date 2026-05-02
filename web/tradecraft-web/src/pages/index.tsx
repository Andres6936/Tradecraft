import { ViewTabs } from "~/view/tabs";

export default async function HomePage() {
  return (
    <main>
      <title>Market</title>
      <ViewTabs />
    </main>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
