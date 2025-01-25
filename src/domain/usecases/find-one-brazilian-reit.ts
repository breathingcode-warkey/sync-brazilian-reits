import type { BrazilianReitEntity } from '@/domain/entities'

export interface FindOneBrazilianReitUsecase {
  perform: (paramns: FindOneBrazilianReitUsecase.Params) => 
  Promise<FindOneBrazilianReitUsecase.Result>
}
export namespace FindOneBrazilianReitUsecase {
  export type Params = {
    ticker?: string
    name?: string
  }

  export type Result = BrazilianReitEntity[] | Error
}
