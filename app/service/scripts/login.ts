import {login} from "@trader/api"

const withResult = await login({
  email: "adan@grr.la",
  password: "GEm4Fd.6qTgiL!2"
}, {
  headers: {
    "User-Agent": process.env.USER_AGENT || "",
  },
});
await Bun.write("login.json", JSON.stringify(withResult, null, 2));
