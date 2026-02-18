const getScoreboard = async () => {
  const result = await fetch(
    "https://playtradecraft.com/api/scoreboard?page=1&limit=99",
    {
      headers: {
        Cookie: process.env.COOKIES || "",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0",
      },
    },
  );

  return await result.json();
};

const scoreboard = await getScoreboard();
await Bun.write("scoreboard.json", JSON.stringify(scoreboard, null, 2));
