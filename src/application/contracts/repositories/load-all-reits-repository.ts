import type { LoadRepository } from '@/application/contracts/repositories'
import type { BrazilianReitEntity } from '@/domain/entities'

export interface LoadAllReitsRepository<T, R> extends LoadRepository<T, R | undefined> {}

/* export namespace LoadAllReitsRepository {
  export type Filters = {
    email: string
  }

  export type Entity = BrazilianReitEntity

  export type Result = Entity[] | Error
} */
