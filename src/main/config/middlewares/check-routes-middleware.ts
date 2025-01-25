import type { MiddlewareInterface } from '@/main/config/middlewares'
import  { type TreatmentErrorContract, ApplicationErrors } from '@/application/contracts'
import { routeError } from '@/presentation/helpers'

import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export class CheckRoutesMiddleware
  implements MiddlewareInterface<APIGatewayProxyEvent, APIGatewayProxyResult>
{
  next!: MiddlewareInterface<APIGatewayProxyEvent, APIGatewayProxyResult>

  constructor(private readonly treatment: TreatmentErrorContract) {}

  async handle(request: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    if (!this.isValidRoute(request)) {
      return routeError(
        this.treatment.launchError({
          errorDescription: ApplicationErrors.Enumerable.NOT_FOUND_ROUTE_ERROR
        })
      )
    }
    if (!this.next) {
      throw this.treatment.launchError({
        errorDescription: ApplicationErrors.Enumerable.MIDDLEWARE_ERROR
      })
    }
    return this.next.handle(request)
  }

  isValidRoute(request: APIGatewayProxyEvent): boolean {
    return 'resource' in request && 'httpMethod' in request
  }
}
