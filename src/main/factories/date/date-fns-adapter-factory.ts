import { DateFnsAdapter } from '@/infra/date'

export class DateFnsAdapterFactory {
  private static instance: DateFnsAdapterFactory
  private instanceDateFnsAdapter: DateFnsAdapter | undefined

  public static getInstance(): DateFnsAdapterFactory {
    if (!DateFnsAdapterFactory.instance) {
      DateFnsAdapterFactory.instance = new DateFnsAdapterFactory()
    }

    return DateFnsAdapterFactory.instance
  }

  public make(): DateFnsAdapter {
    if (!this.instanceDateFnsAdapter) {
      this.instanceDateFnsAdapter = new DateFnsAdapter()
    }
    return this.instanceDateFnsAdapter
  }
}
