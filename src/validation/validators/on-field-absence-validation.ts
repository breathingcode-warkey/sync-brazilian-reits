import type { Validation, InputType } from '@/presentation/interfaces'

export class OnFieldAbsenceValidation implements Validation<InputType> {
  constructor(
    private readonly fieldName: string,
    private readonly validation: Validation<InputType>
  ) {}

  async validate(input: InputType): Promise<Error | undefined> {
    const value = input[this.fieldName]
    if (!value) {
      return this.validation.validate(input)
    }
  }
}
