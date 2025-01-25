import type { BrazilianReitEntity } from '@/domain/entities'

export interface LoadAllBrazilianReitsRepository {
  loadAll: () => Promise<LoadAllBrazilianReitsRepository.Result>
}
  

export namespace LoadAllBrazilianReitsRepository {
  export type Entity = BrazilianReitEntity

  export type Result = Entity[] | Error
}
