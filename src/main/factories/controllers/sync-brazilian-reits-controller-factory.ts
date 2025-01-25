import { SyncBrazilianReitsServiceFactory } from '@/main/factories/services'
import { RetryeValidationFactory } from '@/main/factories/validations'
import { SyncBrazilianReitsController } from '@/presentation/controllers'
import type { Controller } from '@/presentation/controllers/controller-abstract'

export class SyncBrazilianReitsControllerFactory {
  private static instance: SyncBrazilianReitsControllerFactory
  private instanceSyncBrazilianReitsController: Controller | undefined

  public static getInstance(): SyncBrazilianReitsControllerFactory {
    if (!SyncBrazilianReitsControllerFactory.instance) {
      SyncBrazilianReitsControllerFactory.instance = new SyncBrazilianReitsControllerFactory()
    }

    return SyncBrazilianReitsControllerFactory.instance
  }

  public make(): Controller {
    if (!this.instanceSyncBrazilianReitsController) {
      this.instanceSyncBrazilianReitsController = new SyncBrazilianReitsController(
        RetryeValidationFactory.getInstance().make(),
        SyncBrazilianReitsServiceFactory.getInstance().make()
      )
    }
    return this.instanceSyncBrazilianReitsController
  }
}
