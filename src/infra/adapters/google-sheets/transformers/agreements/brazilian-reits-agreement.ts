import type { LoadAllBrazilianReitsRepository } from '@/application/contracts/repositories'

export interface BrazilianReitsAgreement {
  compose: (params: BrazilianReitsAgreement.Params) => Promise<BrazilianReitsAgreement.Result>
}

interface GoogleSheetsResponse {
  range?: string | null
  majorDimension?: string | null
  values?: (string | number)[][] | null
}

export namespace BrazilianReitsAgreement {
  export type Params = GoogleSheetsResponse

  export type Entity = LoadAllBrazilianReitsRepository.Entity

  export type Result = LoadAllBrazilianReitsRepository.Entity [] | undefined
}
