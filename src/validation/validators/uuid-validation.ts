import { type TreatmentErrorContract, ApplicationErrors } from '@/application/contracts'
import type { Validation, InputType } from '@/presentation/interfaces'

export class UuidValidation implements Validation<InputType> {
  constructor(
    private readonly fieldName: string,
    private readonly treatment: TreatmentErrorContract
  ) {}

  async validate(input: InputType): Promise<Error | undefined> {
    const uuidPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

    const value = input[this.fieldName]
    if (typeof value !== 'string') {
      return this.treatment.launchError({
        errorDescription: ApplicationErrors.Enumerable.MISSING_PARAM_ERROR,
        messageDescription: `Invalid enum value: ${String(value)}`
      })
    }

    const isValid = uuidPattern.test(value)

    if (!isValid) {
      return this.treatment.launchError({
        errorDescription: ApplicationErrors.Enumerable.INVALID_PARAM_ERROR,
        messageDescription: `Invalid uuid: ${String(input[this.fieldName])}`
      })
    }
  }
}
