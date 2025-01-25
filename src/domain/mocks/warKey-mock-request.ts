import { eventMock } from '@/domain/mocks'

const resourceReits = '/reits/all'
const resourceTransaction = '/transaction/add'

const body = {
  email: 'elisandro@ulbra.edu.br',
  accessToken: process.env.MOCK_ACCESS_TOKEN,
  grossValue: '100',
  value: '80',
  successFee: '20'
}

const bodyInsert = {
  email: 'elisandro@ulbra.edu.br',
  ticker: 'PETR4',
  shareValue: '38.9',
  quantity: '7',
  date: '2025-01-20',
  totalPurchase: '126.7',
  userId: '3015'
}

export const warKeyEventMock = {
  ...eventMock,
  httpMethod: 'POST',
  path: resourceReits,
  resource: resourceReits,
  body: JSON.stringify(body)
}
