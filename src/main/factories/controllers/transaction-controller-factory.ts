import { InsertTransactionServiceFactory } from '@/main/factories/services'
import { RetryeValidationFactory } from '@/main/factories/validations'
import { TransactionController } from '@/presentation/controllers'
import type { Controller } from '@/presentation/controllers/controller-abstract'

export class TransactionControllerControllerFactory {
  private static instance: TransactionControllerControllerFactory
  private instanceTransactionController: Controller | undefined

  public static getInstance(): TransactionControllerControllerFactory {
    if (!TransactionControllerControllerFactory.instance) {
      TransactionControllerControllerFactory.instance = new TransactionControllerControllerFactory()
    }

    return TransactionControllerControllerFactory.instance
  }

  public make(): Controller {
    if (!this.instanceTransactionController) {
      this.instanceTransactionController = new TransactionController(
        RetryeValidationFactory.getInstance().make(),
        InsertTransactionServiceFactory.getInstance().make()
      )
    }
    return this.instanceTransactionController
  }
}
