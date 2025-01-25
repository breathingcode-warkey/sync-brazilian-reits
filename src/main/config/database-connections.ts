import { variables } from '@/main/config/variables'
import {
  MongoConnectionFactory,
} from '@/main/factories/connections'
import type {
  NoSQLConnection,
  DatabaseConnection
} from '@/infra/database/connections'

export const DatabaseConnections: DatabaseConnectionsType<DatabaseConnection> =
  {
    mongo: MongoConnectionFactory.getInstance().make(
      `mongodb://${variables.dbMongo.user}:${encodeURIComponent(variables.dbMongo.pass)}@${variables.dbMongo.url}:${variables.dbMongo.port}`,
      {
        tls: variables.dbMongo.ssl === 'true',
        tlsCAFile: variables.dbMongo.ssl === 'true' ? 'global-bundle.pem' : '',
        retryWrites: false
      }
    )
  }

type DatabaseConnectionsType<T> = {
  mongo: T & NoSQLConnection
}
