import type { BrazilianReitEntity } from '@/domain/entities'

export interface SaveBrazilianReitsRepository {
  saveReits: (params: SaveBrazilianReitsRepository.Params) => 
  Promise<SaveBrazilianReitsRepository.Result>
}
  

export namespace SaveBrazilianReitsRepository {
  export type Result =  { registersUpdated: number }[] | Error

  export type Params = BrazilianReitEntity[]
}
