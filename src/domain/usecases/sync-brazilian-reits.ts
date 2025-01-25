export interface SyncBrazilianReitsUsecase {
  perform: () => 
  Promise<SyncBrazilianReitsUsecase.Result>
}
export namespace SyncBrazilianReitsUsecase {
  export type SuccessResult = true

  export type Result = SuccessResult | Error
}
