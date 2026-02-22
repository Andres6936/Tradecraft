import { Link } from "waku";
import { Counter } from "~/components/counter";
import { SelectProduct } from "~/components/select/product";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default async function HomePage() {
  const data = await getData();

  return (
    <div>
      <title>{data.title}</title>
      <h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Market Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <SelectProduct />
        </CardContent>
      </Card>
      <Link to="/about" className="mt-4 inline-block underline">
        About page
      </Link>
    </div>
  );
}

const getData = async () => {
  const data = {
    title: "Waku",
    headline: "Waku",
    body: "Hello world!",
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
