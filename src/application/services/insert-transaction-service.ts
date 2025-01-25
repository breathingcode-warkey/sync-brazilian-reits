import type { InsertTransactionUsecase } from '@/domain/usecases'
import type { AddTransactionRepository } from '@/application/contracts/database'
import { TransactionType } from '@/domain/enums'

export class InsertTransactionService implements InsertTransactionUsecase {
constructor (
  private readonly addTransactionRepository: AddTransactionRepository
) {}

  async perform (params: InsertTransactionUsecase.Params): Promise<InsertTransactionUsecase.Result> {
    const { ticker, shareValue, quantity, date, totalPurchase } = params

    const type = TransactionType.Compra
    const paramsBuy = Object.assign({}, params, { type: type});

    const teste = await this.addTransactionRepository.add(paramsBuy)

    console.log('Retorno Inserção Transaction:: ', teste);

    console.log('PARAMS:: ', params)
    return true
  }
}
