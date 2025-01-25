import { DatabaseConnections } from '@/main/config/database-connections'
import { BrazilianReitsRepository } from '@/infra/database/repositories'
import type { MongoConnection } from '@/infra/database/connections'

export class BrazilianReitsRepositoryFactory {
  private static instance: BrazilianReitsRepositoryFactory
  private instanceReitsRepository: BrazilianReitsRepository | undefined

  public static getInstance(): BrazilianReitsRepositoryFactory {
    if (!BrazilianReitsRepositoryFactory.instance) {
      BrazilianReitsRepositoryFactory.instance =
        new BrazilianReitsRepositoryFactory()
    }

    return BrazilianReitsRepositoryFactory.instance
  }

  public make(): BrazilianReitsRepository {
    if (!this.instanceReitsRepository) {
      this.instanceReitsRepository = new BrazilianReitsRepository(
        DatabaseConnections.mongo as MongoConnection
      )
    }
    return this.instanceReitsRepository
  }
}
