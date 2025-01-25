import type { TransactionEntity } from '@/domain/entities'

export interface Wallet {
  userId: string;
  transactions: TransactionEntity[];
}
