import { AccessToken } from '@/domain/value-objects'

export class AccessTokenFactory {
  private static instance: AccessTokenFactory
  private instanceAccessToken: AccessToken | undefined

  public static getInstance(): AccessTokenFactory {
    if (!AccessTokenFactory.instance) {
      AccessTokenFactory.instance = new AccessTokenFactory()
    }

    return AccessTokenFactory.instance
  }

  public make(): AccessToken {
    if (!this.instanceAccessToken) {
      this.instanceAccessToken = new AccessToken()
    }
    return this.instanceAccessToken
  }
}
