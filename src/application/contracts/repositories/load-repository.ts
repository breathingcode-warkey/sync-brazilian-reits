export interface LoadRepository<T, R = unknown> {
  load: (filters?: T) => Promise<R>
}
