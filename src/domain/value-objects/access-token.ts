export class AccessToken {
  constructor(readonly accessToken?: string) {}

  static get expirationInMs(): number {
    return 30 * 60 * 1000
  }

  setValue(accessToken: string): AccessToken {
    return this.accessToken === accessToken
      ? this
      : new AccessToken(accessToken)
  }
}
