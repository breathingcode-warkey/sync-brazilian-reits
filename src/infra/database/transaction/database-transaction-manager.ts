import type { DatabaseConnection, SQLConnection } from '@/infra/database'
import type { DatabaseTransactionManagerContract } from '@/application/contracts/database'

export class DatabaseTransactionManager
  implements DatabaseTransactionManagerContract
{
  constructor(
    private readonly databaseConnection: SQLConnection & DatabaseConnection
  ) {}

  async transaction<T>(callback: () => T | Promise<T>): Promise<T> {
    return this.databaseConnection.transaction(callback)
  }
}
