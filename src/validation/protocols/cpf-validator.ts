export interface CpfValidator {
  isValid: (cpf: string) => Promise<boolean>
}
