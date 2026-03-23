import { Login as ViewLogin } from "~/view/login";

export default async function LoginPage() {
  return (
    <main>
      <title>Market</title>
      <ViewLogin />
    </main>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
