import { ApplicationErrors } from '@/application/contracts'
import type { TreatmentErrorContract } from '@/application/contracts'
import type { LoadAllBrazilianReitsRepository } from '@/application/contracts/repositories'
import type { FindBrazilianReitsRepository } from '@/application/contracts/database'
import type { FindOneBrazilianReitUsecase } from '@/domain/usecases'

export class FindOneBrazilianReitService implements FindOneBrazilianReitUsecase {
  constructor(
    private readonly loadReit: LoadAllBrazilianReitsRepository,
    private readonly findReitsRepository: FindBrazilianReitsRepository,
    private readonly treatment: TreatmentErrorContract
  ) {}

  async perform(): Promise<FindOneBrazilianReitUsecase.Result> {

    const isStock = await this.findReitsRepository.find({ticker: 'PETR4'})
    if (isStock instanceof Error) {
      return this.treatment.launchError({
        errorDescription: ApplicationErrors.Enumerable.MISSING_PARAM_ERROR,
        messageDescription: 'Failed to Load Reits'
      })
    }

    console.log('Data Reits:: ', isStock)

    return isStock
  }
}
