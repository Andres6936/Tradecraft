const Cookies =
  "_ga=GA1.1.441914417.1766004593; lang=en; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2OTQzMTdiZGExMzY3MzRmM2MxNGQ4ZWEiLCJlbWFpbCI6ImFkYW5AZ3JyLmxhIiwibGFuZ3VhZ2UiOiJlbiIsImlhdCI6MTc3MDAzODQyNSwiZXhwIjoxNzcwNjQzMjI1fQ.J4ccesIHvin_X8Jb0jaPLGzbVyO3WezmkQNXORM5kx4; _ga_G00BHW6280=GS2.1.s1770563675$o102$g0$t1770563675$j60$l0$h0";


await fetch("https://playtradecraft.com/api/orders", {
  method: "POST",
  body: JSON.stringify({
    qty: 500,
    price: 29.77,
    productId: 25,
    regionId: 5,
    side: "buy",
    orderType: "limit",
    npcAllow: true,
  }),
  headers: {
    "Content-Type": "application/json",
    Cookie: Cookies,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
  },
});
