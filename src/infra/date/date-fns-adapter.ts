import type {
  AddDaysInDateContract,
  DifferenceInDaysContract
} from '@/application/contracts/date'

import {
  differenceInCalendarDays,
  isValid,
  differenceInDays,
  formatISO,
  addDays,
  parseISO
} from 'date-fns'

export class DateFnsAdapter
  implements DifferenceInDaysContract, AddDaysInDateContract
{
  async differenceInDays(
    params: DifferenceInDaysContract.Params
  ): Promise<DifferenceInDaysContract.Result> {
    const { dateLeft, dateRight } = params
    return differenceInCalendarDays(dateLeft, dateRight)
  }

  async incrementDays(
    params: AddDaysInDateContract.Params
  ): Promise<AddDaysInDateContract.Result> {
    const { initialDate, additionalDays } = params
    const isValid = await this.verifyFormat(initialDate)
    if (!isValid) {
      return isValid
    }

    return this.formatISO(addDays(isValid, additionalDays))
  }

  async verifyFormat(isDate: string | Date): Promise<Date | false> {
    if (!(await this.isValidDate(isDate))) return false
    return typeof isDate === 'string' ? parseISO(isDate) : isDate
  }

  async isValidDate(date: Date | string): Promise<boolean> {
    return isValid(date)
  }

  async formatISO(date: Date, type?: string): Promise<string | false> {
    const isDate = await this.verifyFormat(date)

    if (!isDate) return isDate

    if (type === 'localTimeUTC') return formatISO(isDate)
    // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
    //= > '2019-09-18T19:00:52Z'

    if (type === 'basic') return formatISO(isDate, { format: 'basic' })
    // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):
    //= > '20190918T190052'

    return formatISO(isDate, { representation: 'date' })
    // Represent 18 September 2019 in ISO 8601 format, date only:
    //= > '2019-09-18'
  }

  async differenceDatesInDays(
    dateStart: Date,
    dateEnd: Date
  ): Promise<number | false> {
    const isDateStart = await this.verifyFormat(dateStart)
    const isDateEnd = await this.verifyFormat(dateStart)
    if (!isDateStart) return false
    if (!isDateEnd) return false

    return differenceInDays(isDateStart, isDateEnd)
  }
}
