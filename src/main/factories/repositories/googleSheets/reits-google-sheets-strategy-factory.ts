import { variables } from '@/main/config/variables'
import { TreatmentErrorAdapterFactory } from '@/main/factories/adapters'
import { BrazilianReitsTranformerFactory } from '@/main/factories/transformers'
import { ReitsGoogleSheetsStrategy } from '@/infra/adapters/google-sheets'

export class ReitsGoogleSheetsStrategyFactory {
  private static instance: ReitsGoogleSheetsStrategyFactory
  private instanceReitsGoogleSheetsStrategy: ReitsGoogleSheetsStrategy | undefined

  public static getInstance(): ReitsGoogleSheetsStrategyFactory {
    if (!ReitsGoogleSheetsStrategyFactory.instance) {
      ReitsGoogleSheetsStrategyFactory.instance =
        new ReitsGoogleSheetsStrategyFactory()
    }

    return ReitsGoogleSheetsStrategyFactory.instance
  }

  public make(range: string): ReitsGoogleSheetsStrategy {
    if (!this.instanceReitsGoogleSheetsStrategy) {
      this.instanceReitsGoogleSheetsStrategy = new ReitsGoogleSheetsStrategy(
        BrazilianReitsTranformerFactory.getInstance().make(),
        TreatmentErrorAdapterFactory.getInstance().make(),
        variables.credentialsPath,
        variables.googleSheets.spreadSheetId,
        range,
        variables.googleSheets.authScope,
      )
    }
    return this.instanceReitsGoogleSheetsStrategy
  }
}
