import type { TransformerSheets } from '@/infra/adapters/google-sheets/transformers'
import { ErrorsEnum } from '@/domain/enums'
import type { TreatmentErrorContract } from '@/application/contracts'

import { google } from 'googleapis'
import { promises as fs } from 'node:fs'
import type { GaxiosResponse } from 'gaxios'

/*
R: BrazilianReitsAgreement.Result <Retorno do Transformer>, 
RSP: LoadAllBrazilianReitsRepository.Result <Result do Repository>
Transformer: BrazilianReitsAgreement <Tipo Transformer>
*/

// Abstract Class
export abstract class GoogleSheetsAdapter<R, RSP, Transformer extends TransformerSheets> {
  private readonly errorMessage = 'Failed to render Google Sheets data.'
  private readonly error = ErrorsEnum.INTEGRATION_HUB_API_ERROR

  constructor(
    protected readonly transformer: Transformer,
    protected readonly treatment: TreatmentErrorContract,
    protected readonly credentialPath: string,
    protected readonly spreadSheetId: string,
    protected readonly rangeSheet: string,
    protected readonly authScope: string
  ) {}

  async loadAll(): Promise<RSP> {
    try {
      //Using the parameters defined in the Strategy instance
      const { spreadSheetId, rangeSheet } = this
     
      // Reads the credentials JSON file
      const credentials = JSON.parse(
        await fs.readFile(this.credentialPath, 'utf-8')
      )
      
      // Configure authentication
      const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: [this.authScope],
      })

      // Initializes the Google Sheets API client
      const sheets = google.sheets({ version: 'v4', auth })

      // Spreadsheet ID (taken from the Google Sheets spreadsheet URL)
      const spreadsheetId = spreadSheetId

      // Cell range containing the GOOGLEFINANCE formula for the action
      const range = rangeSheet

      // Makes the request to get the spreadsheet data
      const response: GaxiosResponse<TransformerSheets.Params> = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range,
      })

      // Check if the data was found
      if (response.data.values) {
        const actionsData = await this.transformer.compose(response.data) as R
        if (!actionsData) return this.launchError({ error: this.error, message: this.errorMessage }) 

        return actionsData as RSP // Returning the handled error
      }
    } catch (error) {
        console.error('Erro ao autenticar:', error)
        return this.launchError({ error: this.error, message: this.errorMessage })
    }

    return this.launchError({ error: this.error, message: this.errorMessage })
  }

  protected abstract launchError(params: { error: ErrorsEnum, message: string }): RSP;
}


