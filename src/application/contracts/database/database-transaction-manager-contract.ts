export interface DatabaseTransactionManagerContract {
  transaction: <T = unknown>(callback: () => T | Promise<T>) => Promise<T>
}
