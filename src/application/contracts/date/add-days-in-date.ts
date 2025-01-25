export interface AddDaysInDateContract {
  incrementDays: (
    params: AddDaysInDateContract.Params
  ) => Promise<AddDaysInDateContract.Result>
}

export namespace AddDaysInDateContract {
  export type Params = {
    initialDate: Date | string
    additionalDays: number
  }

  export type Result = string | false
}
