class CookiesGuard {
  private cookies: string= '';

  public setCookies(cookies: string) {
    this.cookies = cookies;
  }

  public getCookies(): string {
    return this.cookies;
  }
}

class CookiesSingleton {
  private static instance: CookiesGuard;

  /**
    * The Singleton's constructor should always be private to prevent direct
    * construction calls with the `new` operator.
    */
  private constructor() { }

  public static getInstance(): CookiesGuard {
    if (!CookiesSingleton.instance) {
      CookiesSingleton.instance = new CookiesGuard();
    }
    return CookiesSingleton.instance;
  }

  public setCookies(cookies: string) {
    CookiesSingleton.instance.setCookies(cookies);
  }

  public getCookies(): string {
    return CookiesSingleton.instance.getCookies();
  }
}

export {CookiesSingleton}
