import { type TreatmentErrorContract, ApplicationErrors } from '@/application/contracts'
import type { Validation, InputType } from '@/presentation/interfaces'

export class EnumValidation implements Validation<InputType> {
  constructor(
    private readonly fieldName: string,
    private readonly valueList: string[],
    private readonly treatment: TreatmentErrorContract
  ) {}

  async validate(input: InputType): Promise<Error | undefined> {
    const value = input[this.fieldName]

    if (typeof value !== 'string') {
      return this.treatment.launchError({
        errorDescription: ApplicationErrors.Enumerable.MISSING_PARAM_ERROR,
        messageDescription: `Invalid enum value: ${String(value)}`
      })
    }

    const isValid = !this.valueList.includes(value)
    if (isValid) {
      return this.treatment.launchError({
        errorDescription: ApplicationErrors.Enumerable.MISSING_PARAM_ERROR,
        messageDescription: `Invalid enum value: ${value}`
      })
    }
  }
}
