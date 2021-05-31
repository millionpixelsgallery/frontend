import { DateTime } from 'luxon'

export function unixToDateTime(unix: number | string) {
  return DateTime.fromSeconds(+unix, { zone: 'utc' })
}
