import {login} from "@trader/api"

const withResult = await login({
  email: "adan@grr.la",
  password: "GEm4Fd.6qTgiL!2"
}, {
  headers: {
    'Content-Type': 'application/json',
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
  },
});
await Bun.write("login.json", JSON.stringify(withResult, null, 2));
