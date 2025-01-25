import { ApplicationErrors } from '@/application/contracts'
import type { TreatmentErrorContract } from '@/application/contracts'
import type { LoadAllBrazilianReitsRepository } from '@/application/contracts/repositories'
import type { SaveBrazilianReitsRepository } from '@/application/contracts/database'
import type { SyncBrazilianReitsUsecase } from '@/domain/usecases'

export class SyncBrazilianReitsService implements SyncBrazilianReitsUsecase {
  constructor(
    private readonly loadReits: LoadAllBrazilianReitsRepository,
    private readonly reits: SaveBrazilianReitsRepository,
    private readonly treatment: TreatmentErrorContract
  ) {}

  async perform(): Promise<SyncBrazilianReitsUsecase.Result> {

    const dataReits = await this.loadReits.loadAll()

    if (dataReits instanceof Error) {
      return this.treatment.launchError({
        errorDescription: ApplicationErrors.Enumerable.INVALID_ROUTE_ERROR,
        messageDescription: 'Failed to Load Reits'
      })
    }

    const dataInsert = await this.reits.saveReits(dataReits)

    console.log('Retorno Inserção Reits:: ', dataInsert);
    
    return true
  }
}
