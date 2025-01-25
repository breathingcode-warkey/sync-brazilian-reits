import type { BrazilianReitsAgreement } from '@/infra/adapters/google-sheets/transformers'
import type { TreatmentErrorContract } from '@/application/contracts'
import type { LoadAllBrazilianReitsRepository } from '@/application/contracts/repositories'
import { GoogleSheetsAdapter } from './google-sheets-adapter'
import type { ErrorsEnum } from '@/domain/enums'

export class ReitsGoogleSheetsStrategy
extends GoogleSheetsAdapter<
  BrazilianReitsAgreement.Result,
  LoadAllBrazilianReitsRepository.Result,
  BrazilianReitsAgreement
>
implements LoadAllBrazilianReitsRepository {

  protected launchError(params: { error: ErrorsEnum, message: string }):
  LoadAllBrazilianReitsRepository.Result {
    // Specific implementation for error handling
    return {
        name: params.error,
        message: params.message,
    } as LoadAllBrazilianReitsRepository.Result
  }

  // Specific implementation of the loadAll method
  override async loadAll(): Promise<LoadAllBrazilianReitsRepository.Result> {

    const isDataReits = await super.loadAll()
    return isDataReits
  }
}
