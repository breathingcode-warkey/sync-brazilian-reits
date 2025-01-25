import type { TransactionType } from '@/domain/enums'
export interface TransactionEntity {
  ticker: string;
  shareValue: number;
  quantity: number;
  date: string; // Formato: 'YYYY-MM-DD'
  totalPurchase: number;
  type: TransactionType
}
