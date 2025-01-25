import type { EmailValidator } from '@/validation/protocols'
import { type TreatmentErrorContract, ApplicationErrors } from '@/application/contracts'
import type { Validation, InputType } from '@/presentation/interfaces'

export class EmailValidation implements Validation<InputType> {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
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

    const isValid = await this.emailValidator.isValid(value)
    if (!isValid) {
      return this.treatment.launchError({
        errorDescription: ApplicationErrors.Enumerable.MISSING_PARAM_ERROR,
        messageDescription: `Invalid e-mail provided:: ${String(input[this.fieldName])}`
      })
    }
  }
}
