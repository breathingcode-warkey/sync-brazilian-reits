import type { TransactionEntity } from '@/domain/entities'

export interface InsertTransactionUsecase {
  perform: (params: InsertTransactionUsecase.Params) => 
  Promise<InsertTransactionUsecase.Result>
}
export namespace InsertTransactionUsecase {
  export type Params = Omit<TransactionEntity, 'type'> & {
    userId: string;
  };

  export type Result = boolean
}
