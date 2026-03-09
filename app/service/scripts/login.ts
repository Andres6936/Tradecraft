const login = async () => {
  const result = await fetch(
    "https://playtradecraft.com/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        email: "adan@grr.la",
        password: "GEm4Fd.6qTgiL!2"
      }),
      headers: {
        'Content-Type': 'application/json',
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
      },
    },
  );

  return {
    status: result.status,
    cookies: result.headers.getSetCookie(),
    payload: await result.json()
  };
};

const withLogin = await login();
await Bun.write("login.json", JSON.stringify(withLogin, null, 2));
