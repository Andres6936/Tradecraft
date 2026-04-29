import { getLogger } from "@logtape/logtape";
import { login } from "@trader/api";

const logger = getLogger(["trader"]);

class TokenGuard {
  private static token = "";
  private static instance: TokenGuard;

  private constructor() {}

  public static getInstance(): TokenGuard {
    if (!TokenGuard.instance) {
      TokenGuard.instance = new TokenGuard();
    }

    return TokenGuard.instance;
  }

  public static getToken(): string {
    return TokenGuard.token;
  }

  public static async renewToken() {
    const response = await login({
      email: process.env.USERNAME || "",
      password: process.env.PASSWORD || "",
    }, {
      headers: {
        "User-Agent": process.env.USER_AGENT || "",
      }
    })

    if (response.statusCode === 401) {
      logger.fatal("The login action cannot authenticate user, response with 401", response)
      // Critical
    }

    if (response.statusCode === 501) {
      logger.fatal("The login action cannot resolve the request, response with 501", response)
      // Critical
    }

    if (response.statusCode === 200) {
      logger.info("The login action was successful, token renewed")
      TokenGuard.token = `token=${response.body.token};`;
    }
  }
}

export { TokenGuard }
