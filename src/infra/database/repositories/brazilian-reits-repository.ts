import type { MongoConnection } from '@/infra/database/connections'
import type { 
  SaveBrazilianReitsRepository,
  FindBrazilianReitsRepository,
  AddTransactionRepository
} from '@/application/contracts/database'

export class BrazilianReitsRepository implements SaveBrazilianReitsRepository,
 FindBrazilianReitsRepository {
  constructor(
    private readonly mongoConnection: MongoConnection
  ) {}

  async find(params: FindBrazilianReitsRepository.Filters):
  Promise<FindBrazilianReitsRepository.Result> {
    const { ticker, name } = params
    try {

      const filter = {
        $or: [
          { ticker: ticker }, // Busca pelo ticker
          { name: { $regex: name, $options: 'i' } } // Busca pelo nome, ignorando maiúsculas/minúsculas
        ]
      };
      
      const options = {
        limit: 5, // Limita o número de resultados a 5
        sort: { value: -1 } // Ordena os resultados pelo campo 'value' em ordem decrescente
      };

      const result = await this.mongoConnection.find(
        'brazilianReits',
        filter,
        'warKey',
        options
      )
      console.log('Reits:: ', result)

      return [
        {
          name: 'Gerdau SA Preference Shares',
          ticker: 'GGBR4',
          value: 36.4,
          currency: 'BRL'
        }
      ]
      // const allActionsBefore = await this.mongoConnection.find('brazilianReits', {})
    } catch (error: unknown) {
      console.error('Error fetching actions:', error)
      throw error
    }
  }

  async saveReits(params: SaveBrazilianReitsRepository.Params):
  Promise<SaveBrazilianReitsRepository.Result> {
    const insertReits: { registersUpdated: number }[] = []
    try {
      for (const reits of params) {
        const { ticker, ...updateData } = reits;
        const result = await this.mongoConnection.updateOne(
          'brazilianReits',
          { ticker: ticker },
          { $set: updateData },
          updateData,
          'warKey'
        );
        insertReits.push(result)
      }

      // const allActionsBefore = await this.mongoConnection.find('brazilianReits', {})

      return insertReits
    } catch (error: unknown) {
      console.error('Error fetching actions:', error)
      throw error
    }
  }

  async add(params: AddTransactionRepository.Params): Promise<AddTransactionRepository.Result> {
    const { userId, ...transaction} = params
    
    console.log('PARAMS:: Transaction:: ', transaction)
    console.log('PARAMS:: userId:: ', userId)
    
    // Atualiza ou cria uma carteira para o usuário
    const teste = await this.mongoConnection.updateOne(
      'wallet',
      { userId }, // Filtro pelo userId
      { $push: { transactions: transaction } },
      transaction, // Adiciona a transação ao array de transações
      'warKey'
    )

    console.log('INSERT TRANSACTION:: ', teste)
    
    return true
  }
}
