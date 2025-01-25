import type { Validation, InputType } from '@/presentation/interfaces'
import { Controller } from '@/presentation/controllers/controller-abstract'
import {
  type HttpResponse,
  type HttpRequest,
  success,
  badRequest,
  handleError
} from '@/presentation/helpers'
import type { InsertTransactionUsecase } from '@/domain/usecases'

type Request = {
  ticker: string
  shareValue: number
  quantity: number
  date: string // Formato: 'YYYY-MM-DD'
  totalPurchase: number
  userId: string
}

export class TransactionController extends Controller {
  constructor(
    private readonly validation: Validation<InputType>,
    private readonly insertTransactionService: InsertTransactionUsecase
  ) {
    super()
  }

  override async perform(request: HttpRequest): Promise<HttpResponse> {
    //const error = await this.validation.validate(request.body as InputType)
    //if (error) return badRequest(error)

    const { ticker, quantity, shareValue, date, totalPurchase, userId} = request.body as Request

    if (
      typeof userId !== 'string'
    ) {
      return badRequest(new Error('Invalid input types'))
    }

    const isResult = await this.insertTransactionService.perform({
      ticker,
      shareValue,
      quantity,
      date,
      totalPurchase,
      userId,
    })

    //if (isResult instanceof Error) return handleError(isResult)

    return success({ data: isResult })
  }
}
