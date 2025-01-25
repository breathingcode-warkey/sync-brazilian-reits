import { ErrorsEnum } from '@/domain/enums'
import type { ApplicationErrors } from '@/application/contracts'

export interface ErrorContainerContract {
  make: (mistake: ApplicationErrors.Type) => Error
}

export namespace ErrorContainerContract {
  export type ErrorsType = ApplicationErrors.Type;
}
