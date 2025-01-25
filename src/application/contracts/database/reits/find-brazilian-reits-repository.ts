import type { BrazilianReitEntity } from '@/domain/entities'

export interface FindBrazilianReitsRepository {
  find: (params: FindBrazilianReitsRepository.Filters) => 
  Promise<FindBrazilianReitsRepository.Result>
}
  

export namespace FindBrazilianReitsRepository {
  export type Result = BrazilianReitEntity[]
  
  export type Entity  = BrazilianReitEntity

  export type Filters = {
    ticker?: string
    name?: string
  }
}
