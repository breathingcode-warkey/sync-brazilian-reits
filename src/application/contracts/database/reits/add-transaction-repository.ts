import type { TransactionEntity } from '@/domain/entities'

export interface AddTransactionRepository {
  add: (params: AddTransactionRepository.Params) => 
  Promise<AddTransactionRepository.Result>
}
  

export namespace AddTransactionRepository {
  export type Result = boolean
  
  export type Entity  = TransactionEntity & { userId: string }

  export type Params = Entity
}
