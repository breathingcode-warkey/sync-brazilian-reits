export class NotLoadBrazilianReitError extends Error {
  private readonly statusCode: number
  constructor(description: string) {
    super(`Error Real Estate Investment Fund${description}`)
    this.name = 'NotLoadBrazilianReitError'
    this.statusCode = 404
  }
}
