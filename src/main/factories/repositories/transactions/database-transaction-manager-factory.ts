import type { DatabaseConnection, SQLConnection } from '@/infra/database'
import { DatabaseTransactionManager } from '@/infra/database/transaction'

export class DatabaseTransactionManagerFactory {
  private static instance: DatabaseTransactionManagerFactory
  private instanceDatabaseTransactionManager: DatabaseTransactionManager | undefined

  public static getInstance(): DatabaseTransactionManagerFactory {
    if (!DatabaseTransactionManagerFactory.instance) {
      DatabaseTransactionManagerFactory.instance =
        new DatabaseTransactionManagerFactory()
    }

    return DatabaseTransactionManagerFactory.instance
  }

  public make(
    connection: DatabaseConnection & SQLConnection
  ): DatabaseTransactionManager {
    if (!this.instanceDatabaseTransactionManager) {
      this.instanceDatabaseTransactionManager = new DatabaseTransactionManager(connection)
    }
    return this.instanceDatabaseTransactionManager
  }
}
