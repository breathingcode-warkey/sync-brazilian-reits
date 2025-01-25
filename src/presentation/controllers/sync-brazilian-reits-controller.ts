import type { Validation, InputType } from '@/presentation/interfaces'
import { Controller } from '@/presentation/controllers/controller-abstract'
import {
  type HttpResponse,
  type HttpRequest,
  success,
  badRequest,
  handleError
} from '@/presentation/helpers'
import type { SyncBrazilianReitsUsecase } from '@/domain/usecases'

type Request = {
  email: string
  retries: number,
  delay?: number
}

export class SyncBrazilianReitsController extends Controller {
  constructor(
    private readonly validation: Validation<InputType>,
    private readonly dataLoadReitsService: SyncBrazilianReitsUsecase
  ) {
    super()
  }

  override async perform(request: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(request.body as InputType)
    if (error) return badRequest(error)

    const { email, retries, delay } = request.body as Request

    if (
      typeof email !== 'string'
    ) {
      return badRequest(new Error('Invalid input types'))
    }

    const isResult = await this.dataLoadReitsService.perform()
    if (isResult instanceof Error) return handleError(isResult)

    return success({ data: isResult })
  }
}
