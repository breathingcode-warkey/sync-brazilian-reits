import type { Validation, InputType } from '@/presentation/interfaces'
import { RequireFieldValidation } from '@/validation/validators'
import { ValidationComposite } from '@/validation/validation-composite'
import { TreatmentErrorAdapterFactory } from '@/main/factories/adapters'

export class RetryeValidationFactory {
  private static instance: RetryeValidationFactory
  private instanceValidationComposite: ValidationComposite | undefined

  public static getInstance(): RetryeValidationFactory {
    if (!RetryeValidationFactory.instance) {
      RetryeValidationFactory.instance = new RetryeValidationFactory()
    }

    return RetryeValidationFactory.instance
  }

  public make(): ValidationComposite {
    const validations: Validation<InputType>[] = []
    for (const field of ['email', 'accessToken']) {
      validations.push(
        new RequireFieldValidation(
          field,
          TreatmentErrorAdapterFactory.getInstance().make()
        )
      )
    }

    if (!this.instanceValidationComposite) {
      this.instanceValidationComposite = new ValidationComposite(validations)
    }
    return  this.instanceValidationComposite
  }
}
