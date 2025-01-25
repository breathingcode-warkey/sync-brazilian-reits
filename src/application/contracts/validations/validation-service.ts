export interface InputObject {
  [key: string]: unknown
}

export interface ValidationServiceContract {
  validate: (input: InputObject) => Promise<Error | undefined>
}
