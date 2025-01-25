export interface TransformerSheets {
  compose: (params: TransformerSheets.Params) => Promise<unknown>; // Ajuste os tipos conforme necessário
}

export namespace TransformerSheets {
  export type Params = {
    range?: string | null
    majorDimension?: string | null
    values?: (string | number)[][] | null
  }
}
