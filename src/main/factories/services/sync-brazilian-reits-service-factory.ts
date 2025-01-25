import { TreatmentErrorAdapterFactory } from '@/main/factories/adapters'
import { ReitsGoogleSheetsStrategyFactory } from '@/main/factories/repositories'
import { BrazilianReitsRepositoryFactory } from '@/main/factories/repositories'
import { SyncBrazilianReitsService } from '@/application/services'


export class SyncBrazilianReitsServiceFactory {
  private static instance: SyncBrazilianReitsServiceFactory
  private syncBrazilianReitsServiceInstance: SyncBrazilianReitsService | undefined


  private constructor() {}

  public static getInstance(): SyncBrazilianReitsServiceFactory {
    if (!SyncBrazilianReitsServiceFactory.instance) {
      SyncBrazilianReitsServiceFactory.instance = new SyncBrazilianReitsServiceFactory()
    }

    return SyncBrazilianReitsServiceFactory.instance
  }

  public make(): SyncBrazilianReitsService {
    const range = 'Reits!A1:D475'
    if (!this.syncBrazilianReitsServiceInstance) {
      this.syncBrazilianReitsServiceInstance = new SyncBrazilianReitsService (
        ReitsGoogleSheetsStrategyFactory.getInstance().make(range),
        BrazilianReitsRepositoryFactory.getInstance().make(),
        TreatmentErrorAdapterFactory.getInstance().make()
      )
    }
    return this.syncBrazilianReitsServiceInstance
  }
}
