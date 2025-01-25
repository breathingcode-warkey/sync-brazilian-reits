import { BrazilianReitsTranformer } from '@/infra/adapters/google-sheets/transformers'

export class BrazilianReitsTranformerFactory {
  private static instance: BrazilianReitsTranformerFactory
  private instanceBrazilianReitsTranformer: BrazilianReitsTranformer | undefined

  public static getInstance(): BrazilianReitsTranformerFactory {
    if (!BrazilianReitsTranformerFactory.instance) {
      BrazilianReitsTranformerFactory.instance = new BrazilianReitsTranformerFactory()
    }

    return BrazilianReitsTranformerFactory.instance
  }

  public make(): BrazilianReitsTranformer {
    if (!this.instanceBrazilianReitsTranformer) {

      this.instanceBrazilianReitsTranformer =  new BrazilianReitsTranformer()
    }
    return this.instanceBrazilianReitsTranformer
  }
}
