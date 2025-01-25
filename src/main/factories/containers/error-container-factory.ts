import {
  ServerError,
  TimeOutError,
  NotFoundError,
  MiddlewareError,
  UnavailableError,
  InvalidParamError,
  InvalidRouteError,
  MissingParamError,
  UnauthorizedError,
  MicroserviceError,
  NotFoundRouteError,
  DatabaseConnectError,
  IntegrationHubApiError,
  InvalidValueInEnumerableError,
} from '@/main/errors'
import { ApplicationErrors } from '@/application/contracts'
import type { ErrorContainerContract } from '@/application/contracts/containers'
import { ErrorContainer } from '@/infra/containers/'

type ErrorMap = Map<ApplicationErrors.Type, Error>

export class ErrorContainerFactory {
  private static instance: ErrorContainerFactory
  private instanceErrorContainer: ErrorContainer | undefined 

  private constructor() {}

  public static getInstance(): ErrorContainerFactory {
    if (!ErrorContainerFactory.instance) {
      ErrorContainerFactory.instance = new ErrorContainerFactory()
    }
    return ErrorContainerFactory.instance
  }

  make(): ErrorContainerContract {
    const errorsMap: ErrorMap = new Map<ApplicationErrors.Type, Error>([
      [ApplicationErrors.Enumerable.DATABASE_CONNECT_ERROR, new DatabaseConnectError()],
      [ApplicationErrors.Enumerable.INTEGRATION_HUB_API_ERROR, new IntegrationHubApiError()],
      [ApplicationErrors.Enumerable.INVALID_PARAM_ERROR, new InvalidParamError('')],
      [ApplicationErrors.Enumerable.INVALID_ROUTE_ERROR, new InvalidRouteError()],
      [ApplicationErrors.Enumerable.INVALID_VALUE_IN_ENUMERABLE_ERROR, new InvalidValueInEnumerableError()],
      [ApplicationErrors.Enumerable.MICROSERVICE_ERROR, new MicroserviceError('')],
      [ApplicationErrors.Enumerable.MIDDLEWARE_ERROR, new MiddlewareError()],
      [ApplicationErrors.Enumerable.MISSING_PARAM_ERROR, new MissingParamError('')],
      [ApplicationErrors.Enumerable.NOT_FOUND_ERROR, new NotFoundError('')],
      [ApplicationErrors.Enumerable.NOT_FOUND_ROUTE_ERROR, new NotFoundRouteError()],
      [ApplicationErrors.Enumerable.SERVER_ERROR, new ServerError()],
      [ApplicationErrors.Enumerable.TIME_OUT_ERROR, new TimeOutError()],
    ])

    if (!this.instanceErrorContainer) {
      this.instanceErrorContainer = new ErrorContainer(errorsMap)
    }

    return this.instanceErrorContainer
  }
}
