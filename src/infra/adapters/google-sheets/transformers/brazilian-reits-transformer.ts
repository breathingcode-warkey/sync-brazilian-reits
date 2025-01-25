import type { BrazilianReitsAgreement } from '@/infra/adapters/google-sheets/transformers'

export class BrazilianReitsTranformer {
  async compose (params: BrazilianReitsAgreement.Params): Promise<BrazilianReitsAgreement.Result> {
    if (!params.values) return undefined;
    const header = params.values[0];
    const expectedHeader = ['Ticker', 'Name', 'Value', 'Currency'];

    if (!header || !header.every((value, index) => value === expectedHeader[index])) {
      return undefined
    }

    const data: BrazilianReitsAgreement.Result = params.values.slice(1).map((row: (string | number)[]) => {
      const checkDataFormat = row.every(value => typeof value === "string");
      
      if (checkDataFormat) {
        const value = Number.parseFloat(row[2].replace(',', '.'));
        return {
          ticker: row[0],
          name: row[1],
          value: Number.isNaN(value) ? 0 : value,
          currency: row[3]
        };
      }      return null;
    }).filter((item): item is BrazilianReitsAgreement.Entity => item !== null);
    
    return data;
  }
}
