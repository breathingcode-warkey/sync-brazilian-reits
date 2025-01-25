import { Routes, type RouteConfig } from '@/main/config/abstract-routes'
import { 
  SyncBrazilianReitsControllerFactory,
  TransactionControllerControllerFactory
} from '@/main/factories/controllers'

export class AppRoutes extends Routes {
  override getRoutes(): RouteConfig[] {
    return [
      {
        route: {
          path: '/reits/all',
          method: 'POST'
        },
        controller: SyncBrazilianReitsControllerFactory.getInstance().make()
      },
      {
        route: {
          path: '/transaction/add',
          method: 'POST'
        },
        controller: TransactionControllerControllerFactory.getInstance().make()
      }
    ]
  }
}
